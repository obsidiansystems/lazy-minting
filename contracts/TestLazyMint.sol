pragma solidity ^0.8.0;

import "./ERC1155LazyMint.sol";

contract TestLazyMint is ERC1155LazyMint
{
    constructor(string memory base) ERC1155LazyMint() {
        _setBaseURI(base);
    }
}
