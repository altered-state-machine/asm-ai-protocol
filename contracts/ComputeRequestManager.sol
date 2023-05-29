// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./interfaces/IComputeRequestManager.sol";
import "./Payment.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * ASM Core Protocol
 */
contract ComputeRequestManager is IComputeRequestManager, Payment {
    ComputeRequest[] public requests;

    constructor(
        address dao_,
        address asto_,
        address manager
    ) Payment(dao_, asto_, manager) {
        _pause();
    }

    /**
     * Request for compute.
     * @param computeManager The address of the compute manager.
     * @param optionId The given compute option index.
     * @param units The number of compute units to run.
     * @return computeId The id of the resulting compute record.
     * @param computeHash A compute manager identifier for this compute request.
     * @notice This contract must be authorised to spend ASTO on behalf of the caller.
     */
    function requestCompute(
        address computeManager,
        uint256 optionId,
        uint64 units,
        bytes32 computeHash
    ) external whenNotPaused returns (uint256 computeId) {
        if (units < 1) revert InvalidComputeRequest(INVALID_COMPUTE_UNITS, units);
        uint256 paid = _payForCompute(computeManager, optionId, units);
        return _openComputeRequest(msg.sender, computeManager, optionId, units, computeHash, paid);
    }

    /**
     * Revoke a compute request that has exceeded the SLA.
     * @param computeId The id of the compute record.
     * @notice This returns ASTO held in escrow to the requester.
     * @notice The compute request must not be completed and the SLA must have expired.
     */
    function revokeCompute(uint256 computeId) external whenNotPaused {
        ComputeRequest storage request = requests[computeId];
        if (request.requester != msg.sender)
            revert InvalidCaller(MUST_BE_CALLED_BY_REQUESTER, request.requester, msg.sender);

        // Return ASTO
        _revokeComputeRequest(computeId, request);
        _repayCompute(request.requester, request.escrowAmount);
    }

    /**
     * Complete a compute request.
     * @param computeId The id of the compute record.
     * @notice This unlocks ASTO held in escrow.
     * @notice The compute request must not be completed and the SLA must have expired.
     */
    function completeCompute(uint256 computeId) external whenNotPaused {
        ComputeRequest storage request = requests[computeId];
        if (request.computeManager != msg.sender)
            revert InvalidCaller(MUST_BE_CALLED_BY_COMPUTE_CUSTODIAN, request.computeManager, msg.sender);

        // Complete
        _completeComputeRequest(computeId, request);
        _reimburseCompute(request.computeManager, request.optionId, request.escrowAmount);
    }

    //
    // Internal functions
    //

    /**
     * Save a compute request.
     * @param requester The user making the compute request.
     * @param computeManager The compute manager to complete the compute.
     * @param optionId The compute manager compute option id.
     * @param units The number of units to train.
     * @param computeHash A compute manager identifier for this compute request.
     * @param escrowAmount The amount of ASTO held in escrow.
     * @return computeId The saved compute id.
     */
    function _openComputeRequest(
        address requester,
        address computeManager,
        uint256 optionId,
        uint64 units,
        bytes32 computeHash,
        uint256 escrowAmount
    ) internal returns (uint256 computeId) {
        computeId = requests.length;
        requests.push(
            ComputeRequest(
                RequestStatus.OPEN,
                requester,
                computeManager,
                optionId,
                units,
                uint64(block.timestamp), // solhint-disable-line not-rely-on-time
                escrowAmount
            )
        );
        emit ComputeRequested(requester, computeManager, optionId, computeId, units, computeHash);
        return computeId;
    }

    /**
     * Cancel a compute request.
     * @param computeId The id of the compute request
     * @param request The compute request.
     */
    function _revokeComputeRequest(uint256 computeId, ComputeRequest storage request) internal {
        if (request.status != RequestStatus.OPEN) revert ComputeRequestClosed();
        (bool expired, uint64 sla) = isComputeRequestSLAExpired(request);
        if (!expired) revert ComputeSLANotReached(sla, uint64(block.timestamp)); // solhint-disable-line not-rely-on-time
        // Close
        request.status = RequestStatus.REVOKED;
        emit ComputeRevoked(request.requester, request.computeManager, computeId);
    }

    /**
     * Complete a compute request.
     * @param computeId The id of the compute request.
     * @param request The compute request.
     */
    function _completeComputeRequest(uint256 computeId, ComputeRequest storage request) internal {
        if (request.status == RequestStatus.CLOSED) revert ComputeRequestClosed();
        if (request.status == RequestStatus.REVOKED) revert ComputeRequestRevoked();
        // Complete
        request.status = RequestStatus.CLOSED;
        emit ComputeCompleted(request.requester, request.computeManager, computeId);
    }

    //
    // Views
    //

    /**
     * Check if a compute request SLA has expired.
     * @param computeId The id of the compute request.
     * @return expired If the request has expired.
     * @return sla The SLA timestamp.
     */
    function isComputeRequestSLAExpired(uint256 computeId) external view returns (bool expired, uint64 sla) {
        ComputeRequest storage request = requests[computeId];
        return isComputeRequestSLAExpired(request);
    }

    /**
     * Check if a compute request SLA has expired.
     * @param request The compute request.
     * @return expired If the request has expired.
     * @return sla The SLA timestamp.
     */
    function isComputeRequestSLAExpired(ComputeRequest memory request) public view returns (bool expired, uint64 sla) {
        sla = IComputeManager(request.computeManager).getComputeOptionSLA(
            request.optionId,
            request.startTime,
            request.computeUnits
        );
        return (sla < block.timestamp, sla); // solhint-disable-line not-rely-on-time
    }

    /**
     * Check if a compute request is open.
     * @param computeId The id of the compute request.
     * @return open If the compute request is open.
     */
    function isComputeRequestOpen(uint256 computeId) external view returns (bool) {
        return requests[computeId].status == RequestStatus.OPEN;
    }

    /**
     * Get compute request user information.
     * @param computeId The id of the compute request.
     * @return requester The requester address.
     * @return escrowAmount The amount of ASTO held in escrow.
     */
    function getComputeRequestUserInfo(uint256 computeId)
        external
        view
        returns (address requester, uint256 escrowAmount)
    {
        ComputeRequest storage request = requests[computeId];
        return (request.requester, request.escrowAmount);
    }

    /**
     * Get compute request compute manager information.
     * @param computeId The id of the compute request.
     * @return computeManager The compute manager address.
     * @return optionId The compute option id.
     */
    function getComputeRequestComputeManagerInfo(uint256 computeId)
        external
        view
        returns (address computeManager, uint256 optionId)
    {
        ComputeRequest storage request = requests[computeId];
        return (request.computeManager, request.optionId);
    }

    /**
     * Get compute request timing information.
     * @param computeId The id of the compute request.
     * @return startTime The blocktime when the request was made.
     * @return computeUnits The number of units to train for.
     */
    function getComputeRequestTimingInfo(uint256 computeId)
        external
        view
        returns (uint64 startTime, uint64 computeUnits)
    {
        ComputeRequest storage request = requests[computeId];
        return (request.startTime, request.computeUnits);
    }

    //
    // Admin
    //

    /**
     * Update some fields in compute request.
     * @notice To help manage stuck requests.
     * @dev only MANAGER_ROLE can call this function.
     * @param computeId The id of the compute request.
     * @param escrowAmount The amount of ASTO held in escrow.
     * @param newClosed new closed status.
     */
    function managerUpdateRequest(
        uint256 computeId,
        uint256 escrowAmount,
        RequestStatus newClosed
    ) external onlyRole(MANAGER_ROLE) {
        ComputeRequest storage request = requests[computeId];
        request.status = newClosed;
        request.escrowAmount = escrowAmount;
    }

    /**
     * Revoke request on behalf of the user.
     * @notice when the request is stuck in the open state and user can't revoke it by herself.
     * @dev only MANAGER_ROLE can call this function.
     * @param computeId The id of the compute request.
     */
    function managerRevokeCompute(uint256 computeId) external onlyRole(MANAGER_ROLE) {
        ComputeRequest storage request = requests[computeId];
        _revokeComputeRequest(computeId, request);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IComputeRequestManager, AccessControl)
        returns (bool)
    {
        return interfaceId == type(IComputeRequestManager).interfaceId || super.supportsInterface(interfaceId);
    }
}
