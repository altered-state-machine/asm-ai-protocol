// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IComputeManager {
    /**
     * Get the cost for a given compute option.
     * @param index The given compute option index.
     * @param units The number of compute units to run.
     * @return cost The cost in ASTO.
     * @dev This function should revert if the compute option is no longer valid.
     */
    function getComputeOptionUnitCost(uint256 index, uint64 units) external view returns (uint256 cost);

    /**
     * Get the disbursement information for given compute option.
     * @param index The given compute option index.
     * @param amount The amount of ASTO to be distributed.
     * @return addresses The addresses to distribute to.
     * @return amounts The amount to distribute to each address.
     * @dev The total amounts must be equal to the input amount.
     * @dev This function must return even when a compute option is no longer valid.
     */
    function getComputeOptionDisbursement(uint256 index, uint256 amount)
        external
        view
        returns (address[] memory addresses, uint256[] memory amounts);

    /**
     * Get the compute SLA timeout for the given compute option.
     * @param index The given compute option index.
     * @param startTime The time compute is started (block.timestamp).
     * @param units The number of compute units to run.
     * @return maxTime The max time compute is expected to run (block.timestamp).
     * @dev This function must return even when a compute option is no longer valid.
     */
    function getComputeOptionSLA(
        uint256 index,
        uint64 startTime,
        uint64 units
    ) external view returns (uint64 maxTime);

    function supportsInterface(bytes4 interfaceId) external returns (bool);
}
