import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./scripts/compute-manager-scripts";
import "./scripts/compute-request-manager-scripts";
import "./scripts/token-scripts";

dotenv.config();

const dPK1 = process.env.DEV_PRIVATE_KEY_1;
const dPK2 = process.env.DEV_PRIVATE_KEY_2;
const dk1 = [...(dPK1 ? [dPK1] : [])];
const dk2 = [...(dPK2 ? [dPK2] : [])];
// devKeys are used for both Dev and Staging environment
// for deployment scripts
const devKeys = [...dk1, ...dk2];

// from anvil node
const localKeys = [
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
  "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
  "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      accounts: localKeys,
    },
    goerli: {
      // faucet: https://goerli-faucet.pk910.de/
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: devKeys,
      timeout: 120000,
      chainId: 5,
    },
    goerliStaging: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: devKeys,
      timeout: 120000,
      chainId: 5,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
      timeout: 240000,
    },
    porcini: {
      url: `https://porcini.rootnet.app`,
      accounts: devKeys,
      timeout: 120000,
      chainId: 7672,
    },
    porciniStaging: {
      url: `https://porcini.rootnet.app`,
      accounts: devKeys,
      timeout: 120000,
      chainId: 7672,
    },
    root: {
      url: `https://root.rootnet.live/`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
      timeout: 120000,
      chainId: 7672,
    },
  },
  namedAccounts: {
    deployer: {
      hardhat: 0, // goerli, first account
      localhost: 0,
      default: 0, // mainnet, first account
      porcini: 0, // mainnet, first account
      porciniStaging: 0, // mainnet, first account
      root: 0, // root mainnet, first account
      1: 0, // mainnet, first account
      goerli: 0, // goerli, first account
      goerliStaging: 0, // goerli, first account
    },
    asto: {
      hardhat: 0, // Will be mocked
      localhost: 0, // Will be mocked
      porcini: process.env.PORCINI_ASTO_ADDRESS ?? 0,
      porciniStaging: process.env.PORCINI_ASTO_TEST_ADDRESS ?? 0, // ASTOTokenTest address (with free mint function)
      root: process.env.ASTO_ADDRESS ?? 0, // ASTOTokenTest address (with free mint function)
      1: process.env.ASTO_ADDRESS ?? 0, // Real ASTO address
      goerli: process.env.GOERLI_ASTO_TEST_CONTRACT_ADDRESS ?? 0,
      goerliStaging: process.env.GOERLI_ASTO_TEST_CONTRACT_ADDRESS ?? 0,
    },
    dao: {
      hardhat: 1,
      localhost: 1,
      porcini: process.env.DEV_ADDRESS_3 ?? 0,
      porciniStaging: process.env.DEV_ADDRESS_3 ?? 0, // TODO change to multisig contract when it's deployed
      root: process.env.DAO_ADDRESS ?? 0,
      1: process.env.MANAGER_ADDRESS ?? 0,
      goerli: process.env.DEV_ADDRESS_3 ?? 0,
      goerliStaging: process.env.GOERLI_GNOSIS_MULTISIG_ADDRESS ?? 0,
    },
    manager: {
      hardhat: 0,
      localhost: 2,
      porcini: process.env.DEV_ADDRESS_1 ?? 0,
      porciniStaging: process.env.DEV_ADDRESS_1 ?? 0,
      root: process.env.MANAGER_ADDRESS ?? 0,
      1: process.env.MANAGER_ADDRESS ?? 0,
      goerli: process.env.DEV_ADDRESS_1 ?? 0,
      goerliStaging: process.env.DEV_ADDRESS_1 ?? 0,
    },
    multisig: {
      hardhat: 0, // Will be mocked
      localhost: 0, // Will be mocked
      porcini: 0, // mainnet, first account
      porciniStaging: 0, // mainnet, first account
      root: 0, // mainnet, first account
      default: process.env.MULTISIG_ADDRESS ?? 0,
      goerli: process.env.GOERLI_MOCKED_MULTISIG_ADDRESS ?? 0,
      goerliStaging: process.env.GOERLI_GNOSIS_MULTISIG_ADDRESS ?? 0,
    },
    signer: {
      hardhat: process.env.DEV_SIGNER_ADDRESS ?? 0,
      localhost: process.env.DEV_SIGNER_ADDRESS ?? 0,
      porcini: 0, // mainnet, first account
      porciniStaging: 0, // mainnet, first account
      root: 0, // mainnet, first account
      default: process.env.SIGNER_WALLET_ADDRESS ?? 0,
      goerli: process.env.DEV_SIGNER_ADDRESS ?? 0,
      goerliStaging: process.env.DEV_SIGNER_ADDRESS ?? 0,
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    currency: "USD",
  },
  typechain: {
    outDir: "gen",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
