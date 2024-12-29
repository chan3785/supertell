// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/SuperTell.sol";

contract DeploySuperTell is Script {
    function run() external {
        
        vm.startBroadcast();
      
        address supraOracleAddress = 0xBB0f96cede5728D69409340be459A864478e9222;

        SuperTell superTell = new SuperTell(supraOracleAddress);

        // Log the deployed contract address
        console.log("SuperTell deployed at:", address(superTell));


        vm.stopBroadcast();
    }
}
