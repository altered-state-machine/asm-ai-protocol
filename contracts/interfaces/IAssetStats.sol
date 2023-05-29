// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IAssetStats {
    /**
     * Returns the Uniform Resource Identifier (URI) for the given values.
     * @param assetAddress The address of the asset.
     * @param tokenId The id of the token.
     * @return uri The Uniform Resource Identifier (URI) for the given values.
     */
    function tokenURI(address assetAddress, uint256 tokenId) external view returns (string memory uri);

    function supportsInterface(bytes4 interfaceId) external returns (bool);
}
