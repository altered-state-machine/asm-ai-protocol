// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./interfaces/IPayment.sol";
import "./helpers/Errors.sol";
import "./helpers/Control.sol";
import "./interfaces/IComputeManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * ASM Payment
 */
contract Payment is IPayment, Control, ReentrancyGuard {
    address public immutable dao;
    IERC20 public immutable asto;

    mapping(address => uint256) public unlockedAsto;

    // DAO Fees
    uint256 public minimumFee;
    uint24 public percentageFee; // Basis points

    constructor(
        address dao_,
        address asto_,
        address manager
    ) Control(manager) {
        dao = dao_;
        asto = IERC20(asto_);
    }

    /**
     * Return escrow funds to the requester.
     * @param requester The address of the requester.
     */
    function _repayCompute(address requester, uint256 amount) internal {
        if (amount > 0) {
            bool success = asto.transfer(requester, amount);
            if (!success) revert ASTOPaymentFailed(amount);
        }
    }

    /**
     * Complete a compute request.
     * @param computeManager The compute manager address.
     * @param optionId The given compute option index.
     * @param amount The total amount held in escrow.
     * @notice This unlocks ASTO held in escrow.
     */
    function _reimburseCompute(
        address computeManager,
        uint256 optionId,
        uint256 amount
    ) internal nonReentrant {
        // DAO Fee
        uint256 daoFee = getDaoFee(amount);

        if (daoFee > amount) {
            // All payment to DAO. Compute manager covers the difference
            uint256 astoShort = daoFee - amount;
            if (unlockedAsto[computeManager] < astoShort)
                revert InsufficientBalance(
                    INSUFFICIENT_COMPUTE_CUSTODIAN_ASTO,
                    unlockedAsto[computeManager],
                    astoShort
                );
            unlockedAsto[computeManager] -= astoShort;
        } else if (daoFee != amount) {
            // Unlock ASTO for disbursement
            uint256 astoLeft = amount - daoFee;
            address[] memory addresses;
            uint256[] memory amounts;
            (addresses, amounts) = IComputeManager(computeManager).getComputeOptionDisbursement(optionId, astoLeft);
            if (addresses.length != amounts.length) revert InvalidDisbursement(INVALID_ARRAY_LENGTHS);
            uint256 amountsTotal = 0;
            for (uint256 i = 0; i < amounts.length; i++) {
                amountsTotal += amounts[i];
                unlockedAsto[addresses[i]] += amounts[i];
            }
            if (amountsTotal != astoLeft) revert InvalidDisbursement(INVALID_TOTAL_AMOUNT);
        }
        unlockedAsto[dao] += daoFee;
    }

    /**
     * Claim unlocked ASTO for a claimee.
     * @param to The address to send the claimed ASTO to.
     * @param amount The amount of ASTO to claim.
     * @notice ASTO is claimed from the callers unlocked balance.
     */
    function claimAsto(address to, uint256 amount) external nonReentrant whenNotPaused {
        if (unlockedAsto[msg.sender] < amount)
            revert InsufficientBalance(INSUFFICIENT_UNLOCKED_ASTO, unlockedAsto[msg.sender], amount);
        unlockedAsto[msg.sender] -= amount;
        bool success = asto.transfer(to, amount);
        if (!success) revert ASTOPaymentFailed(amount);
    }

    /**
     * Stake ASTO to be used for payments.
     * @param to The address to recieve the staked amount.
     * @param amount The amount of ASTO to stake.
     * @notice Staked ASTO will be used to pay for compute requests.
     * @notice Compute manager may claim their staked ASTO at any time.
     * @dev This ASTO is added to the callers unlocked balance.
     */
    function stakeAsto(address to, uint256 amount) external {
        bool success = asto.transferFrom(msg.sender, address(this), amount);
        if (!success) revert ASTOPaymentFailed(amount);
        unlockedAsto[to] += amount;
    }

    //
    // Management
    //

    /**
     * Set the DAO fees.
     * @dev only MANAGER_ROLE can call this function.
     * @param minimumFee_ The minimum amount to be charged.
     * @param percentageFee_ The percentage fee in basis points.
     */
    function managerSetDaoFee(uint256 minimumFee_, uint24 percentageFee_) external onlyRole(MANAGER_ROLE) {
        minimumFee = minimumFee_;
        percentageFee = percentageFee_;
        emit DaoFeeUpdated(minimumFee, percentageFee);
    }

    //
    // Helper functions
    //

    /*
     * Returns the DAO fees.
     * @param amount The compute cost in ASTO.
     * @return daoFee The amount of ASTO taken by the DAO.
     * @notice The DAO fee will take a percentage of the compute cost or the minimum, whichever is higher.
     * @dev Fractions are rounded down.
     */
    function getDaoFee(uint256 amount) public view returns (uint256 daoFee) {
        uint256 percentage = (amount * percentageFee) / 10000;
        return percentage > minimumFee ? percentage : minimumFee;
    }

    /**
     * Pay for a compute request in ASTO.
     * @param computeManager The address of the compute manager contract.
     * @param index The given compute option index.
     * @return cost The amount of ASTO paid by the caller.
     * @dev The caller of this method is charged for compute.
     * @notice Payment is taken from the staked balance if there is enough, otherwise from the ASTO contract.
     */
    function _payForCompute(
        address computeManager,
        uint256 index,
        uint64 units
    ) internal returns (uint256 cost) {
        cost = IComputeManager(computeManager).getComputeOptionUnitCost(index, units);
        if (cost > unlockedAsto[msg.sender]) {
            bool success = asto.transferFrom(msg.sender, address(this), cost);
            if (!success) revert ASTOPaymentFailed(cost);
        } else {
            unchecked {
                unlockedAsto[msg.sender] -= cost;
            }
        }
        return cost;
    }

    /**
     * Correct account's unlockedAsto balance without transferring ASTO.
     * @dev only MANAGER_ROLE can call this function.
     * @param account The address of the compute manager contract.
     * @param amount The amount of ASTO to decrease.
     * */
    function managerCorrectBalance(address account, uint256 amount) external onlyRole(MANAGER_ROLE) {
        unlockedAsto[account] = amount;
        emit AccountBalanceCorrected(account, amount);
    }

    /**
     * Withdraw ASTO
     * @dev only MANAGER_ROLE can call this function.
     * @param amount The amount of ASTO to withdraw.
     * @param addr address to send ASTO to.
     * */
    function managerWithdrawASTO(uint256 amount, address addr) external onlyRole(MANAGER_ROLE) {
        bool success = asto.transfer(addr, amount);
        if (!success) revert ASTOPaymentFailed(amount);
    }
}
