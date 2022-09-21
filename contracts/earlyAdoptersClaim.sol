// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

contract earlyAdoptersClaim {
    using ByteHasher for bytes;

    error InvalidNullifier();

    IWorldID internal immutable worldId;

    string _actionId = "wid_e614be8c1fb6058f6e5d6dc8c98afd85";

    uint256 internal immutable groupId = 1;
    uint256 internal immutable actionId = abi.encodePacked(_actionId).hashToField();

    uint8 public count = 0;

    mapping(uint256 => bool) internal nullifierHashes;
    mapping (uint8 => address) public nftOwner;

    constructor(IWorldID _worldId) {
        worldId = _worldId;
    }

    function verify(
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public{
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(msg.sender).hashToField(),
            nullifierHash,
            actionId,
            proof
        );

        nullifierHashes[nullifierHash] = true;

        require(count < 20, "Only 20 NFTS available");
        count=count+1;
        nftOwner[count] = msg.sender;
        
    }

    function getNftsLeft() public view returns (uint8) {
        return 20-count;
    }
}