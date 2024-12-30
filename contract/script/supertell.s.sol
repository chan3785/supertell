// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/SuperTell.sol";

contract DeploySuperTell is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        // Supra Oracle addresses
        address supraPullOracleAddress = 0x8B506d2616671b6742b968C18bEFdA1e665A9025;  // Pull oracle
        address supraStorageAddress = 0x58e158c74DF7Ad6396C0dcbadc4878faC9e93d57;     // Storage oracle

        // Deploy SuperTell with both oracle addresses
        SuperTell superTell = new SuperTell(
            supraPullOracleAddress,
            supraStorageAddress
        );

        // Log the deployed contract address
        console.log("SuperTell deployed at:", address(superTell));

        vm.stopBroadcast();
    }
}