// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/ComputeRequestManager.sol";

import "../contracts/mocks/MockedMultisig.sol";
import "../contracts/mocks/MockedERC20.sol";
import "../contracts/helpers/Errors.sol";

import "./helpers/GasHelper.test.sol";
import "./helpers/TestContractConfig.test.sol";

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the Compute Request Manager contract.
 */
contract ComputeRequestManagerTestContract is TestContractConfig, GasHelper {
    // Events copied from IComputeRequestManager.sol
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

    function test_pause() public skip(false) {
        vm.prank(user1);
        string memory errMsg = getRoleErrorMessage(user1, MANAGER_ROLE);
        vm.expectRevert(abi.encodePacked(errMsg));
        crm_.pause(); // it's already paused, but this checks the revert because of the wrong role

        vm.prank(user1);
        vm.expectRevert(abi.encodePacked(errMsg));
        crm_.unpause();

        vm.prank(manager); // manager by default
        crm_.unpause();
    }

    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function test_stakeAsto() public skip(false) {
        // Staking increases unlocked balance
        uint256 beforeAsto = asto_.balanceOf(user1);
        uint256 beforeUnlocked = crm_.unlockedAsto(user1);
        vm.prank(user1);
        crm_.stakeAsto(user1, 100);
        assertEq(asto_.balanceOf(user1), beforeAsto - 100, "ASTO not deducted");
        assertEq(crm_.unlockedAsto(user1), beforeUnlocked + 100, "ASTO not added to unlocked");

        // Staking increases unlocked balance of targetted address
        beforeAsto = asto_.balanceOf(user1);
        beforeUnlocked = crm_.unlockedAsto(computeManager1);
        vm.prank(user1);
        crm_.stakeAsto(computeManager1, 100);
        assertEq(asto_.balanceOf(user1), beforeAsto - 100, "ASTO not deducted");
        assertEq(crm_.unlockedAsto(computeManager1), beforeUnlocked + 100, "ASTO not added to unlocked");
    }

    function test_requestCompute() public skip(false) {
        vm.expectRevert("Pausable: paused");
        crm_.requestCompute(computeManager1, 0, 0, "abc");
        vm.prank(manager);
        crm_.unpause();

        uint256 beforeASTO = asto_.balanceOf(user1);
        uint256 afterASTO;
        uint256 optionId;
        uint256 result;
        uint256 expectedCost;
        // ComputeReq params
        bool open;
        address requester;
        address computeManager;
        uint256 escrowAmount;
        uint256 temp;

        /**
         * Given: User1 has approved ASTO for transfer
         * When: User1 requests compute on ComputeManager1
         * Then: Correct ASTO is deducted from User1
         * Then: The compute request is saved
         */
        optionId = computeManager1_.addComputeOption(10, 10);
        expectedCost = 10 * 10;

        vm.prank(user1);
        startMeasuringGas("Request compute");
        result = crm_.requestCompute(computeManager1, optionId, 10, "abc");
        stopMeasuringGas();

        afterASTO = asto_.balanceOf(user1);
        assertEq(afterASTO, beforeASTO - expectedCost, "Incorrect ASTO deducted");
        open = crm_.isComputeRequestOpen(result);
        assertTrue(open, "Compute closed");
        (computeManager, temp) = crm_.getComputeRequestComputeManagerInfo(result);
        assertEq(computeManager, computeManager1, "Wrong computeManager");
        (requester, escrowAmount) = crm_.getComputeRequestUserInfo(result);
        assertEq(requester, user1, "Wrong requester");
        assertEq(escrowAmount, expectedCost, "Incorrect escrow amount");

        /**
         * Given: User1 has staked ASTO
         * When: User1 requests compute on ComputeManager1
         * Then: Correct ASTO is deducted from User1's staked balance
         */
        vm.startPrank(user1);
        asto_.approve(crm, expectedCost);
        crm_.stakeAsto(user1, expectedCost);
        vm.stopPrank();
        beforeASTO = asto_.balanceOf(user1);
        uint256 beforeASTOStaked = crm_.unlockedAsto(user1);

        vm.prank(user1);
        startMeasuringGas("Request compute");
        result = crm_.requestCompute(computeManager1, optionId, 10, "abc");
        stopMeasuringGas();

        afterASTO = asto_.balanceOf(user1);
        assertEq(afterASTO, beforeASTO, "ASTO deducted from account");
        assertEq(crm_.unlockedAsto(user1), beforeASTOStaked - expectedCost, "Incorrect ASTO deducted");

        /**
         * When: User1 requests compute with 0 units
         * Then: Transaction reverts
         */

        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSelector(InvalidComputeRequest.selector, INVALID_COMPUTE_UNITS, uint256(0)));
        crm_.requestCompute(computeManager1, optionId, 0, "abc");

        /**
         * Given: User1 has approved ASTO for transfer
         * Given: ComputeManager has a compute request for 0 units
         * When: User1 requests compute on ComputeManager1
         * Then: 0 ASTO is deducted from User1
         * Then: The compute request is emitted
         * Then: The compute request is saved
         */
        beforeASTO = asto_.balanceOf(user1);
        optionId = computeManager1_.addComputeOption(0, 10);
        expectedCost = 0;

        vm.prank(user1);
        vm.expectEmit(true, true, true, true);
        emit ComputeRequested(user1, computeManager1, optionId, result + 1, 10, "abc"); // computeId is last result + 1
        startMeasuringGas("Request compute");
        result = crm_.requestCompute(computeManager1, optionId, 10, "abc");
        stopMeasuringGas();

        afterASTO = asto_.balanceOf(user1);
        assertEq(afterASTO, beforeASTO - expectedCost, "Incorrect ASTO deducted");
        open = crm_.isComputeRequestOpen(result);
        assertTrue(open, "Compute closed");
        (computeManager, temp) = crm_.getComputeRequestComputeManagerInfo(result);
        assertEq(computeManager, computeManager1, "Wrong compute manager");
        (requester, escrowAmount) = crm_.getComputeRequestUserInfo(result);
        assertEq(requester, user1, "Wrong requester");
        assertEq(escrowAmount, expectedCost, "Incorrect escrow amount");
    }

    function test_revokeCompute() public skip(false) {
        vm.prank(manager);
        crm_.unpause();

        uint256 optionId;
        uint256 computeId;
        uint256 beforeAsto;

        // ComputeReq params
        bool open;
        uint64 sla;

        /**
         * Given: There is a pending compute request against ComputeManager1
         * Given: The SLA has NOT expired
         * When: User revokes the compute
         * Then: The transaction fails
         */
        optionId = computeManager1_.addComputeOption(10, 10);
        beforeAsto = crm_.unlockedAsto(user1);
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");
        (open, sla) = crm_.isComputeRequestSLAExpired(computeId);

        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSelector(ComputeSLANotReached.selector, sla, uint64(block.timestamp))); // solhint-disable-line not-rely-on-time
        crm_.revokeCompute(computeId);

        /**
         * Given: There is a pending compute request against ComputeManager1
         * Given: The SLA has expired
         * When: User revokes the compute
         * Then: The compute request is marked revoked
         * Then: ASTO is returned to the user
         * Then: Subsequent complete requests fail
         */
        optionId = computeManager1_.addComputeOption(10, 10);
        beforeAsto = crm_.unlockedAsto(user1);
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");
        (open, sla) = crm_.isComputeRequestSLAExpired(computeId);
        vm.warp(sla + 1);

        vm.expectEmit(true, true, true, true);
        emit ComputeRevoked(user1, computeManager1, computeId);
        vm.prank(user1);
        startMeasuringGas("Revoke compute");
        crm_.revokeCompute(computeId);
        stopMeasuringGas();

        open = crm_.isComputeRequestOpen(computeId);
        assertTrue(!open, "Compute open");
        assertEq(crm_.unlockedAsto(user1), beforeAsto, "Incorrect unlocked ASTO");
        vm.expectRevert(ComputeRequestRevoked.selector);
        vm.prank(computeManager1);
        crm_.completeCompute(computeId);
    }

    function test_completeCompute() public skip(false) {
        vm.expectRevert("Pausable: paused");
        crm_.requestCompute(computeManager1, 0, 0, "abc");
        vm.prank(manager);
        crm_.unpause();

        uint256 optionId;
        uint256 computeId;
        address computeManagerOwner;
        address[] memory computeManagerAddrs;
        uint256[] memory computeManagerCosts;

        /**
         * Given: There is a pending compute request against ComputeManager1
         * When: ComputeManager1 completes the compute
         * Then: The compute request is marked completed
         * Then: ASTO is unlocked for the compute manager's owner
         */
        optionId = computeManager1_.addComputeOption(10, 10);
        (computeManagerAddrs, computeManagerCosts) = computeManager1_.getComputeOptionDisbursement(optionId, 100);
        computeManagerOwner = computeManagerAddrs[0];
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");

        vm.expectEmit(true, true, true, true);
        emit ComputeCompleted(user1, computeManager1, computeId);
        startMeasuringGas("Complete compute");
        computeManager1_.completeCompute(computeId);
        stopMeasuringGas();

        assertTrue(!crm_.isComputeRequestOpen(computeId), "Compute open");
        assertEq(crm_.unlockedAsto(computeManagerOwner), 100, "Incorrect unlocked ASTO");

        /**
         * Given: There is a pending compute request against ComputeManager1
         * When: ComputeManager1 completes the compute
         * Then: The compute request is marked completed
         * Then: ASTO is unlocked for the compute manager's owner
         */
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");

        vm.expectEmit(true, true, true, true);
        emit ComputeCompleted(user1, computeManager1, computeId);
        startMeasuringGas("Complete compute");
        computeManager1_.completeCompute(computeId);
        stopMeasuringGas();

        assertTrue(!crm_.isComputeRequestOpen(computeId), "Compute open");
        assertEq(crm_.unlockedAsto(computeManagerOwner), 200, "Incorrect unlocked ASTO"); // Includes last compute

        /**
         * Given: There is a pending compute request against ComputeManager1
         * When: The wrong address attempts to complete the compute
         * Then: The transaction reverts
         */
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");

        vm.expectRevert(
            abi.encodeWithSelector(InvalidCaller.selector, MUST_BE_CALLED_BY_COMPUTE_CUSTODIAN, computeManager1, user1)
        );
        vm.prank(user1);
        crm_.completeCompute(computeId);
    }

    function test_completeCompute_withDaoFee() public skip(false) {
        vm.prank(manager);
        crm_.unpause();

        uint256 optionId;
        uint256 computeId;
        uint256 expectedCost;
        uint256 expectedFee;
        address computeManagerOwner;
        address[] memory computeManagerAddrs;
        uint256[] memory computeManagerCosts;

        /**
         * Given: There is a pending compute request against ComputeManager1
         * Given: The DAO has set a fee
         * When: ComputeManager1 completes the compute
         * Then: The compute request is marked completed
         * Then: ASTO is unlocked for the compute manager's owner - fee
         */
        vm.prank(manager);
        crm_.managerSetDaoFee(10, 1000); // Minimum 10, 10%
        optionId = computeManager1_.addComputeOption(10, 10);
        expectedCost = 10 * 10;
        expectedFee = crm_.getDaoFee(expectedCost);
        (computeManagerAddrs, computeManagerCosts) = computeManager1_.getComputeOptionDisbursement(
            optionId,
            expectedCost
        );
        computeManagerOwner = computeManagerAddrs[0];
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");

        computeManager1_.completeCompute(computeId);

        assertEq(crm_.unlockedAsto(computeManagerOwner), expectedCost - expectedFee, "Incorrect unlocked ASTO");
        assertEq(crm_.unlockedAsto(dao), expectedFee, "Incorrect unlocked ASTO for DAO");
    }

    function test_completeCompute_withDaoFee_over() public skip(false) {
        vm.prank(manager);
        crm_.unpause();

        uint256 optionId;
        uint256 computeId;
        uint256 expectedFee;
        uint256 beforeAsto;
        uint256 beforeAstoDao;

        // ComputeReq params
        address tempAddr;
        uint256 escrowAmount;

        /**
         * Given: There is a pending compute request against ComputeManager1 0 ASTO escrow
         * Given: The DAO has set a fee above the escrow amount
         * Given: The ComputeManager has 0 ASTO staked
         * When: ComputeManager1 completes the compute
         * Then: The transaction is reverted
         */
        expectedFee = 100;
        optionId = computeManager1_.addComputeOption(0, 1);
        vm.prank(manager);
        crm_.managerSetDaoFee(expectedFee, 0);
        assertEq(crm_.getDaoFee(0), expectedFee, "Incorrect DAO Fee");
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 1, "abc");
        (tempAddr, escrowAmount) = crm_.getComputeRequestUserInfo(computeId);
        assertEq(escrowAmount, 0, "Incorrect escrow amount");
        beforeAsto = crm_.unlockedAsto(computeManager1);

        vm.expectRevert(
            abi.encodeWithSelector(
                InsufficientBalance.selector,
                INSUFFICIENT_COMPUTE_CUSTODIAN_ASTO,
                beforeAsto,
                expectedFee
            )
        );
        computeManager1_.completeCompute(computeId);

        /**
         * Given: There is a pending compute request against ComputeManager1 0 ASTO escrow
         * Given: The DAO has set a fee above the escrow amount
         * Given: The ComputeManager has enough ASTO staked
         * When: ComputeManager1 completes the compute
         * Then: ASTO is paid to the DAO by ComputeManager1
         */
        expectedFee = 100;
        vm.prank(user1);
        crm_.stakeAsto(computeManager1, expectedFee);
        optionId = computeManager1_.addComputeOption(0, 1);
        vm.prank(manager);
        crm_.managerSetDaoFee(expectedFee, 0);
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 1, "abc");
        beforeAsto = crm_.unlockedAsto(computeManager1);
        beforeAstoDao = crm_.unlockedAsto(dao);

        computeManager1_.completeCompute(computeId);

        assertEq(crm_.unlockedAsto(computeManager1), beforeAsto - expectedFee, "Incorrect unlocked ASTO");
        assertEq(crm_.unlockedAsto(dao), beforeAstoDao + expectedFee, "Incorrect unlocked ASTO DAO");

        /**
         * Given: There is a pending compute request against ComputeManager1 some ASTO escrow
         * Given: The DAO has set a fee above the escrow amount
         * Given: The ComputeManager has enough ASTO staked to cover the difference
         * When: ComputeManager1 completes the compute
         * Then: ASTO is paid to the DAO by ComputeManager1 and escrow
         */
        expectedFee = 100;
        vm.prank(user1);
        crm_.stakeAsto(computeManager1, expectedFee / 2);
        optionId = computeManager1_.addComputeOption(1, 1);
        vm.prank(manager);
        crm_.managerSetDaoFee(expectedFee, 0);
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, uint64(expectedFee / 2), "abc");
        beforeAsto = crm_.unlockedAsto(computeManager1);
        beforeAstoDao = crm_.unlockedAsto(dao);

        computeManager1_.completeCompute(computeId);

        assertEq(crm_.unlockedAsto(computeManager1), beforeAsto - (expectedFee / 2), "Incorrect unlocked ASTO");
        assertEq(crm_.unlockedAsto(dao), beforeAstoDao + expectedFee, "Incorrect unlocked ASTO DAO");
    }

    function test_managerSetDaoFee() public skip(false) {
        vm.prank(manager);
        crm_.unpause();
        // Happy path in other functions

        /**
         * When: managerSetDaoFee is called by the wrong address
         * Then: The transaction reverts
         */
        vm.prank(user1);
        string memory errMsg = getRoleErrorMessage(user1, MANAGER_ROLE);
        vm.expectRevert(abi.encodePacked(errMsg));
        crm_.managerSetDaoFee(10, 1000); // Minimum 10, 10%
    }

    function test_getDaoFee() public skip(false) {
        uint256 result;
        /**
         * Given: The DAO has set a fee
         * When: A fee calculation request is made
         * Then: The correct value is returned
         */
        vm.prank(manager);
        crm_.managerSetDaoFee(10, 1000); // Minimum 10, 10%

        result = crm_.getDaoFee(100); // 100 -> 10
        assertEq(result, 10, "Incorrect dao fee calc");
        result = crm_.getDaoFee(10); // 10 -> 10 (min)
        assertEq(result, 10, "Incorrect dao fee calc");
        result = crm_.getDaoFee(0); // 0 -> 10 (min)
        assertEq(result, 10, "Incorrect dao fee calc");
        result = crm_.getDaoFee(1000); // 1000 -> 100 (%)
        assertEq(result, 100, "Incorrect dao fee calc");

        /**
         * Given: The DAO has set NO fee
         * When: A fee calculation request is made
         * Then: 0 is returned
         */
        vm.prank(manager);
        crm_.managerSetDaoFee(0, 0); // Minimum 0, 0%

        result = crm_.getDaoFee(100); // 100 -> 0
        assertEq(result, 0, "Incorrect dao fee calc");
        result = crm_.getDaoFee(10); // 10 -> 0
        assertEq(result, 0, "Incorrect dao fee calc");
        result = crm_.getDaoFee(0); // 0 -> 0
        assertEq(result, 0, "Incorrect dao fee calc");

        /**
         * Given: The DAO has set a fixed fee only
         * When: A fee calculation request is made
         * Then: The fixed fee is returned
         */
        vm.prank(manager);
        crm_.managerSetDaoFee(10, 0); // Minimum 10, 0%

        result = crm_.getDaoFee(100); // 100 -> 10
        assertEq(result, 10, "Incorrect dao fee calc");
        result = crm_.getDaoFee(10); // 10 -> 10
        assertEq(result, 10, "Incorrect dao fee calc");
        result = crm_.getDaoFee(0); // 0 -> 10
        assertEq(result, 10, "Incorrect dao fee calc");

        /**
         * Given: The DAO has set a percentage fee only
         * When: A fee calculation request is made
         * Then: The percentage fee is returned
         */
        vm.prank(manager);
        crm_.managerSetDaoFee(0, 1000); // Minimum 0, 10%

        result = crm_.getDaoFee(100); // 100 -> 10
        assertEq(result, 10, "Incorrect dao fee calc");
        result = crm_.getDaoFee(10); // 10 -> 1
        assertEq(result, 1, "Incorrect dao fee calc");
        result = crm_.getDaoFee(0); // 0 -> 0
        assertEq(result, 0, "Incorrect dao fee calc");

        /**
         * Given: The DAO has set a fractional percentage fee
         * When: A fee calculation request is made
         * Then: The percentage fee is returned
         */
        vm.prank(manager);
        crm_.managerSetDaoFee(0, 1); // Minimum 0, 0.01%

        result = crm_.getDaoFee(10000); // 10000 -> 1
        assertEq(result, 1, "Incorrect dao fee calc");
        result = crm_.getDaoFee(11111); // 11111 -> 1 (Rounding down)
        assertEq(result, 1, "Incorrect dao fee calc");
        result = crm_.getDaoFee(100); // 100 -> 0 (Rounding down)
        assertEq(result, 0, "Incorrect dao fee calc");
    }

    function test_claimAsto() public skip(false) {
        vm.expectRevert("Pausable: paused");
        crm_.requestCompute(computeManager1, 0, 0, "abc");
        vm.prank(manager);
        crm_.unpause();

        uint256 optionId;
        uint256 computeId;
        uint256 unlockedAmount;
        address computeManagerOwner;
        address[] memory computeManagerAddrs;
        uint256[] memory computeManagerCosts;
        uint256 balanceBefore;

        /**
         * Given: There is ASTO available to be claimed
         * When: The claimee requests the ASTO
         * Then: Their balance increases
         */
        optionId = computeManager1_.addComputeOption(10, 10);
        (computeManagerAddrs, computeManagerCosts) = computeManager1_.getComputeOptionDisbursement(optionId, 0);
        computeManagerOwner = computeManagerAddrs[0];
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");
        computeManager1_.completeCompute(computeId);
        unlockedAmount = crm_.unlockedAsto(computeManagerOwner);
        assertTrue(unlockedAmount != 0, "Unlocked amount is zero");
        balanceBefore = asto_.balanceOf(computeManagerOwner);

        vm.prank(computeManagerOwner);
        startMeasuringGas("Claim ASTO");
        crm_.claimAsto(computeManagerOwner, unlockedAmount);
        stopMeasuringGas();

        assertEq(asto_.balanceOf(computeManagerOwner), balanceBefore + unlockedAmount, "Incorrect ASTO amount claimed");
        assertEq(crm_.unlockedAsto(computeManagerOwner), 0, "Incorrect unlocked ASTO");

        /**
         * Given: There is no ASTO available to be claimed
         * When: The claimee requests the ASTO
         * Then: The transaction reverts
         */
        vm.expectRevert(abi.encodeWithSelector(InsufficientBalance.selector, INSUFFICIENT_UNLOCKED_ASTO, 0, 100));
        crm_.claimAsto(computeManagerOwner, 100);
    }
}
