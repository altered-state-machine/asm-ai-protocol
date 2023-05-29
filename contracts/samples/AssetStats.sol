// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../interfaces/IAssetStats.sol";
import "../helpers/Control.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * Asset Stats.
 */
contract AssetStats is IAssetStats, ERC165, Control {
    string private _baseURI;
    mapping(address => string) private _addressBaseURIs;
    mapping(address => mapping(uint256 => string)) private _addressTokenIdBaseURIs;

    constructor(address manager) Control(manager) {}

    // Admin

    /**
     * Set the global base URI.
     * @param uri_ The new URI.
     * @notice Only callable by the manager.
     */
    function setBaseURI(string calldata uri_) external onlyRole(MANAGER_ROLE) {
        _baseURI = uri_;
    }

    /**
     * Set the base URI for a given address.
     * @param assetAddress The asset address.
     * @param uri_ The new URI.
     * @notice Only callable by the manager.
     */
    function setAddressBaseURI(address assetAddress, string calldata uri_) external onlyRole(MANAGER_ROLE) {
        _addressBaseURIs[assetAddress] = uri_;
    }

    /**
     * Set the URI for a given address and token.
     * @param assetAddress The asset address.
     * @param tokenId The token id.
     * @param uri_ The new URI.
     * @notice Only callable by the manager.
     */
    function setAddressTokenIdBaseURI(
        address assetAddress,
        uint256 tokenId,
        string calldata uri_
    ) external onlyRole(MANAGER_ROLE) {
        _addressTokenIdBaseURIs[assetAddress][tokenId] = uri_;
    }

    // Views

    /**
     * Returns the Uniform Resource Identifier (URI) for the given values.
     * @param assetAddress The address of the asset.
     * @param tokenId The id of the token.
     * @return uri The Uniform Resource Identifier (URI) for the given values.
     */
    function tokenURI(address assetAddress, uint256 tokenId) public view override returns (string memory) {
        string memory uri = _addressTokenIdBaseURIs[assetAddress][tokenId];
        if (bytes(uri).length > 0) {
            return uri;
        }
        uri = _addressBaseURIs[assetAddress];
        if (bytes(uri).length > 0) {
            return string(abi.encodePacked(uri, Strings.toString(tokenId)));
        }
        return
            bytes(_baseURI).length > 0
                ? string(abi.encodePacked(_baseURI, Strings.toHexString(assetAddress), "/", Strings.toString(tokenId)))
                : "";
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IAssetStats, ERC165, AccessControl)
        returns (bool)
    {
        return
            interfaceId == type(IAssetStats).interfaceId ||
            AccessControl.supportsInterface(interfaceId) ||
            ERC165.supportsInterface(interfaceId);
    }
}
