// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;
pragma abicoder v2;

import "./ERC1155Lazy.sol";

contract TestLazyMint is ERC1155Lazy
{
    constructor(string memory base) ERC1155Lazy() {
        _setBaseURI(base);
    }
}
