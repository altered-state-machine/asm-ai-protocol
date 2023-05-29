// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MockedERC721 is ERC721Enumerable {
    uint256 private nextTokenId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to) public {
        _mint(to, nextTokenId++);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }
}
