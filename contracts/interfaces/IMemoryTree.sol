// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IMemoryTree {
    struct MemoryTreeDetails {
        address brainAddress;
        uint256 brainId;
        uint256 rootNode;
    }
    struct MemoryNode {
        uint256 memoryTreeId;
        uint256[] children;
        string storageURI;
    }

    event MemoryNodeAdded(address brainAddress, uint256 brainId, uint256 nodeId, bytes32 nodeHash);

    /**
     * Add a root node to create a new memory tree for a given brain.
     * @param brainAddress The address of the brain contract.
     * @param brainId The token id for the brain.
     * @param nodeHash A compute manager identifier for this node.
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
    ) external returns (uint256 treeId, uint256 nodeId);

    /**
     * Add a node to the memory tree for a given brain.
     * @param parentNodeId The parent node for the new node.
     * @param nodeHash A compute manager identifier for this node.
     * @param storageURI The storage URI for the new node.
     * @param signature Function parameters hashed and signed by the signer.
     * @return nodeId The new node id.
     */
    function addNode(
        uint256 parentNodeId,
        bytes32 nodeHash,
        string memory storageURI,
        bytes calldata signature
    ) external returns (uint256 nodeId);

    /**
     * Returns the signer that validates requests.
     * @return signer The signing address.
     */
    function getSigner() external returns (address signer);

    /**
     * Get memory tree details.
     * @param index The index of the memory tree details to return.
     * @return details The memory tree details.
     */
    function getMemoryTreeDetails(uint256 index) external view returns (MemoryTreeDetails memory details);

    /**
     * Get memory tree node.
     * @param index The index of the memory tree node to return.
     * @return node The memory tree node.
     */
    function getMemoryNode(uint256 index) external view returns (MemoryNode memory node);

    function supportsInterface(bytes4 interfaceId) external returns (bool);
}
