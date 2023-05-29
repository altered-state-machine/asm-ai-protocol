// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IPayment {
    event AccountBalanceCorrected(address indexed account, uint256 amount);
    event DaoFeeUpdated(uint256 minimumFee, uint24 percentageFee);

    /**
     * Claim unlocked ASTO for a claimee.
     * @param to The address to send the claimed ASTO to.
     * @param amount The amount of ASTO to claim.
     * @notice After compute is completed, ASTO is unlocked for claiming.
     * @notice Caller may claim their unlocked ASTO with this method.
     */
    function claimAsto(address to, uint256 amount) external;

    /**
     * Stake ASTO to be used for payments.
     * @param to The address to recieve the staked amount.
     * @param amount The amount of ASTO to stake.
     * @notice Staked ASTO will be used to pay for compute requests.
     * @notice Caller may claim their staked ASTO at any time.
     * @dev This ASTO is added to the callers unlocked balance.
     */
    function stakeAsto(address to, uint256 amount) external;
}
