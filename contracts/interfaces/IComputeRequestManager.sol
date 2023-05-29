// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./IPayment.sol";

interface IComputeRequestManager is IPayment {
    enum RequestStatus {
        OPEN,
        CLOSED,
        REVOKED
    }
    struct ComputeRequest {
        RequestStatus status;
        address requester;
        address computeManager;
        uint256 optionId;
        uint64 startTime;
        uint64 computeUnits;
        uint256 escrowAmount;
    }

    event ComputeRequested(
        address indexed requester,
        address indexed computeManager,
        uint256 optionId,
        uint256 computeId,
        uint256 computeUnits,
        bytes32 computeHash
    );
    event ComputeCompleted(address indexed requester, address indexed computeManager, uint256 computeId);
    event ComputeRevoked(address indexed requester, address indexed computeManager, uint256 computeId);

    /**
     * Request for compute.
     * @param computeManager The address of the compute manager contract.
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
    ) external returns (uint256 computeId);

    /**
     * Revoke a compute request that has exceeded the SLA.
     * @param computeId The id of the compute record.
     * @notice This returns ASTO held in escrow.
     * @notice The compute request must not be completed and the SLA must have expired.
     */
    function revokeCompute(uint256 computeId) external;

    /**
     * Complete a compute request.
     * @param computeId The id of the compute record.
     * @notice This unlocks ASTO held in escrow.
     * @dev This must be called by the compute manager.
     */
    function completeCompute(uint256 computeId) external;

    function supportsInterface(bytes4 interfaceId) external returns (bool);
}
