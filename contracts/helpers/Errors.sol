// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

/**
 * @dev ASM Protocol - Errors
 */
contract Errors {
    error InvalidInput(string errMsg);
    string constant INVALID_MULTISIG = "Invalid Multisig contract";
    string constant INVALID_MANAGER = "Invalid Manager contract";
    string constant INVALID_ADDRESS = "Invalid wallet address";
    string constant INVALID_AMOUNT = "Invalid amount";

    error AccessError(string errMsg);
    string internal constant WRONG_TOKEN_ID = "Wrong token ID";
    string internal constant WRONG_TOKEN_OWNER = "Wrong token owner";
    string internal constant WRONG_HASH = "Wrong hash";
    string internal constant NOT_ASSIGNED = "Address not assigned";

    error PaymentError(string errMsg, uint256 requiredAmount, uint256 receivedAmount);
    string internal constant INSUFFICIENT_BALANCE = "Insufficient balance";
    string internal constant NO_PAYMENT_RECEIVED = "No payment received";
    string internal constant NO_PAYMENT_RECOGNIZED = "MintType/Currency not recognized";
    string internal constant CURRENCY_DOES_NOT_SUIT_TYPE = "Currency doesn't suit type";
    string internal constant MINT_TYPE_IS_NOT_SUPPORTED = "MintType isn't supported";

    error InvalidCaller(string errMsg, address expectedCaller, address actualCaller);
    string internal constant MUST_BE_CALLED_BY_COMPUTE_CUSTODIAN = "Must be called by custodian";
    string internal constant MUST_BE_CALLED_BY_OWNER = "Must be called by owner";
    string internal constant MUST_BE_CALLED_BY_REQUESTER = "Must be called by requester";
    string internal constant MUST_BE_CALLED_BY_DAO = "Must be called by DAO";
    string internal constant WRONG_REQUESTER = "Wrong requester address";

    error ASTOPaymentFailed(uint256 amount);

    // Compute Manager

    error InvalidComputeIndex();
    error ComputeInactive();

    // Compute Request Manager

    error InvalidComputeRequest(string errMsg, uint256 value);
    string internal constant INVALID_COMPUTE_UNITS = "Invalid compute units";

    error ComputeRequestClosed();
    error ComputeRequestRevoked();

    error ComputeSLANotReached(uint64 slaTimestamp, uint64 currentTimestamp);

    error InvalidDisbursement(string errMsg);
    string internal constant INVALID_ARRAY_LENGTHS = "Invalid array lengths";
    string internal constant INVALID_TOTAL_AMOUNT = "Invalid total amount";

    error InsufficientBalance(string errMsg, uint256 availableAmount, uint256 requestedAmount);
    string internal constant INSUFFICIENT_UNLOCKED_ASTO = "Insufficient unlocked ASTO";
    string internal constant INSUFFICIENT_COMPUTE_CUSTODIAN_ASTO = "Insufficient Compute Manager ASTO";

    // Memory Tree

    error InvalidSignature();

    // Asset Stats Registry

    error InvalidRegistryIndex(uint256 index);
}
