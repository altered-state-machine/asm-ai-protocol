// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockedERC20 is ERC20 {
    uint8 public _decimals;
    string public baseURI;

    event BaseURIChanged(string newBaseURI);

    constructor(
        string memory name,
        string memory symbol,
        address initialAccount,
        uint256 initialBalance,
        uint8 decimal
    ) payable ERC20(name, symbol) {
        _decimals = decimal;
        _mint(initialAccount, initialBalance);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals > 0 ? _decimals : 18;
    }

    /**
     * @notice Get base URI for the tokenURI
     * @dev emit an Event with new baseURI
     * @param newURI new baseURI to set
     */
    function setBaseURI(string calldata newURI) external {
        baseURI = newURI;
        emit BaseURIChanged(newURI);
    }
}
