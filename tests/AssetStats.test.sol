// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/samples/AssetStats.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the Asset Stats contract.
 */
contract AssetStatsTestContract is DSTest {
    Vm internal vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    address internal manager = 0x1Fb0E85b7Ba55F0384d0E06D81DF915aeb3baca3;
    address internal assetAddr1 = 0xd3FCC8ac59D722686947f045E37E0827cc41f657;
    address internal assetAddr2 = 0xd9AF101c8eE32ba4e3362df88Ae88c518A471998;

    AssetStats internal stats_;
    address internal stats;

    function setUp() public virtual {
        deployContracts();
        setupWallets();
    }

    function deployContracts() internal virtual {
        stats_ = new AssetStats(manager);
        stats = address(stats_);
    }

    function setupWallets() internal virtual {
        // Give 10 ETH
        vm.deal(manager, 10e18);
    }

    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function test_baseURI() public skip(false) {
        // Not authorised
        string memory errMsg = getRoleErrorMessage(address(this), MANAGER_ROLE);
        vm.expectRevert(abi.encodePacked(errMsg));
        stats_.setBaseURI("abc");

        // Happy path
        vm.prank(manager);
        stats_.setBaseURI("ipfs://base/");

        assertEq(
            stats_.tokenURI(assetAddr1, 1),
            "ipfs://base/0xd3fcc8ac59d722686947f045e37e0827cc41f657/1",
            "Wrong URI"
        );
        assertEq(
            stats_.tokenURI(assetAddr1, 2),
            "ipfs://base/0xd3fcc8ac59d722686947f045e37e0827cc41f657/2",
            "Wrong URI"
        );
        assertEq(
            stats_.tokenURI(assetAddr2, 1),
            "ipfs://base/0xd9af101c8ee32ba4e3362df88ae88c518a471998/1",
            "Wrong URI"
        );
        assertEq(
            stats_.tokenURI(assetAddr2, 2),
            "ipfs://base/0xd9af101c8ee32ba4e3362df88ae88c518a471998/2",
            "Wrong URI"
        );
    }

    function test_addressURI() public skip(false) {
        // Not authorised
        string memory errMsg = getRoleErrorMessage(address(this), MANAGER_ROLE);
        vm.expectRevert(abi.encodePacked(errMsg));
        stats_.setAddressBaseURI(assetAddr1, "abc");

        // Happy path
        vm.prank(manager);
        stats_.setAddressBaseURI(assetAddr1, "ipfs://addr1/");

        assertEq(stats_.tokenURI(assetAddr1, 1), "ipfs://addr1/1", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr1, 2), "ipfs://addr1/2", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr2, 1), "", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr2, 2), "", "Wrong URI");

        // Failover to baseURI
        vm.prank(manager);
        stats_.setBaseURI("ipfs://base/");

        assertEq(stats_.tokenURI(assetAddr1, 1), "ipfs://addr1/1", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr1, 2), "ipfs://addr1/2", "Wrong URI");
        assertEq(
            stats_.tokenURI(assetAddr2, 1),
            "ipfs://base/0xd9af101c8ee32ba4e3362df88ae88c518a471998/1",
            "Wrong URI"
        );
        assertEq(
            stats_.tokenURI(assetAddr2, 2),
            "ipfs://base/0xd9af101c8ee32ba4e3362df88ae88c518a471998/2",
            "Wrong URI"
        );
    }

    function test_addressTokenURI() public skip(false) {
        // Not authorised
        string memory errMsg = getRoleErrorMessage(address(this), MANAGER_ROLE);
        vm.expectRevert(abi.encodePacked(errMsg));
        stats_.setAddressTokenIdBaseURI(assetAddr1, 1, "abc");

        // Happy path
        vm.prank(manager);
        stats_.setAddressTokenIdBaseURI(assetAddr1, 1, "ipfs://addr1token1");

        assertEq(stats_.tokenURI(assetAddr1, 1), "ipfs://addr1token1", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr1, 2), "", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr2, 1), "", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr2, 2), "", "Wrong URI");

        // Failover to address URI
        vm.prank(manager);
        stats_.setAddressBaseURI(assetAddr1, "ipfs://addr1/");

        assertEq(stats_.tokenURI(assetAddr1, 1), "ipfs://addr1token1", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr1, 2), "ipfs://addr1/2", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr2, 1), "", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr2, 2), "", "Wrong URI");

        // Failover to baseURI
        vm.prank(manager);
        stats_.setBaseURI("ipfs://base/");

        assertEq(stats_.tokenURI(assetAddr1, 1), "ipfs://addr1token1", "Wrong URI");
        assertEq(stats_.tokenURI(assetAddr1, 2), "ipfs://addr1/2", "Wrong URI");
        assertEq(
            stats_.tokenURI(assetAddr2, 1),
            "ipfs://base/0xd9af101c8ee32ba4e3362df88ae88c518a471998/1",
            "Wrong URI"
        );
        assertEq(
            stats_.tokenURI(assetAddr2, 2),
            "ipfs://base/0xd9af101c8ee32ba4e3362df88ae88c518a471998/2",
            "Wrong URI"
        );
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
