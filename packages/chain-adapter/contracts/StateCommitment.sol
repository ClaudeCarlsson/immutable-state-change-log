// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StateCommitment {
    event StateCommitted(bytes32 indexed stateHash);

    function commitState(bytes32 stateHash) external {
        emit StateCommitted(stateHash);
    }
}