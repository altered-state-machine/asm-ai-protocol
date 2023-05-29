// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./MemoryTree.sol";

/**
 * Memory Tree with enumerable functions.
 */
contract MemoryTreeEnumerable is MemoryTree {
    mapping(bytes32 => uint256) internal _brainTreeCount;
    mapping(bytes32 => uint256) internal _treeIdByBrainIndex;

    function _makeBranIdKey(address brainAddress, uint256 brainId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(brainAddress, brainId));
    }

    function _makeTreeIdKey(
        address brainAddress,
        uint256 brainId,
        uint256 treeIndex
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(brainAddress, brainId, treeIndex));
    }

    /**
     * Add a root node to create a new memory tree for a given brain.
     * This extend the base implementation to index the new tree against the brain.
     * @param brainAddress The address of the brain contract to run compute against.
     * @param brainId The token id for the brain to run compute against.
     * @param nodeHash A studio identifier for this node.
     * @param storageURI The storage URI for the new node.
     * @param signature Function parameters hashed and signed by the signer.
     * @return treeId The new tree id.
     * @return nodeId The new node id.
     */
    function addMemoryTree(
        address brainAddress,
        uint256 brainId,
        bytes32 nodeHash,
        string memory storageURI,
        bytes calldata signature
    ) public virtual override returns (uint256 treeId, uint256 nodeId) {
        (treeId, nodeId) = super.addMemoryTree(brainAddress, brainId, nodeHash, storageURI, signature);

        // Increment the number of trees for this brain so we can enumerate them
        // and index the new tree id against the brain index
        uint256 treeIndex = _brainTreeCount[_makeBranIdKey(brainAddress, brainId)]++;
        _treeIdByBrainIndex[_makeTreeIdKey(brainAddress, brainId, treeIndex)] = treeId;
    }

    /**
     * List all indexes of memory trees associated with the brain.
     * @param brainAddress The address of the brain contract.
     * @param brainId The token id for the brain.
     * @return indexes The indexes of memory trees.
     * @dev This function is expensive and should NOT be called in write functions.
     */
    function memoryTreesOfBrain(address brainAddress, uint256 brainId)
        external
        view
        returns (uint256[] memory indexes)
    {
        uint256 total = _brainTreeCount[_makeBranIdKey(brainAddress, brainId)];
        indexes = new uint256[](total);

        for (uint256 i; i < total; i++) {
            indexes[i] = _treeIdByBrainIndex[_makeTreeIdKey(brainAddress, brainId, i)];
        }

        return indexes;
    }

    /**
     * List all indexes of memory trees associated with the caller.
     * @param treeId The id for the memory to enumerate.
     * @return indexes The indexes of memory tree nodes.
     * @dev This function is expensive and should NOT be called in write functions.
     */
    function memoryNodeIdsOfMemoryTree(uint256 treeId) public view returns (uint256[] memory indexes) {
        // this creates a copy of the array as it's assigning from state
        // to memory.
        indexes = new uint256[](totalNodes);
        uint256 nodesAdded;

        uint256 root = trees[treeId].rootNode;
        if (root == 0) return indexes;

        indexes[nodesAdded] = root;
        ++nodesAdded;

        // Iterate nodes for children
        // Added children will be iterated on as well
        for (uint256 i; i < nodesAdded; ++i) {
            MemoryNode storage node = nodes[indexes[i]];
            uint256[] memory children = node.children;
            for (uint256 j; j < children.length; ++j) {
                // add the children and increment the nodes added
                // so we could iterate on them in the next `i` cycle
                indexes[nodesAdded] = children[j];
                ++nodesAdded;
            }
        }

        // // Resize array
        assembly {
            mstore(indexes, nodesAdded)
        }

        return indexes;
    }

    /**
     * List all indexes of memory trees associated with the caller.
     * @param treeId The id for the memory to enumerate.
     * @return treeNodes The memory tree nodes.
     * @dev This function is expensive and should NOT be called in write functions.
     */
    function memoryNodesOfMemoryTree(uint256 treeId) external view returns (MemoryNode[] memory treeNodes) {
        uint256[] memory indexes = memoryNodeIdsOfMemoryTree(treeId);
        treeNodes = new MemoryNode[](indexes.length);

        for (uint256 i; i < indexes.length; i++) {
            treeNodes[i] = nodes[indexes[i]];
        }

        return treeNodes;
    }
}
