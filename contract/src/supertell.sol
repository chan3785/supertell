// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ISupraSValueFeed {
    function getSvalue(uint64 _pairIndex) external view returns (bytes32);
}

contract SuperTell is Pausable, Ownable, ReentrancyGuard {
    ISupraSValueFeed public oracle;
    uint64 public constant BTC_PAIR_INDEX = 166; // BTC USD price feed
    uint256 public currentEpoch;
    uint256 public constant EPOCH_LENGTH = 24 hours;
    uint256 public constant BUFFER_PERIOD = 30 minutes;
    uint256 public constant TREASURY_FEE = 300; // 3%
    uint256 public treasuryAmount;

    struct Round {
        uint256 epoch;
        uint256 startTime;
        uint256 closeTime;
        int256 startPrice;
        int256 closePrice;
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

    event RoundStarted(uint256 indexed epoch, uint256 startTime);
    event BetPlaced(uint256 indexed epoch, address indexed user, bool isUp, uint256 amount);
    event RoundResolved(uint256 indexed epoch, int256 closePrice, bool upWon);
    event Claimed(uint256 indexed epoch, address indexed user, uint256 amount);
    event TreasuryWithdrawn(address indexed owner, uint256 amount);

    constructor(address _oracleAddress) Ownable(msg.sender) {
        oracle = ISupraSValueFeed(_oracleAddress);
        _startNewRound();
    }

    function _startNewRound() private {
        currentEpoch++;
        
        bytes32 priceData = oracle.getSvalue(BTC_PAIR_INDEX);
        int256 currentPrice = int256(uint256(priceData));
        
        rounds[currentEpoch] = Round({
            epoch: currentEpoch,
            startTime: block.timestamp,
            closeTime: block.timestamp + EPOCH_LENGTH,
            startPrice: currentPrice,
            closePrice: 0,
            totalUpAmount: 0,
            totalDownAmount: 0,
            totalAmount: 0,
            resolved: false
        });

        emit RoundStarted(currentEpoch, block.timestamp);
    }

    function betUp(address user, uint256 amount) external payable whenNotPaused nonReentrant {
        _placeBet(true, user, amount);
    }

    function betDown(address user, uint256 amount) external payable whenNotPaused nonReentrant {
        _placeBet(false, user, amount);
    }

    function _placeBet(bool isUp, address user, uint256 amount) private {
        require(block.timestamp < rounds[currentEpoch].closeTime, "Round closed");
        require(userBets[currentEpoch][user].amount == 0, "Already bet");
        require(msg.value == amount, "Invalid amount");

        Round storage round = rounds[currentEpoch];
        if (isUp) {
            round.totalUpAmount += amount;
        } else {
            round.totalDownAmount += amount;
        }
        round.totalAmount += amount;

        userBets[currentEpoch][user] = UserBet({
            isUp: isUp,
            amount: amount,
            claimed: false
        });

        emit BetPlaced(currentEpoch, user, isUp, amount);

        if (_shouldResolveRound(currentEpoch - 1)) {
            _resolveRound(currentEpoch - 1);
        }
    }

    function _shouldResolveRound(uint256 epoch) private view returns (bool) {
        if (epoch == 0) return false;
        Round storage round = rounds[epoch];
        return !round.resolved && 
               block.timestamp >= round.closeTime + BUFFER_PERIOD;
    }

    function _resolveRound(uint256 epoch) private {
        Round storage round = rounds[epoch];
        require(!round.resolved, "Already resolved");
        require(block.timestamp >= round.closeTime + BUFFER_PERIOD, "Too early");

        bytes32 priceData = oracle.getSvalue(BTC_PAIR_INDEX);
        round.closePrice = int256(uint256(priceData));
        round.resolved = true;

        bool upWon = round.closePrice > round.startPrice;
        emit RoundResolved(epoch, round.closePrice, upWon);

        if (epoch == currentEpoch) {
            _startNewRound();
        }
    }

    function claim(uint256 epoch) external whenNotPaused nonReentrant {
        require(rounds[epoch].resolved, "Round not resolved");
        UserBet storage bet = userBets[epoch][msg.sender];
        require(!bet.claimed, "Already claimed");
        require(bet.amount > 0, "No bet placed");
        
        Round storage round = rounds[epoch];
        bool upWon = round.closePrice > round.startPrice;
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
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function getCurrentRound() external view returns (Round memory) {
        return rounds[currentEpoch];
    }
    
    function getUserBet(uint256 epoch, address user) external view returns (UserBet memory) {
        return userBets[epoch][user];
    }
     function getCurrentEpoch() external view returns (uint256) {
        return currentEpoch;
    }

    function getUserBetEpochs(address user) external view returns (uint256[] memory) {
        uint256[] memory epochs = new uint256[](currentEpoch);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= currentEpoch; i++) {
            if (userBets[i][user].amount > 0) {
                epochs[count] = i;
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = epochs[i];
        }
        
        return result;
    }

    receive() external payable {}
}