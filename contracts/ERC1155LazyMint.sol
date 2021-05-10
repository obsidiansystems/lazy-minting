pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "./erc-1155/IERC1155LazyMint.sol";
import "./erc-1155/ERC1155BaseURI.sol";

abstract contract ERC1155LazyMint is IERC1155LazyMint, ERC1155BaseURI
{
    event Supply(uint256 tokenId, uint256 value);
    event Creator(uint256 tokenId, address creator);
    event Uri(uint256 tokenId, string uri);

    mapping (uint256 => address) public creator;
    mapping (uint => uint) private supply;
    mapping (uint => uint) private minted;


    function mintAndTransfer(LibERC1155LazyMint.Mint1155Data memory data, address to, uint256 _amount) public override virtual
    {
        address minter = address (data.creator);
        address sender = _msgSender();

        require (minter == data.creator, "tokenId incorrect");
        require (minter == sender || isApprovedForAll (minter, sender), "ERC1155: transfer caller is not approved");

        require (data.supply > 0, "supply incorrect");
        require (_amount > 0, "amount incorrect");
        require (bytes (data.uri).length > 0, "the uri should be set");

        if (supply[data.tokenId] == 0) {
            // validate(sneder, data, data.creator);

            _saveSupply(data.tokenId, data.supply);
            _saveCreator(data.tokenId, data.creator);
            _setTokenURI(data.tokenId, data.uri);
        }

        _mint(to, data.tokenId, _amount, "");

        emit Mint (data.tokenId, data.uri, data.creator, _amount);
    }

    function transferFromOrMint(LibERC1155LazyMint.Mint1155Data memory data, address from, address to, uint256 amount) override external
    {
        uint balance = balanceOf (from, data.tokenId);
        uint left = amount;
        if (balance != 0) {
            uint transfer = amount;
            if (balance < amount) {
                transfer = balance;
            }
            safeTransferFrom(from, to, data.tokenId, transfer, "");
            left = amount - transfer;
        }
        if (left > 0) {
            mintAndTransfer(data, to, left);
        }
    }

    function _mint(address account, uint256 id, uint256 amount, bytes memory data) internal virtual override {
        uint newMinted = amount + minted[id];
        require(newMinted <= supply[id], "more than supply");

        minted[id] = newMinted;
        super._mint(account,id,amount,data);
    }

    function _saveSupply(uint tokenId, uint _supply) internal {
        require (supply[tokenId] == 0);
        supply[tokenId] = _supply;
        emit Supply(tokenId, _supply);
    }

    function _saveCreator(uint tokenId, address _creator) internal {
        creator[tokenId] = _creator;
        emit Creator(tokenId, _creator);
    }

    function getCreator (uint256 _id) external view returns (address) {
        return creator[_id];
    }

    function getSupply (uint256 _id) external view returns (uint) {
        return supply[_id];
    }
}
