// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

contract earlyAdoptersClaim {
    using ByteHasher for bytes;

    error InvalidNullifier();

    IWorldID internal immutable worldId;

    string _actionId = "wid_e614be8c1fb6058f6e5d6dc8c98afd85";

    uint256 internal immutable groupId = 1;
    uint256 internal immutable actionId = abi.encodePacked(_actionId).hashToField();

    mapping(uint256 => bool) internal nullifierHashes;

    constructor(IWorldID _worldId) {
        worldId = _worldId;
    }

    function verify(
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public returns (bool) {
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(input).hashToField(),
            nullifierHash,
            actionId,
            proof
        );

        nullifierHashes[nullifierHash] = true;
        return true;
    }
}
