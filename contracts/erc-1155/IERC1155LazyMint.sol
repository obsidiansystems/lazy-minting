pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "./LibERC1155LazyMint.sol";

interface IERC1155LazyMint is IERC1155Upgradeable {
    event Mint (uint tokenId, string uri, address creator, uint256 value);

    function mintAndTransfer (LibERC1155LazyMint.Mint1155Data memory data, address to, uint256 _amount) external;

    function transferFromOrMint (LibERC1155LazyMint.Mint1155Data memory data, address from, address to, uint256 amount) external;
}
