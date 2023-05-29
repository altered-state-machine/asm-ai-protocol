// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../contracts/samples/MemoryTree.sol";

import "../contracts/mocks/MockedMultisig.sol";
import "../contracts/mocks/MockedERC20.sol";
import "../contracts/helpers/Errors.sol";

import "./helpers/TestContractConfig.test.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Test the Memory Tree contract.
 */
contract MemoryTreeTestContract is TestContractConfig {
    // Events copied from IMemoryTree.sol
    event MemoryNodeAdded(address brainAddress, uint256 brainId, uint256 nodeId, bytes32 nodeHash);

    // Random key. DO NOT USE IN A PRODUCTION ENVIRONMENT
    uint256 private pk = 0xabfa816b2d044fca73f609721c7811b3876e69f915a5398bdb88b3ce5bf28a61;

    function setupContracts() internal override {
        super.setupContracts();
        tree1_.setSigner(vm.addr(pk));
    }

    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function test_addMemoryTree() public skip(false) {
        // Not authorised
        vm.startPrank(computeManager1);
        vm.expectRevert(
            abi.encodeWithSelector(InvalidCaller.selector, MUST_BE_CALLED_BY_OWNER, user1, computeManager1)
        );
        tree1_.addMemoryTree(
            brain1,
            0,
            "xyz",
            "abc",
            _sign(abi.encodePacked(brain1, uint256(0), bytes32("xyz"), "abc"), pk)
        );
        vm.stopPrank();

        // Happy path
        uint256 treeId;
        uint256 nodeId;
        vm.startPrank(user1);
        vm.expectEmit(true, true, true, true);
        emit MemoryNodeAdded(brain1, uint256(0), uint256(1), bytes32("xyz")); // first node is 1, not 0
        (treeId, nodeId) = tree1_.addMemoryTree(
            brain1,
            0,
            "xyz",
            "abc",
            _sign(abi.encodePacked(brain1, uint256(0), bytes32("xyz"), "abc"), pk)
        );
        vm.stopPrank();
        IMemoryTree.MemoryTreeDetails memory details = tree1_.getMemoryTreeDetails(treeId);
        IMemoryTree.MemoryNode memory node = tree1_.getMemoryNode(nodeId);

        assertEq(details.brainAddress, brain1, "Wrong brain address");
        assertEq(details.brainId, 0, "Wrong brain id");
        assertEq(details.rootNode, nodeId, "Wrong root node id");
        assertEq(node.children.length, 0, "Has children");
        assertEq(node.storageURI, "abc", "Wrong storage URI");
    }

    function test_addNode() public skip(false) {
        uint256 treeId;
        uint256 nodeId;
        uint256 parentNodeId;

        vm.startPrank(user1);
        (treeId, parentNodeId) = tree1_.addMemoryTree(
            brain1,
            0,
            "xyz",
            "abc",
            _sign(abi.encodePacked(brain1, uint256(0), bytes32("xyz"), "abc"), pk)
        );

        vm.stopPrank();

        // Not authorised
        vm.startPrank(computeManager1);
        vm.expectRevert(
            abi.encodeWithSelector(InvalidCaller.selector, MUST_BE_CALLED_BY_OWNER, user1, computeManager1)
        );
        tree1_.addNode(parentNodeId, "xyz", "def", _sign(abi.encodePacked(parentNodeId, bytes32("xyz"), "def"), pk));
        vm.stopPrank();

        // Happy path
        vm.startPrank(user1);
        vm.expectEmit(true, true, true, true);
        emit MemoryNodeAdded(brain1, uint256(0), uint256(2), bytes32("xyz"));
        nodeId = tree1_.addNode(
            parentNodeId,
            bytes32("xyz"),
            "def",
            _sign(abi.encodePacked(parentNodeId, bytes32("xyz"), "def"), pk)
        );
        vm.stopPrank();

        IMemoryTree.MemoryNode memory result = tree1_.getMemoryNode(nodeId);
        assertEq(result.children.length, 0, "Has children");
        assertEq(result.storageURI, "def", "Wrong storage URI");

        result = tree1_.getMemoryNode(parentNodeId);
        assertEq(result.children.length, 1, "Doesn't have children");
        assertEq(result.children[0], nodeId, "Wrong child id");
        assertEq(result.storageURI, "abc", "Wrong storage URI");
    }

    function bytesToBytes32(bytes memory b) private pure returns (bytes32) {
        bytes32 out;

        for (uint256 i = 0; i < 32; i++) {
            out |= bytes32(b[i] & 0xFF) >> (i * 8);
        }
        return out;
    }
}
