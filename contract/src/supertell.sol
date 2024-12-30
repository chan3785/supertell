// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
//This contract is in Beta and is yet to be audited, use at your own risk.
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ISupraOraclePull {
    struct PriceData {
        uint256[] pairs;
        uint256[] prices;
        uint256[] decimals;
    }
    
    function verifyOracleProof(bytes calldata _bytesProof)
        external
        returns (PriceData memory);
}

interface ISupraSValueFeed {
    struct derivedData {
        int256 roundDifference;
        uint256 derivedPrice;
        uint256 decimals;
    }
    
    function getDerivedSvalue(
        uint256 pair_id_1,
        uint256 pair_id_2,
        uint256 operation
    ) external view returns (derivedData memory);
}

contract SuperTell is Pausable, Ownable, ReentrancyGuard {
    ISupraOraclePull public supra_pull;
    ISupraSValueFeed public supra_storage;
    
    uint256 public constant BTC_PAIR_INDEX = 166; // BTC USD price feed
    uint256 public currentEpoch;
    uint256 public constant EPOCH_LENGTH = 24 hours;
    uint256 public constant BUFFER_PERIOD = 30 minutes;
    uint256 public constant MIN_BET_AMOUNT = 1e8;
    uint256 public constant TREASURY_FEE = 300; // 3%
    uint256 public treasuryAmount;
    
    struct Round {
        uint256 epoch;
        uint256 startTime;
        uint256 closeTime;
        uint256 startPrice;
        uint256 startPriceDecimals;
        uint256 closePrice;
        uint256 closePriceDecimals;
        uint256 totalUpAmount;
        uint256 totalDownAmount;
        uint256 totalAmount;
        bool resolved;
    }

    struct UserBet {
        bool isUp;
        uint256 amount;
        bool claimed;
    }

    mapping(uint256 => Round) public rounds;
    mapping(uint256 => mapping(address => UserBet)) public userBets;

    event RoundStarted(uint256 indexed epoch, uint256 startTime, uint256 startPrice);
    event BetPlaced(uint256 indexed epoch, address indexed user, bool isUp, uint256 amount);
    event RoundResolved(uint256 indexed epoch, uint256 closePrice, bool upWon);
    event Claimed(uint256 indexed epoch, address indexed user, uint256 amount);
    event TreasuryWithdrawn(address indexed owner, uint256 amount);
    event OracleAddressUpdated(address indexed newPullOracle, address indexed newStorageOracle);

    constructor(address _pullOracleAddress, address _storageOracleAddress) Ownable(msg.sender) {
        require(_pullOracleAddress != address(0), "Invalid pull oracle address");
        require(_storageOracleAddress != address(0), "Invalid storage oracle address");
        supra_pull = ISupraOraclePull(_pullOracleAddress);
        supra_storage = ISupraSValueFeed(_storageOracleAddress);
    }

    function initializeRound(bytes calldata _bytesProof) external onlyOwner {
        require(currentEpoch == 0, "Already initialized");
        _startNewRound(_bytesProof);
    }

    function _getPriceData(bytes calldata _bytesProof) private returns (uint256, uint256) {
        ISupraOraclePull.PriceData memory prices = supra_pull.verifyOracleProof(_bytesProof);
        
        for (uint256 i = 0; i < prices.pairs.length; i++) {
            if (prices.pairs[i] == BTC_PAIR_INDEX) {
                return (prices.prices[i], prices.decimals[i]);
            }
        }
        revert("BTC pair not found");
    }

    function _startNewRound(bytes calldata _bytesProof) private {
        currentEpoch++;
        
        (uint256 currentPrice, uint256 priceDecimals) = _getPriceData(_bytesProof);
        
        rounds[currentEpoch] = Round({
            epoch: currentEpoch,
            startTime: block.timestamp,
            closeTime: block.timestamp + EPOCH_LENGTH,
            startPrice: currentPrice,
            startPriceDecimals: priceDecimals,
            closePrice: 0,
            closePriceDecimals: 0,
            totalUpAmount: 0,
            totalDownAmount: 0,
            totalAmount: 0,
            resolved: false
        });

        emit RoundStarted(currentEpoch, block.timestamp, currentPrice);
    }

    function betUp(bytes calldata _bytesProof) external payable whenNotPaused nonReentrant {
        _placeBet(true, _bytesProof);
    }

    function betDown(bytes calldata _bytesProof) external payable whenNotPaused nonReentrant {
        _placeBet(false, _bytesProof);
    }

    function _placeBet(bool isUp, bytes calldata _bytesProof) private {
        require(currentEpoch > 0, "Not initialized");
        require(msg.value >= MIN_BET_AMOUNT, "Bet below minimum");
        require(block.timestamp < rounds[currentEpoch].closeTime, "Round closed");
        require(userBets[currentEpoch][msg.sender].amount == 0, "Already bet");

        Round storage round = rounds[currentEpoch];
        if (isUp) {
            round.totalUpAmount += msg.value;
        } else {
            round.totalDownAmount += msg.value;
        }
        round.totalAmount += msg.value;

        userBets[currentEpoch][msg.sender] = UserBet({
            isUp: isUp,
            amount: msg.value,
            claimed: false
        });

        emit BetPlaced(currentEpoch, msg.sender, isUp, msg.value);

        if (_shouldResolveRound(currentEpoch - 1)) {
            _resolveRound(currentEpoch - 1, _bytesProof);
        }
    }

    function _shouldResolveRound(uint256 epoch) private view returns (bool) {
        if (epoch == 0) return false;
        Round storage round = rounds[epoch];
        return !round.resolved && 
               block.timestamp >= round.closeTime + BUFFER_PERIOD;
    }

    function _resolveRound(uint256 epoch, bytes calldata _bytesProof) private {
        Round storage round = rounds[epoch];
        require(!round.resolved, "Already resolved");
        require(block.timestamp >= round.closeTime + BUFFER_PERIOD, "Too early");

        (uint256 closePrice, uint256 priceDecimals) = _getPriceData(_bytesProof);
        round.closePrice = closePrice;
        round.closePriceDecimals = priceDecimals;
        round.resolved = true;

        // Ensure both prices are compared at the same decimal precision
        uint256 normalizedStartPrice = round.startPrice;
        uint256 normalizedClosePrice = closePrice;
        if (round.startPriceDecimals > priceDecimals) {
            normalizedClosePrice = closePrice * (10 ** (round.startPriceDecimals - priceDecimals));
        } else if (round.startPriceDecimals < priceDecimals) {
            normalizedStartPrice = round.startPrice * (10 ** (priceDecimals - round.startPriceDecimals));
        }

        bool upWon = normalizedClosePrice > normalizedStartPrice;
        emit RoundResolved(epoch, closePrice, upWon);

        if (epoch == currentEpoch) {
            _startNewRound(_bytesProof);
        }
    }

    function claim(uint256 epoch) external whenNotPaused nonReentrant {
        require(rounds[epoch].resolved, "Round not resolved");
        UserBet storage bet = userBets[epoch][msg.sender];
        require(!bet.claimed, "Already claimed");
        require(bet.amount > 0, "No bet placed");
        
        Round storage round = rounds[epoch];
        
        // Normalize prices for comparison
        uint256 normalizedStartPrice = round.startPrice;
        uint256 normalizedClosePrice = round.closePrice;
        if (round.startPriceDecimals > round.closePriceDecimals) {
            normalizedClosePrice = round.closePrice * (10 ** (round.startPriceDecimals - round.closePriceDecimals));
        } else if (round.startPriceDecimals < round.closePriceDecimals) {
            normalizedStartPrice = round.startPrice * (10 ** (round.closePriceDecimals - round.startPriceDecimals));
        }
        
        bool upWon = normalizedClosePrice > normalizedStartPrice;
        require(bet.isUp == upWon, "Bet lost");
        
        uint256 winningPool = upWon ? round.totalUpAmount : round.totalDownAmount;
        uint256 payout = (bet.amount * round.totalAmount) / winningPool;
        uint256 feeAmount = (payout * TREASURY_FEE) / 10000;
        uint256 winnings = payout - feeAmount;
        
        bet.claimed = true;
        treasuryAmount += feeAmount;
        
        (bool success, ) = payable(msg.sender).call{value: winnings}("");
        require(success, "Transfer failed");
        
        emit Claimed(epoch, msg.sender, winnings);
    }

    function withdrawTreasury() external onlyOwner nonReentrant {
        uint256 amount = treasuryAmount;
        require(amount > 0, "No funds to withdraw");
        
        treasuryAmount = 0;
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit TreasuryWithdrawn(owner(), amount);
    }

    function updateOracleAddresses(address _newPullOracle, address _newStorageOracle) external onlyOwner {
        require(_newPullOracle != address(0), "Invalid pull oracle address");
        require(_newStorageOracle != address(0), "Invalid storage oracle address");
        supra_pull = ISupraOraclePull(_newPullOracle);
        supra_storage = ISupraSValueFeed(_newStorageOracle);
        emit OracleAddressUpdated(_newPullOracle, _newStorageOracle);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // View functions
    function getCurrentRound() external view returns (Round memory) {
        return rounds[currentEpoch];
    }
    
    function getUserBet(uint256 epoch, address user) external view returns (UserBet memory) {
        return userBets[epoch][user];
    }
    
    receive() external payable {}
}