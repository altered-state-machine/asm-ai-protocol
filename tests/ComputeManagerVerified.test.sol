// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/samples/ComputeManagerVerified.sol";

import "../contracts/mocks/MockedMultisig.sol";
import "../contracts/mocks/MockedERC20.sol";
import "../contracts/helpers/Errors.sol";

import "./ComputeManagerSimple.test.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the ComputeManager Verified contract.
 */
contract ComputeManagerVerifiedTestContract is ComputeManagerSimpleTestContract {
    // Events copied from IComputeRequestManager.sol
    event ComputeCompleted(address indexed requester, address indexed computeManager, uint256 computeId);

    // Random key. DO NOT USE IN A PRODUCTION ENVIRONMENT
    uint256 private pk = 0xabfa816b2d044fca73f609721c7811b3876e69f915a5398bdb88b3ce5bf28a61;

    function deployContracts() internal override {
        TestContractConfig.deployContracts();

        // Override ComputeManager
        computeManager1_ = new ComputeManagerVerified(crm, vm.addr(pk));
        computeManager1 = address(computeManager1_);
    }

    /** ----------------------------------
     * ! Public functions
\     * ----------------------------------- */

    function test_completeComputeSig() public skip(false) {
        vm.expectRevert("Pausable: paused");
        ComputeManagerVerified cm = ComputeManagerVerified(computeManager1);

        crm_.requestCompute(computeManager1, 0, 0, "abc");
        vm.prank(manager);
        crm_.unpause();

        vm.prank(user1);
        uint256 computeId = crm_.requestCompute(computeManager1, 0, 10, "abc");

        // Bad sig
        vm.expectRevert(InvalidSignature.selector);
        vm.prank(user1);
        cm.completeCompute(computeId, _sign(abi.encodePacked(computeId, address(this)), pk));

        // Happy path
        vm.expectEmit(true, true, true, true);
        emit ComputeCompleted(user1, computeManager1, computeId);
        vm.prank(user1);
        cm.completeCompute(computeId, _sign(abi.encodePacked(computeId, user1), pk));

        assertTrue(!crm_.isComputeRequestOpen(computeId), "Compute open");
    }

    function test_completeComputePayment() public skip(false) {
        ComputeManagerVerified cm = ComputeManagerVerified(computeManager1);
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
         * When: user1 completes the compute
         * Then: The compute request is marked completed
         * Then: ASTO is unlocked for the compute manager's owner
         * Then: ASTO is unlocked for user1
         */
        optionId = cm.addComputeOption(10, 10);
        (computeManagerAddrs, computeManagerCosts) = cm.getComputeOptionDisbursement(optionId, 100);
        computeManagerOwner = computeManagerAddrs[0];
        vm.prank(user1);
        computeId = crm_.requestCompute(computeManager1, optionId, 10, "abc");

        vm.expectEmit(true, true, true, true);
        emit ComputeCompleted(user1, computeManager1, computeId);
        vm.prank(user1);
        startMeasuringGas("Complete compute");
        cm.completeCompute(computeId, _sign(abi.encodePacked(computeId, user1), pk));
        stopMeasuringGas();

        assertTrue(!crm_.isComputeRequestOpen(computeId), "Compute open");
        assertEq(crm_.unlockedAsto(computeManagerOwner), 50, "Incorrect unlocked ASTO");
        assertEq(crm_.unlockedAsto(user1), 50, "Incorrect unlocked ASTO");
    }
}
