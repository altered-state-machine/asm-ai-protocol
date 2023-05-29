// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./Errors.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

bytes32 constant NODE_CREATOR_ROLE = keccak256("NODE_CREATOR");
bytes32 constant MANAGER_ROLE = keccak256("MANAGER");

/**
 * @dev ASM Protocol - Control
 */
contract Control is AccessControl, Pausable, Errors {
    address private _manager;

    constructor(address manager) {
        _manager = manager;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MANAGER_ROLE, manager);
    }

    /**
     * @notice Set manager address (contract or wallet) to manage this contract
     * @dev This function can only to called from contracts or wallets with MANAGER_ROLE
     * @dev The old manager will be removed
     * @param newManager The new manager address to be granted
     */
    function setManager(address newManager) external onlyRole(MANAGER_ROLE) {
        if (newManager == address(0)) revert InvalidInput(INVALID_ADDRESS);
        _revokeRole(MANAGER_ROLE, _manager);
        _grantRole(MANAGER_ROLE, newManager);
        _manager = newManager;
    }

    /**
     * Give node creator role to this address.
     * @param newNodeCreator The new manager address to be granted
     * @dev This function can only to called from contracts or wallets with MANAGER_ROLE
     */
    function addNodeCreator(address newNodeCreator) external onlyRole(MANAGER_ROLE) {
        _grantRole(NODE_CREATOR_ROLE, newNodeCreator);
    }

    /**
     * Give node creator role to this address.
     * @param oldNodeCreator The new manager address to be granted
     * @dev This function can only to called from contracts or wallets with MANAGER_ROLE
     */
    function revokeNodeCreator(address oldNodeCreator) external onlyRole(MANAGER_ROLE) {
        _revokeRole(NODE_CREATOR_ROLE, oldNodeCreator);
    }

    /**
     * @notice Pause the contract
     */
    function pause() external onlyRole(MANAGER_ROLE) {
        _pause();
    }

    /**
     * @notice Unpause the contract
     */
    function unpause() external onlyRole(MANAGER_ROLE) {
        _unpause();
    }
}
