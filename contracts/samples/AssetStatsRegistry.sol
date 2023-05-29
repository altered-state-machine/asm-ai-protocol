// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../interfaces/IAssetStatsRegistry.sol";
import "../helpers/Errors.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * ASM Asset Stats Registry.
 */
contract AssetStatsRegistry is IAssetStatsRegistry, Errors, ERC165 {
    uint256 private entryCount;
    mapping(uint256 => RegistryEntry) private registryEntries;
    uint256[] private deletedEntries;

    //
    // Registration
    //

    /**
     * Register a new asset stats address.
     * @param statsAddress The new address to register.
     * @return entryId The index of the stats address in the registry.
     */
    function registerStats(address statsAddress) public virtual returns (uint256 entryId) {
        uint256 deletedLength = deletedEntries.length;

        if (deletedLength > 0) {
            entryId = deletedEntries[deletedLength - 1];
            deletedEntries.pop();
        } else {
            entryId = entryCount;
            ++entryCount;
        }
        registryEntries[entryId] = RegistryEntry(statsAddress, msg.sender);

        emit RegistryEntryAdded(entryId, statsAddress);
        return entryId;
    }

    /**
     * Removes an asset stats address from the registry.
     * @param entryId The index of the stats address to remove.
     */
    function deregisterStats(uint256 entryId) public virtual {
        RegistryEntry storage entry = registryEntries[entryId];
        if (entry.owner != msg.sender) revert InvalidCaller(MUST_BE_CALLED_BY_OWNER, entry.owner, msg.sender);
        emit RegistryEntryRemoved(entryId, entry.statsAddress);
        delete registryEntries[entryId];
        deletedEntries.push(entryId);
    }

    //
    // Views
    //

    /**
     * Return information about the registry entry.
     * @param entryId The index of the registry entry to return.
     * @return entry The registry entry details.
     */
    function getRegistryEntry(uint256 entryId) external view returns (RegistryEntry memory entry) {
        entry = registryEntries[entryId];
        if (entry.statsAddress == address(0)) revert InvalidRegistryIndex(entryId);
        return entry;
    }

    /**
     * Returns if an asset stats registry entry is active.
     * @param entryId The index of the asset stats entry.
     * @return active The active status.
     */
    function isActive(uint256 entryId) public view returns (bool active) {
        return registryEntries[entryId].statsAddress != address(0);
    }

    /**
     * Lists all active asset stats addresses.
     * @return addresses A list of all active asset stats addresses.
     */
    function listActiveStatsAddresses() external view returns (address[] memory addresses) {
        addresses = new address[](entryCount - deletedEntries.length);
        uint256 curr;

        for (uint256 i; i < entryCount; i++) {
            if (isActive(i)) {
                addresses[curr] = registryEntries[i].statsAddress;
                ++curr;
            }
        }
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IAssetStatsRegistry, ERC165)
        returns (bool)
    {
        return interfaceId == type(IAssetStatsRegistry).interfaceId || ERC165.supportsInterface(interfaceId);
    }
}
