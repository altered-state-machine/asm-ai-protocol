// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./AssetStatsRegistry.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error ASTOPaymentFailed(uint256 amount);

/**
 * ASM Asset Stats Registry.
 * @notice This is a implementation where registering requires payment.
 */
contract AssetStatsRegistryPaid is AssetStatsRegistry, Ownable {
    address public dao;
    IERC20 public immutable asto;
    uint256 public registrationFee;

    constructor(
        address dao_,
        address asto_,
        uint256 registrationFee_
    ) {
        dao = dao_;
        asto = IERC20(asto_);
        registrationFee = registrationFee_;
    }

    //
    // Registration
    //

    /**
     * Register a new asset stats address.
     * @param statsAddress The new address to register.
     * @return entryId The index of the stats address in the registry.
     * @notice Takes payment in ASTO from the sender.
     */
    function registerStats(address statsAddress) public override returns (uint256 entryId) {
        bool success = asto.transferFrom(msg.sender, dao, registrationFee);
        if (!success) revert ASTOPaymentFailed(registrationFee);
        return AssetStatsRegistry.registerStats(statsAddress);
    }

    //
    // Admin
    //

    function setDao(address dao_) external onlyOwner {
        dao = dao_;
    }

    function setRegistrationFee(uint256 registrationFee_) external onlyOwner {
        registrationFee = registrationFee_;
    }
}
