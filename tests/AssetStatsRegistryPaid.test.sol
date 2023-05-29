// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/helpers/Errors.sol";
import "../contracts/mocks/MockedERC20.sol";
import "../contracts/samples/AssetStats.sol";
import "../contracts/samples/AssetStatsRegistryPaid.sol";

import "./helpers/GasHelper.test.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the Asset Stats Paid contract.
 */
contract AssetStatsRegistryTestPaidContract is GasHelper, DSTest, Errors {
    // Copied from IAssetStatsRegistry.sol
    event RegistryEntryAdded(uint256 index, address statsAddress);
    event RegistryEntryRemoved(uint256 index, address statsAddress);

    Vm internal vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    address internal dao = 0xca5Fb01F36E8820A91ABb617A8608Db0073E8b3e;
    address internal manager = 0x1Fb0E85b7Ba55F0384d0E06D81DF915aeb3baca3;
    address internal assetAddr1 = 0xd3FCC8ac59D722686947f045E37E0827cc41f657;
    address internal assetAddr2 = 0xd9AF101c8eE32ba4e3362df88Ae88c518A471998;

    AssetStats internal stats1_;
    address internal stats1;
    AssetStats internal stats2_;
    address internal stats2;
    AssetStatsRegistryPaid internal registry_;
    address internal registry;
    MockedERC20 internal asto_;
    address internal asto;

    function setUp() public virtual {
        deployContracts();
        setupWallets();
    }

    function deployContracts() internal virtual {
        stats1_ = new AssetStats(manager);
        stats1 = address(stats1_);
        stats2_ = new AssetStats(manager);
        stats2 = address(stats2_);

        asto_ = new MockedERC20("ASTO", "ASTO", manager, 1000 * 10e18, 18);
        asto = address(asto_);

        registry_ = new AssetStatsRegistryPaid(dao, asto, 1 * 10e18);
        registry = address(registry_);
    }

    function setupWallets() internal virtual {
        // Give 10 ETH
        vm.deal(manager, 10e18);
    }

    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function test_registerStats() public skip(false) {
        // No allowance
        vm.prank(manager);
        vm.expectRevert("ERC20: insufficient allowance");
        registry_.registerStats(stats1);

        // Happy path
        vm.startPrank(manager);
        asto_.approve(registry, 10e18);
        startMeasuringGas("Training Unit Cost");
        uint256 entryId = registry_.registerStats(stats1);
        stopMeasuringGas();
        vm.stopPrank();

        assertTrue(registry_.isActive(entryId), "Inactive");
        IAssetStatsRegistry.RegistryEntry memory result = registry_.getRegistryEntry(entryId);
        assertEq(result.statsAddress, stats1, "Wrong Address");
        assertEq(result.owner, manager, "Wrong owner");
    }

    /** ----------------------------------
     * ! Test contract helpers
     * ----------------------------------- */

    /**
     * @notice this modifier will skip the test
     */
    modifier skip(bool isSkipped) {
        if (!isSkipped) {
            _;
        }
    }
}
