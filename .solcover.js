module.exports = {
  // skip forge covered contracts
  skipFiles: [
    "helpers/PermissionControl.sol",
    "helpers/TimeConstants.sol",
    "helpers/Util.sol",
    "mocks/MockedERC20.sol",
    "mocks/MockedMultisig.sol",
  ],
};
