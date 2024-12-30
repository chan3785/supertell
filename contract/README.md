forge script script/supertell.s.sol:DeploySuperTell \  --rpc-url $RPC_URL \  --private-key $PRIVATE_KEY \  --chain-id $CHAIN_ID \  --broadcast \  --priority-gas-price 21000000000 \  --gas-price 41000000000 \  -vvvvv
[⠊] Compiling...
No files changed, compilation skipped
Traces:
  [1258213] DeploySuperTell::run()
    ├─ [0] VM::envUint("PRIVATE_KEY") [staticcall]
    │   └─ ← [Return] <env var value>
    ├─ [0] VM::startBroadcast(<pk>)
    │   └─ ← [Return] 
    ├─ [1217954] → new SuperTell@0x7eB9c6631E539CCcd4f51eFb051f631797087B19
    │   ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0xEEed6Df28F1460b6d6cb04f92aa8CbEcBdC3F891)
    │   ├─ [7548] 0x58e158c74DF7Ad6396C0dcbadc4878faC9e93d57::getSvalue(166) [staticcall]
    │   │   ├─ [2708] 0x925abc210c5fda44dBD2a5215b445e7d140249f7::getSvalue(166) [delegatecall]
    │   │   │   └─ ← [Return] 0x0000019416fdb7d0080000019416fdb8b40000000000000888170862c0000000
    │   │   └─ ← [Return] 0x0000019416fdb7d0080000019416fdb8b40000000000000888170862c0000000
    │   ├─ emit RoundStarted(epoch: 1, startTime: 1735555149 [1.735e9])
    │   └─ ← [Return] 5070 bytes of code
    ├─ [0] console::log("SuperTell deployed at:", SuperTell: [0x7eB9c6631E539CCcd4f51eFb051f631797087B19]) [staticcall]
    │   └─ ← [Stop] 
    ├─ [0] VM::stopBroadcast()
    │   └─ ← [Return] 
    └─ ← [Stop] 


Script ran successfully.

== Logs ==
  SuperTell deployed at: 0x7eB9c6631E539CCcd4f51eFb051f631797087B19

## Setting up 1 EVM.
==========================
Simulated On-chain Traces:

  [1217954] → new SuperTell@0x7eB9c6631E539CCcd4f51eFb051f631797087B19
    ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0xEEed6Df28F1460b6d6cb04f92aa8CbEcBdC3F891)
    ├─ [7548] 0x58e158c74DF7Ad6396C0dcbadc4878faC9e93d57::getSvalue(166) [staticcall]
    │   ├─ [2708] 0x925abc210c5fda44dBD2a5215b445e7d140249f7::getSvalue(166) [delegatecall]
    │   │   └─ ← [Return] 0x0000019416fdb7d0080000019416fdb8b40000000000000888170862c0000000
    │   └─ ← [Return] 0x0000019416fdb7d0080000019416fdb8b40000000000000888170862c0000000
    ├─ emit RoundStarted(epoch: 1, startTime: 1735555156 [1.735e9])
    └─ ← [Return] 5070 bytes of code


==========================

Chain 47763

Estimated gas price: 40.000000001 gwei

Estimated total gas used for script: 1772802

Estimated amount required: 0.070912080001772802 ETH

==========================

##### 47763
✅  [Success]Hash: 0x4aefca11ea0d21a43ea78ce112dcae216ccc908048c7eb5bba328a39cce0ac3e
Contract Address: 0x7eB9c6631E539CCcd4f51eFb051f631797087B19
Block: 1090811
Paid: 0.054562720001364068 ETH (1364068 gas * 40.000000001 gwei)

✅ Sequence #1 on 47763 | Total Paid: 0.054562720001364068 ETH (1364068 gas * avg 40.000000001 gwei)
                                                                                                                                    

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.