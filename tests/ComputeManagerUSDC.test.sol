// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/samples/ComputeManagerUSDC.sol";

import "../contracts/mocks/MockedMultisig.sol";
import "../contracts/mocks/MockedERC20.sol";
import "../contracts/helpers/Errors.sol";

import "./ComputeManagerSimple.test.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the ComputeManager USDC contract.
 */
contract ComputeManagerUSDCTestContract is ComputeManagerSimpleTestContract {
    address internal usdc;
    // Random addresses for mocking uniswap
    address internal uPairMock = 0x8208012ce9BfAe70c8A4DB8588953245b54865C0;
    address internal uRouterMock = 0xD06F7344892Ef7F05A791309ADFB2d98254C3DE1;

    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function setUp() public virtual override {
        TestContractConfig.setUp();

        // Override ComputeManager
        computeManager1_ = new ComputeManagerUSDC(asto, usdc, uPairMock, uRouterMock, crm);
        computeManager1 = address(computeManager1_);
    }

    function deployContracts() internal virtual override {
        TestContractConfig.deployContracts();

        usdc_ = new MockedERC20("USDC", "USDC", user1, 1000 * 10e6, 6);
        usdc = address(usdc_);
        // Mocks
        vm.mockCall(uPairMock, abi.encodeWithSelector(IUniswapV2Pair.token0.selector), abi.encode(asto));
        vm.mockCall(uPairMock, abi.encodeWithSelector(IUniswapV2Pair.getReserves.selector), abi.encode(100, 100, 100));
        uRouterMock = address(new MockedUniswapV2Router02());
        // Fund mock LP
        asto_.mint(uRouterMock, 100 * 10e18);
        usdc_.mint(uRouterMock, 100 * 10e18);
    }

    function setupContracts() internal virtual override {
        TestContractConfig.setupContracts();

        // Set allowances
        vm.prank(user1);
        usdc_.increaseAllowance(crm, 100 * 10e6);
    }

    function test_getComputeOptionUnitCost() public override skip(false) {
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
         * Then: 20 is returned (doubled by mock contract)
         */
        vm.prank(user1);
        result = computeManager1_.getComputeOptionUnitCost(optionId, 1);
        assertEq(result, 20, "Compute unit cost calculated incorrectly");
        vm.stopPrank();

        /**
         * Given: Compute option with unit cost 10
         * When: 10 units supplied
         * Then: 200 is returned (doubled by mock contract)
         */
        vm.prank(user1);
        startMeasuringGas("Compute Unit Cost");
        result = computeManager1_.getComputeOptionUnitCost(optionId, 10);
        stopMeasuringGas();
        assertEq(result, 200, "Compute unit cost calculated incorrectly");
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
}
