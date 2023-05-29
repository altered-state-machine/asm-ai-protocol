// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./ComputeManagerSimple.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * ComputeManagerVerified.
 * @notice This is a sample implementation that allows completion by anyone with a signed request.
 * @notice The caller of the completeCompute function is paid 50% of the compute fee.
 * @notice This can be used to support decentralised compute.
 */
contract ComputeManagerVerified is ComputeManagerSimple {
    using ECDSA for bytes32;

    event SignerUpdated(address signer);

    address public signer;
    address private _lastCompleter;

    constructor(address computeRequestManager_, address signer_) ComputeManagerSimple(computeRequestManager_) {
        setSigner(signer_);
    }

    /**
     * Checks if the signature matches data signed by the signer.
     * @param data The data to sign.
     * @param signature The expected signed data.
     * @dev Reverts if the signature is invalid.
     */
    modifier signed(bytes memory data, bytes memory signature) {
        address dataSigner = keccak256(data).toEthSignedMessageHash().recover(signature);
        if (dataSigner != signer) revert InvalidSignature();
        _;
    }

    /**
     * Complete a compute request.
     * @param computeId The compute id to update.
     * @param signature The compute id and sender signed by the signer.
     */
    function completeCompute(uint256 computeId, bytes calldata signature)
        external
        signed(abi.encodePacked(computeId, msg.sender), signature)
    {
        _lastCompleter = msg.sender;
        computeRequestManager.completeCompute(computeId);
        delete _lastCompleter;
    }

    /**
     * Get the disbursement information for given compute option.
     * @param index The given compute option index.
     * @param amount The amount of ASTO to be distributed.
     * @return addresses The addresses to distribute to.
     * @return amounts The amount to distribute to each address.
     * @dev The total amounts must be less or equal to the input amount.
     * @dev This function must return even when a compute option is no longer valid.
     * @notice 50% of the amount will be paid to the completer and 50% to the contract owner.
     */
    function getComputeOptionDisbursement(uint256 index, uint256 amount)
        public
        view
        override
        validComputeIndex(index)
        returns (address[] memory addresses, uint256[] memory amounts)
    {
        if (_lastCompleter == address(0)) {
            // Last completer not set. Give all to the owner
            return ComputeManagerSimple.getComputeOptionDisbursement(index, amount);
        }
        addresses = new address[](2);
        addresses[0] = owner();
        addresses[1] = _lastCompleter;
        amounts = new uint256[](2);
        uint256 half = amount / 2;
        amounts[0] = half;
        amounts[1] = amount - half; // Avoid rounding errors
        return (addresses, amounts);
    }

    //
    // Administration
    //

    /**
     * Update the signer.
     * @param signer_ The new signer.
     */
    function setSigner(address signer_) public onlyOwner {
        signer = signer_;
        emit SignerUpdated(signer);
    }
}
