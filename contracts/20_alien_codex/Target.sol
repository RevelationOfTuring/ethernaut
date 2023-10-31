// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

//import '../helpers/Ownable-05.sol';

// mock Ownable
contract Ownable {
    // slot 0
    address public owner;
}

contract AlienCodex is Ownable {
    // slot0
    bool public contact;
    // slot1 -> the length of dynamic array
    bytes32[] public codex;

    modifier contacted() {
        assert(contact);
        _;
    }

    function makeContact() public {
        contact = true;
    }

    function record(bytes32 _content) contacted public {
        codex.push(_content);
    }

    function retract() contacted public {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) contacted public {
        codex[i] = _content;
    }
}