// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/SuperTell.sol";

contract DeploySuperTell is Script {
    function run() external {
        vm.startBroadcast();
        address _oracleAddress = ;
        address _adminAddress = ;
        address _operatorAddress = ;
        uint256 _intervalSeconds = 300;
        uint256 _bufferSeconds = 30;
        uint256 _minBetAmount = 1000000000000000 ;
        uint256 _oracleUpdateAllowance = 300;
        uint256 _treasuryFee = 300;

        SuperTell superTell = new SuperTell(_oracleAddress,
         _adminAddress,
         _operatorAddress,
         _intervalSeconds,
         _bufferSeconds,
         _minBetAmount,
         _treasuryFee);

        vm.stopBroadcast();
    }
}