// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../interfaces/IMemoryTree.sol";
import "../helpers/Errors.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * Memory Tree.
 */
contract MemoryTree is IMemoryTree, ERC165, Errors, Ownable {
    using ECDSA for bytes32;

    address private _signer;

    uint256 internal totalTrees;
    uint256 internal totalNodes;
    mapping(uint256 => MemoryTreeDetails) internal trees;
    mapping(uint256 => MemoryNode) internal nodes;

    constructor() {
        _signer = msg.sender;
    }

    /**
     * Checks if the signature matches data signed by the signer.
     * @param data The data to sign.
     * @param signature The expected signed data.
     * @dev Reverts if the signature is invalid.
     */
    modifier signed(bytes memory data, bytes memory signature) {
        address dataSigner = keccak256(data).toEthSignedMessageHash().recover(signature);
        if (dataSigner != _signer) revert InvalidSignature();
        _;
    }

    /**
     * Add a root node to create a new memory tree for a given brain.
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
    )
        public
        virtual
        signed(abi.encodePacked(brainAddress, brainId, nodeHash, storageURI), signature)
        returns (uint256 treeId, uint256 nodeId)
    {
        // Check owner
        _ensureCallerIsOwner(brainAddress, brainId);

        // Add memory tree details

        // Add memory node
        nodeId = createNewNode(totalTrees, storageURI);
        emit MemoryNodeAdded(brainAddress, brainId, nodeId, nodeHash);
        trees[totalTrees] = MemoryTreeDetails(brainAddress, brainId, nodeId);

        return (totalTrees++, nodeId);
    }

    /**
     * Add a node to the memory tree for a given brain.
     * @param parentNodeId The parent node for the new node.
     * @param nodeHash A studio identifier for this node.
     * @param storageURI The storage URI for the new node.
     * @param signature Function parameters hashed and signed by the signer.
     * @return nodeId The new node id.
     */
    function addNode(
        uint256 parentNodeId,
        bytes32 nodeHash,
        string memory storageURI,
        bytes calldata signature
    ) public virtual signed(abi.encodePacked(parentNodeId, nodeHash, storageURI), signature) returns (uint256 nodeId) {
        // Check owner
        MemoryNode storage parent = nodes[parentNodeId];
        MemoryTreeDetails storage tree = trees[parent.memoryTreeId];
        _ensureCallerIsOwner(tree.brainAddress, tree.brainId);

        nodeId = createNewNode(parent.memoryTreeId, storageURI);
        emit MemoryNodeAdded(tree.brainAddress, tree.brainId, nodeId, nodeHash);
        parent.children.push(nodeId);
        return nodeId;
    }

    /**
     * Creates a new node with the given storageURI.
     * @param memoryTreeId The id of the memory tree.
     * @param storageURI The storage URI.
     * @return nodeId The new memory nodes id.
     */
    function createNewNode(uint256 memoryTreeId, string memory storageURI) private returns (uint256 nodeId) {
        nodeId = ++totalNodes; // start with 1
        nodes[nodeId] = MemoryNode(memoryTreeId, new uint256[](0), storageURI);
    }

    //
    // Admin
    //

    /**
     * Set the signer the validates requests.
     * @param signer The signing address.
     */
    function setSigner(address signer) external onlyOwner {
        _signer = signer;
    }

    //
    // Views
    //

    /**
     * Ensures the owner is the sender.
     * @param brainAddress The address of the brain contract.
     * @param brainId The token id to check.
     * @dev Reverts if the caller is not the owner.
     */
    function _ensureCallerIsOwner(address brainAddress, uint256 brainId) private view {
        address brainOwner = IERC721(brainAddress).ownerOf(brainId);
        if (msg.sender != brainOwner) revert InvalidCaller(MUST_BE_CALLED_BY_OWNER, brainOwner, msg.sender);
    }

    /**
     * Returns the signer that validates requests.
     * @return signer The signing address.
     */
    function getSigner() external view returns (address signer) {
        return _signer;
    }

    /**
     * Get memory tree details.
     * @param index The index of the memory tree details to return.
     * @return details The memory tree details.
     */
    function getMemoryTreeDetails(uint256 index) external view returns (MemoryTreeDetails memory details) {
        return trees[index];
    }

    /**
     * Get memory tree node.
     * @param index The index of the memory tree node to return.
     * @return node The memory tree node.
     */
    function getMemoryNode(uint256 index) external view returns (MemoryNode memory node) {
        return nodes[index];
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(IMemoryTree, ERC165) returns (bool) {
        return interfaceId == type(IMemoryTree).interfaceId || ERC165.supportsInterface(interfaceId);
    }
}
