pragma solidity ^0.8.0;

library LibERC1155LazyMint {
    struct Mint1155Data {
        uint tokenId;
        string uri;
        uint supply;
        address creator;
    }
}
