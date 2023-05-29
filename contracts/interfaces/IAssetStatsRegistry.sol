// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IAssetStatsRegistry {
    struct RegistryEntry {
        address statsAddress;
        address owner;
    }

    event RegistryEntryAdded(uint256 index, address statsAddress);

    event RegistryEntryRemoved(uint256 index, address statsAddress);

    /**
     * Register a new asset stats address.
     * @param statsAddress The new address to register.
     * @return entryId The index of the stats address in the registry.
     */
    function registerStats(address statsAddress) external returns (uint256 entryId);

    /**
     * Removes an asset stats address from the registry.
     * @param entryId The index of the stats address to remove.
     */
    function deregisterStats(uint256 entryId) external;

    /**
     * Return information about the registry entry.
     * @param entryId The index of the registry entry to return.
     * @return entry The registry entry details.
     */
    function getRegistryEntry(uint256 entryId) external view returns (RegistryEntry memory entry);

    /**
     * Returns if an asset stats registry entry is active.
     * @param entryId The index of the asset stats entry.
     * @return active The active status.
     */
    function isActive(uint256 entryId) external view returns (bool active);

    /**
     * Lists all active asset stats addresses.
     * @return addresses A list of all active asset stats addresses.
     */
    function listActiveStatsAddresses() external view returns (address[] memory addresses);

    function supportsInterface(bytes4 interfaceId) external returns (bool);
}
