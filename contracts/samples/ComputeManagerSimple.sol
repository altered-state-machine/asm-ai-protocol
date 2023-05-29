// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../interfaces/IComputeManager.sol";
import "../interfaces/IComputeRequestManager.sol";
import "../helpers/Errors.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * ComputeManager.
 * @notice This is a sample implementation.
 */
contract ComputeManagerSimple is IComputeManager, ERC165, Ownable, Errors {
    IComputeRequestManager public immutable computeRequestManager;

    struct ComputeOption {
        bool enabled; // Compute option is active
        uint256 unitCost; // ASTO per compute unit
        uint256 unitSeconds; // Seconds per compute unit
    }
    mapping(uint256 => ComputeOption) public computeOptions;
    uint256 public totalComputeOptions;

    constructor(address computeRequestManager_) {
        computeRequestManager = IComputeRequestManager(computeRequestManager_);
    }

    modifier validComputeIndex(uint256 index) {
        if (index < totalComputeOptions) _;
        else revert InvalidComputeIndex();
    }

    /**
     * Get the cost for a given compute option.
     * @param index The given compute option index.
     * @param units The number of compute units to run.
     * @return cost The cost in ASTO.
     * @dev This function should revert if the compute option is no longer valid.
     */
    function getComputeOptionUnitCost(uint256 index, uint64 units)
        public
        view
        virtual
        validComputeIndex(index)
        returns (uint256 cost)
    {
        if (!computeOptions[index].enabled) revert ComputeInactive();
        return computeOptions[index].unitCost * units;
    }

    /**
     * Get the disbursement information for given compute option.
     * @param index The given compute option index.
     * @param amount The amount of ASTO to be distributed.
     * @return addresses The addresses to distribute to.
     * @return amounts The amount to distribute to each address.
     * @dev The total amounts must be less or equal to the input amount.
     * @dev This function must return even when a compute option is no longer valid.
     */
    function getComputeOptionDisbursement(uint256 index, uint256 amount)
        public
        view
        virtual
        validComputeIndex(index)
        returns (address[] memory addresses, uint256[] memory amounts)
    {
        // We always take it all
        addresses = new address[](1);
        addresses[0] = owner();
        amounts = new uint256[](1);
        amounts[0] = amount;
        return (addresses, amounts);
    }

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
    ) public view virtual validComputeIndex(index) returns (uint64 maxTime) {
        return startTime + (uint64(computeOptions[index].unitSeconds) * units);
    }

    //
    // Administration
    //

    /**
     * Add a new compute option.
     * @param unitCost The unit cost of the compute option.
     * @param unitMinutes The expected number of minutes per compute unit.
     * @return index The added compute option id.
     * @notice Only callable by owner.
     */
    function addComputeOption(uint256 unitCost, uint256 unitMinutes)
        external
        virtual
        onlyOwner
        returns (uint256 index)
    {
        computeOptions[totalComputeOptions] = ComputeOption(true, unitCost, unitMinutes * 1 minutes);
        return totalComputeOptions++;
    }

    /**
     * Update an compute option.
     * @param computeId The compute id to update.
     * @param active The active setting of the compute option.
     * @param unitCost The unit cost of the compute option.
     * @param unitMinutes The expected number of minutes per compute unit.
     * @notice Only callable by owner.
     * @dev Only for updates. Use addComputeOption for new options.
     */
    function updateComputeOption(
        uint256 computeId,
        bool active,
        uint256 unitCost,
        uint256 unitMinutes
    ) external virtual onlyOwner validComputeIndex(computeId) {
        computeOptions[computeId] = ComputeOption(active, unitCost, unitMinutes * 1 minutes);
    }

    /**
     * Complete a compute request.
     * @param computeId The compute id to update.
     * @notice Only callable by owner.
     */
    function completeCompute(uint256 computeId) external virtual onlyOwner {
        return computeRequestManager.completeCompute(computeId);
    }

    /**
     * Claim unlocked ASTO for the compute manager.
     * @param to The address to send the claimed ASTO to.
     * @param amount The amount of ASTO to claim.
     * @notice Only callable by owner.
     */
    function claimAsto(address to, uint256 amount) external virtual onlyOwner {
        computeRequestManager.claimAsto(to, amount);
    }

    //
    // View methods
    //

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IComputeManager, ERC165)
        returns (bool)
    {
        return interfaceId == type(IComputeManager).interfaceId || ERC165.supportsInterface(interfaceId);
    }
}
