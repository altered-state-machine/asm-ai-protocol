// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/samples/ComputeManagerSimple.sol";

import "../contracts/mocks/MockedMultisig.sol";
import "../contracts/mocks/MockedERC20.sol";
import "../contracts/helpers/Errors.sol";

import "./helpers/GasHelper.test.sol";
import "./helpers/TestContractConfig.test.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the ComputeManagerSimple contract.
 */
contract ComputeManagerSimpleTestContract is TestContractConfig, GasHelper {
    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function test_getComputeOptionUnitCost() public virtual skip(false) {
        uint256 result;

        uint256 optionId = computeManager1_.addComputeOption(10, 1);

        /**
         * Given: Compute option with unit cost 10
         * When: 0 units supplied
         * Then: 0 is returned
         */
        vm.prank(user1);
        result = computeManager1_.getComputeOptionUnitCost(optionId, 0);
        assertEq(result, 0, "Compute unit cost calculated incorrectly");
        vm.stopPrank();

        /**
         * Given: Compute option with unit cost 10
         * When: 1 units supplied
         * Then: 10 is returned
         */
        vm.prank(user1);
        result = computeManager1_.getComputeOptionUnitCost(optionId, 1);
        assertEq(result, 10, "Compute unit cost calculated incorrectly");
        vm.stopPrank();

        /**
         * Given: Compute option with unit cost 10
         * When: 10 units supplied
         * Then: 100 is returned
         */
        vm.prank(user1);
        startMeasuringGas("Compute Unit Cost");
        result = computeManager1_.getComputeOptionUnitCost(optionId, 10);
        stopMeasuringGas();
        assertEq(result, 100, "Compute unit cost calculated incorrectly");
        vm.stopPrank();

        /**
         * Given: Compute option id is invalid
         * When: Called
         * Then: Transaction reverts
         */
        vm.prank(user1);
        vm.expectRevert(InvalidComputeIndex.selector);
        computeManager1_.getComputeOptionUnitCost(optionId + 1, 1);
        vm.stopPrank();

        // Compute not enabled
        computeManager1_.updateComputeOption(optionId, false, 10, 1);
        vm.prank(user1);
        vm.expectRevert(ComputeInactive.selector);
        computeManager1_.getComputeOptionUnitCost(optionId, 1);
        vm.stopPrank();
    }

    function test_getComputeOptionDisbursement() public virtual skip(false) {
        address[] memory resultAddrs;
        uint256[] memory resultAmounts;

        address computeManagerOwner = computeManager1_.owner();
        uint256 optionId = computeManager1_.addComputeOption(10, 10);
        uint256[3] memory testAmounts = [uint256(0), 1, 100];

        // Always returns [owner], [amount]
        vm.prank(user1);
        for (uint256 i = 0; i < testAmounts.length; i++) {
            (resultAddrs, resultAmounts) = computeManager1_.getComputeOptionDisbursement(optionId, testAmounts[i]);
            assertEq(resultAddrs.length, 1, "Disbursement returned incorrectly");
            assertEq(resultAddrs[0], computeManagerOwner, "Disbursement returned incorrectly");
            assertEq(resultAmounts.length, 1, "Disbursement returned incorrectly");
            assertEq(resultAmounts[0], testAmounts[i], "Disbursement returned incorrectly");
        }
        vm.stopPrank();

        // Returns the same even when disabled
        computeManager1_.updateComputeOption(optionId, false, 10, 10);
        vm.prank(user1);
        for (uint256 i = 0; i < testAmounts.length; i++) {
            (resultAddrs, resultAmounts) = computeManager1_.getComputeOptionDisbursement(optionId, testAmounts[i]);
            assertEq(resultAddrs.length, 1, "Disbursement returned incorrectly");
            assertEq(resultAddrs[0], computeManagerOwner, "Disbursement returned incorrectly");
            assertEq(resultAmounts.length, 1, "Disbursement returned incorrectly");
            assertEq(resultAmounts[0], testAmounts[i], "Disbursement returned incorrectly");
        }
        vm.stopPrank();
    }

    function test_getComputeOptionSLA() public virtual skip(false) {
        uint256 result;
        uint256 optionId;
        uint64 startTime = uint64(block.timestamp);
        uint256 min = 60;

        // Returns startTime when no SLA
        // 0 per unit, 0 units
        optionId = computeManager1_.addComputeOption(10, 0);
        vm.prank(user1);
        result = computeManager1_.getComputeOptionSLA(optionId, startTime, 0);
        assertEq(result, startTime, "SLA returned incorrectly");
        vm.stopPrank();
        // 0 per unit, 10 units
        vm.prank(user1);
        result = computeManager1_.getComputeOptionSLA(optionId, startTime, 10);
        assertEq(result, startTime, "SLA returned incorrectly");
        vm.stopPrank();
        // 10 per unit, 0 units
        optionId = computeManager1_.addComputeOption(10, 10);
        vm.prank(user1);
        result = computeManager1_.getComputeOptionSLA(optionId, startTime, 0);
        assertEq(result, startTime, "SLA returned incorrectly");
        vm.stopPrank();

        // Correctly calculates SLA
        optionId = computeManager1_.addComputeOption(10, 1);
        vm.prank(user1);
        result = computeManager1_.getComputeOptionSLA(optionId, 0, 1);
        assertEq(result, min, "SLA returned incorrectly"); // 1 minute
        vm.stopPrank();
        optionId = computeManager1_.addComputeOption(10, 10);
        vm.prank(user1);
        result = computeManager1_.getComputeOptionSLA(optionId, 0, 10);
        assertEq(result, 100 * min, "SLA returned incorrectly"); // 10 * 10 minute
        result = computeManager1_.getComputeOptionSLA(optionId, startTime, 10);
        assertEq(result, startTime + 100 * min, "SLA returned incorrectly"); // start + 10 * 10 minutes
        vm.stopPrank();
    }
}
