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
contract MemoryTreeEnumerableTestContract is TestContractConfig {
    // Random key. DO NOT USE IN A PRODUCTION ENVIRONMENT
    uint256 private pk = 0xabfa816b2d044fca73f609721c7811b3876e69f915a5398bdb88b3ce5bf28a61;

    function setupContracts() internal override {
        super.setupContracts();
        tree1_.setSigner(vm.addr(pk));
    }

    /** ----------------------------------
     * ! Set up functions
     * ----------------------------------- */

    function addTreeAndNodes(
        address user,
        uint256 brainId
    ) private returns (uint256 treeId, uint256 parentNodeId, uint256 nodeId, uint256 childNodeId) {
        // Add tree
        vm.startPrank(user);
        (treeId, parentNodeId) = tree1_.addMemoryTree(
            brain1,
            brainId,
            "xyz",
            "abc",
            _sign(abi.encodePacked(brain1, brainId, bytes32("xyz"), "abc"), pk)
        );
        // Add node
        nodeId = tree1_.addNode(
            parentNodeId,
            bytes32("xyz"),
            "def",
            _sign(abi.encodePacked(parentNodeId, bytes32("xyz"), "def"), pk)
        );
        // Add child node
        childNodeId = tree1_.addNode(
            nodeId,
            bytes32("xyz"),
            "def",
            _sign(abi.encodePacked(nodeId, bytes32("xyz"), "def"), pk)
        );
        vm.stopPrank();
    }

    /** ----------------------------------
     * ! Public functions
     * ----------------------------------- */

    function test_canEnumerateWithNoNodes() public skip(false) {
        uint256[] memory result = tree1_.memoryTreesOfBrain(brain1, 0);
        assertEq(result.length, 0, "Expected nothing");

        result = tree1_.memoryNodeIdsOfMemoryTree(0);
        assertEq(result.length, 0, "Expected nothing");
    }

    function test_canEnumerate() public skip(false) {
        uint256 treeId;
        uint256 parentNodeId;
        uint256 nodeId;
        uint256 childNodeId;

        (treeId, parentNodeId, nodeId, childNodeId) = addTreeAndNodes(user1, 0);

        uint256[] memory result = tree1_.memoryTreesOfBrain(brain1, 0);
        assertEq(result.length, 1, "Expected 1 tree");
        assertEq(result[0], treeId, "Expected index treeId");

        result = tree1_.memoryNodeIdsOfMemoryTree(treeId);
        assertEq(result.length, 3, "Expected 3 nodes");
        assertEq(result[0], parentNodeId, "Expected index parentNodeId");
        assertEq(result[1], nodeId, "Expected index nodeId");
        assertEq(result[2], childNodeId, "Expected index childNodeId");
    }

    function test_canEnumerateWithMultipleTokens() public skip(false) {
        uint256 treeId;
        uint256 parentNodeId;
        uint256 nodeId;
        uint256 childNodeId;

        addTreeAndNodes(user1, 0);
        (treeId, parentNodeId, nodeId, childNodeId) = addTreeAndNodes(user2, 1);

        uint256[] memory result = tree1_.memoryTreesOfBrain(brain1, 1);
        assertEq(result.length, 1, "Expected 1 tree");
        assertEq(result[0], treeId, "Expected index treeId");

        result = tree1_.memoryNodeIdsOfMemoryTree(treeId);
        assertEq(result.length, 3, "Expected 3 nodes");
        assertEq(result[0], parentNodeId, "Expected index parentNodeId");
        assertEq(result[1], nodeId, "Expected index nodeId");
        assertEq(result[2], childNodeId, "Expected index childNodeId");
    }

    function test_canEnumerateWithMultipleTrees() public skip(false) {
        uint256 treeId1;
        uint256 treeId2;
        uint256 parentNodeId1;
        uint256 parentNodeId2;
        uint256 nodeId1;
        uint256 nodeId2;
        uint256 childNodeId1;
        uint256 childNodeId2;

        (treeId1, parentNodeId1, nodeId1, childNodeId1) = addTreeAndNodes(user1, 0);
        (treeId2, parentNodeId2, nodeId2, childNodeId2) = addTreeAndNodes(user1, 0);

        uint256[] memory result = tree1_.memoryTreesOfBrain(brain1, 0);
        assertEq(result.length, 2, "Expected 2 trees");
        assertEq(result[0], treeId1, "Expected index treeId1");
        assertEq(result[1], treeId2, "Expected index treeId2");

        result = tree1_.memoryNodeIdsOfMemoryTree(treeId1);
        assertEq(result.length, 3, "Expected 3 nodes");
        assertEq(result[0], parentNodeId1, "Expected index parentNodeId1");
        assertEq(result[1], nodeId1, "Expected index nodeId1");
        assertEq(result[2], childNodeId1, "Expected index childNodeId1");
        result = tree1_.memoryNodeIdsOfMemoryTree(treeId2);
        assertEq(result.length, 3, "Expected 3 nodes");
        assertEq(result[0], parentNodeId2, "Expected index parentNodeId2");
        assertEq(result[1], nodeId2, "Expected index nodeId2");
        assertEq(result[2], childNodeId2, "Expected index childNodeId2");

        IMemoryTree.MemoryNode[] memory nodes = tree1_.memoryNodesOfMemoryTree(treeId2);
        assertEq(nodes.length, 3, "Expected 3 nodes");
        assertEq(nodes[0].memoryTreeId, treeId2, "Wrong memory tree id");
        assertEq(nodes[1].memoryTreeId, treeId2, "Wrong memory tree id");
        assertEq(nodes[2].memoryTreeId, treeId2, "Wrong memory tree id");
    }
}
