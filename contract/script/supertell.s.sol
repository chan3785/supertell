// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/SuperTell.sol";

contract DeploySuperTell is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        // Supra Oracle address
        address supraOracleAddress = 0x58e158c74DF7Ad6396C0dcbadc4878faC9e93d57;
        

        // Deploy SuperTell
        SuperTell superTell = new SuperTell(supraOracleAddress);

        // Log the deployed contract address
        console.log("SuperTell deployed at:", address(superTell));

        vm.stopBroadcast();
    }
}