// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/samples/AssetStats.sol";
import "../contracts/samples/AssetStatsRegistry.sol";
import "../contracts/helpers/Errors.sol";

import "./helpers/GasHelper.test.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the Asset Stats contract.
 */
contract AssetStatsRegistryTestContract is GasHelper, DSTest, Errors {
    // Copied from IAssetStatsRegistry.sol
    event RegistryEntryAdded(uint256 index, address statsAddress);
    event RegistryEntryRemoved(uint256 index, address statsAddress);

    Vm internal vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    address internal manager = 0x1Fb0E85b7Ba55F0384d0E06D81DF915aeb3baca3;
    address internal assetAddr1 = 0xd3FCC8ac59D722686947f045E37E0827cc41f657;
    address internal assetAddr2 = 0xd9AF101c8eE32ba4e3362df88Ae88c518A471998;

    AssetStats internal stats1_;
    address internal stats1;
    AssetStats internal stats2_;
    address internal stats2;
    AssetStatsRegistry internal registry_;
    address internal registry;

    function setUp() public virtual {
        deployContracts();
        setupWallets();
    }

    function deployContracts() internal virtual {
        stats1_ = new AssetStats(manager);
        stats1 = address(stats1_);
        stats2_ = new AssetStats(manager);
        stats2 = address(stats2_);

        registry_ = new AssetStatsRegistry();
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
        // Happy path
        vm.prank(manager);
        vm.expectEmit(true, true, true, true);
        emit RegistryEntryAdded(uint256(0), stats1);
        startMeasuringGas("Training Unit Cost");
        uint256 entryId = registry_.registerStats(stats1);
        stopMeasuringGas();

        assertTrue(registry_.isActive(entryId), "Inactive");
        IAssetStatsRegistry.RegistryEntry memory result = registry_.getRegistryEntry(entryId);
        assertEq(result.statsAddress, stats1, "Wrong Address");
        assertEq(result.owner, manager, "Wrong owner");
    }

    function test_deregisterStats() public skip(false) {
        // Set up
        vm.prank(manager);
        uint256 entryId = registry_.registerStats(stats1);

        // Invalid caller
        vm.expectRevert(
            abi.encodeWithSelector(InvalidCaller.selector, MUST_BE_CALLED_BY_OWNER, manager, address(this))
        );
        registry_.deregisterStats(entryId);

        // Happy path
        vm.prank(manager);
        vm.expectEmit(true, true, true, true);
        emit RegistryEntryRemoved(uint256(0), stats1);
        registry_.deregisterStats(entryId);

        assertTrue(!registry_.isActive(entryId), "Active");
        vm.expectRevert(abi.encodeWithSelector(InvalidRegistryIndex.selector, entryId));
        registry_.getRegistryEntry(entryId);
    }

    function test_listActiveStatsAddresses() public skip(false) {
        // 0 stats
        address[] memory results = registry_.listActiveStatsAddresses();
        assertEq(results.length, 0, "Wrong size with none");

        // 1 stats
        vm.prank(manager);
        uint256 entryId1 = registry_.registerStats(stats1);
        results = registry_.listActiveStatsAddresses();
        assertEq(results.length, 1, "Wrong size with one");

        // 2 stats
        vm.prank(manager);
        registry_.registerStats(stats2);
        results = registry_.listActiveStatsAddresses();
        assertEq(results.length, 2, "Wrong size with two");

        // 1 stats (+1 inactive)
        vm.prank(manager);
        registry_.deregisterStats(entryId1);
        results = registry_.listActiveStatsAddresses();
        assertEq(results.length, 1, "Wrong size with inactive");
    }

    /** ----------------------------------
     * ! Test contract helpers
     * ----------------------------------- */

    function getRoleErrorMessage(address addr, bytes32 role) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "AccessControl: account ",
                    Strings.toHexString(uint160(addr), 20),
                    " is missing role ",
                    Strings.toHexString(uint256(role), 32)
                )
            );
    }

    /**
     * @notice this modifier will skip the test
     */
    modifier skip(bool isSkipped) {
        if (!isSkipped) {
            _;
        }
    }

    /**
     * @notice this modifier will skip the testFail*** tests ONLY
     */
    modifier skipFailing(bool isSkipped) {
        if (isSkipped) {
            require(0 == 1);
        } else {
            _;
        }
    }
}
