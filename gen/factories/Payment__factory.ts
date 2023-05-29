/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Payment, PaymentInterface } from "../Payment";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "dao_",
        type: "address",
      },
      {
        internalType: "address",
        name: "asto_",
        type: "address",
      },
      {
        internalType: "address",
        name: "manager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ASTOPaymentFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
    ],
    name: "AccessError",
    type: "error",
  },
  {
    inputs: [],
    name: "ComputeInactive",
    type: "error",
  },
  {
    inputs: [],
    name: "ComputeRequestClosed",
    type: "error",
  },
  {
    inputs: [],
    name: "ComputeRequestRevoked",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "slaTimestamp",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "currentTimestamp",
        type: "uint64",
      },
    ],
    name: "ComputeSLANotReached",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "availableAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestedAmount",
        type: "uint256",
      },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
      {
        internalType: "address",
        name: "expectedCaller",
        type: "address",
      },
      {
        internalType: "address",
        name: "actualCaller",
        type: "address",
      },
    ],
    name: "InvalidCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidComputeIndex",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "InvalidComputeRequest",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
    ],
    name: "InvalidDisbursement",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
    ],
    name: "InvalidInput",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "InvalidRegistryIndex",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "requiredAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "receivedAmount",
        type: "uint256",
      },
    ],
    name: "PaymentError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AccountBalanceCorrected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minimumFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "percentageFee",
        type: "uint24",
      },
    ],
    name: "DaoFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newNodeCreator",
        type: "address",
      },
    ],
    name: "addNodeCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "asto",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "claimAsto",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dao",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "getDaoFee",
    outputs: [
      {
        internalType: "uint256",
        name: "daoFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "managerCorrectBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minimumFee_",
        type: "uint256",
      },
      {
        internalType: "uint24",
        name: "percentageFee_",
        type: "uint24",
      },
    ],
    name: "managerSetDaoFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "managerWithdrawASTO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "percentageFee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oldNodeCreator",
        type: "address",
      },
    ],
    name: "revokeNodeCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newManager",
        type: "address",
      },
    ],
    name: "setManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "stakeAsto",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "unlockedAsto",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b506040516200144338038062001443833981016040819052620000349162000179565b600180546001600160a81b0319166101006001600160a01b038416021790558062000061600033620000ac565b6200008d7faf290d8680820aad922855f39b306097b20e28774d6c1ad35a20325630c3a02c82620000ac565b505060016002556001600160a01b039182166080521660a052620001c3565b620000b88282620000bc565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620000b8576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001183390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b80516001600160a01b03811681146200017457600080fd5b919050565b6000806000606084860312156200018f57600080fd5b6200019a846200015c565b9250620001aa602085016200015c565b9150620001ba604085016200015c565b90509250925092565b60805160a051611245620001fe60003960008181610362015281816104f2015281816108a90152610a630152600061020701526112456000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c8063780a7ff0116100c3578063a50cecf51161007c578063a50cecf5146102fe578063d0ebdbe714610311578063d547741f14610324578063d768fa2514610337578063eae5b6281461034a578063f2e5ca831461035d57600080fd5b8063780a7ff0146102855780638456cb59146102a85780638e833c65146102b057806391d14854146102c3578063a217fddf146102d6578063a3467506146102de57600080fd5b80633f4ba83a116101155780633f4ba83a146101fa5780634162169f146102025780635298fe7f146102415780635c975abb146102545780635eafc1051461025f578063763446e71461027257600080fd5b806301ffc9a71461015d578063091dcbf3146101855780631a7626e71461019a578063248a9ca3146101b15780632f2ff15d146101d457806336568abe146101e7575b600080fd5b61017061016b366004610f10565b610384565b60405190151581526020015b60405180910390f35b610198610193366004610f56565b6103bb565b005b6101a360045481565b60405190815260200161017c565b6101a36101bf366004610f71565b60009081526020819052604090206001015490565b6101986101e2366004610f8a565b610401565b6101986101f5366004610f8a565b61042b565b6101986104aa565b6102297f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161017c565b61019861024f366004610fb6565b6104cd565b60015460ff16610170565b61019861026d366004610fe0565b6105bc565b6101a3610280366004610f71565b61062e565b6005546102949062ffffff1681565b60405162ffffff909116815260200161017c565b61019861066f565b6101986102be366004610f56565b61068f565b6101706102d1366004610f8a565b6106d1565b6101a3600081565b6101a36102ec366004610f56565b60036020526000908152604090205481565b61019861030c366004610fb6565b6106fa565b61019861031f366004610f56565b61076c565b610198610332366004610f8a565b610843565b610198610345366004610f8a565b610868565b610198610358366004610fb6565b610941565b6102297f000000000000000000000000000000000000000000000000000000000000000081565b60006001600160e01b03198216637965db0b60e01b14806103b557506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000805160206111f08339815191526103d381610aff565b6103fd7f21605a3b9eb8ab96c474bd303de29038acfda36384936d0180906287c1d530a283610b09565b5050565b60008281526020819052604090206001015461041c81610aff565b6104268383610b6e565b505050565b6001600160a01b03811633146104a05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6103fd8282610b09565b6000805160206111f08339815191526104c281610aff565b6104ca610bf2565b50565b6040516323b872dd60e01b8152336004820152306024820152604481018290526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd906064016020604051808303816000875af1158015610543573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105679190611018565b90508061058a576040516393a49d2560e01b815260048101839052602401610497565b6001600160a01b038316600090815260036020526040812080548492906105b2908490611050565b9091555050505050565b6000805160206111f08339815191526105d481610aff565b60048390556005805462ffffff191662ffffff84169081179091556040805185815260208101929092527f97e0aa6ff93dbe6fc6aa383a1a4ea24c47b10157c74b0201ba5d1b78db19a343910160405180910390a1505050565b6005546000908190612710906106499062ffffff1685611063565b610653919061107a565b9050600454811161066657600454610668565b805b9392505050565b6000805160206111f083398151915261068781610aff565b6104ca610c44565b6000805160206111f08339815191526106a781610aff565b6103fd7f21605a3b9eb8ab96c474bd303de29038acfda36384936d0180906287c1d530a283610b6e565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6000805160206111f083398151915261071281610aff565b6001600160a01b03831660008181526003602052604090819020849055517f0de7a4d619966e2eaa834281c632b0a439124fbc925c745846603bcfcdd653019061075f9085815260200190565b60405180910390a2505050565b6000805160206111f083398151915261078481610aff565b6001600160a01b0382166107d7576040805180820182526016815275496e76616c69642077616c6c6574206164647265737360501b6020820152905163d647364f60e01b815261049791906004016110ec565b6108026000805160206111f083398151915260018054906101000a90046001600160a01b0316610b09565b61081a6000805160206111f083398151915283610b6e565b50600180546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b60008281526020819052604090206001015461085e81610aff565b6104268383610b09565b6000805160206111f083398151915261088081610aff565b60405163a9059cbb60e01b81526001600160a01b038381166004830152602482018590526000917f00000000000000000000000000000000000000000000000000000000000000009091169063a9059cbb906044016020604051808303816000875af11580156108f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109189190611018565b90508061093b576040516393a49d2560e01b815260048101859052602401610497565b50505050565b60028054036109925760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610497565b6002805561099e610c7f565b33600090815260036020526040902054811115610a1657604080518082018252601a81527f496e73756666696369656e7420756e6c6f636b6564204153544f0000000000006020808301919091523360009081526003909152829020549151636664c8cf60e11b8152610497929084906004016110ff565b3360009081526003602052604081208054839290610a35908490611124565b909155505060405163a9059cbb60e01b81526001600160a01b038381166004830152602482018390526000917f00000000000000000000000000000000000000000000000000000000000000009091169063a9059cbb906044016020604051808303816000875af1158015610aae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad29190611018565b905080610af5576040516393a49d2560e01b815260048101839052602401610497565b5050600160025550565b6104ca8133610cc7565b610b1382826106d1565b156103fd576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b610b7882826106d1565b6103fd576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610bae3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610bfa610d2b565b6001805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b610c4c610c7f565b6001805460ff1916811790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833610c27565b60015460ff1615610cc55760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610497565b565b610cd182826106d1565b6103fd57610ce9816001600160a01b03166014610d74565b610cf4836020610d74565b604051602001610d05929190611137565b60408051601f198184030181529082905262461bcd60e51b8252610497916004016110ec565b60015460ff16610cc55760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610497565b60606000610d83836002611063565b610d8e906002611050565b67ffffffffffffffff811115610da657610da66111ac565b6040519080825280601f01601f191660200182016040528015610dd0576020820181803683370190505b509050600360fc1b81600081518110610deb57610deb6111c2565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610e1a57610e1a6111c2565b60200101906001600160f81b031916908160001a9053506000610e3e846002611063565b610e49906001611050565b90505b6001811115610ec1576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610e7d57610e7d6111c2565b1a60f81b828281518110610e9357610e936111c2565b60200101906001600160f81b031916908160001a90535060049490941c93610eba816111d8565b9050610e4c565b5083156106685760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610497565b600060208284031215610f2257600080fd5b81356001600160e01b03198116811461066857600080fd5b80356001600160a01b0381168114610f5157600080fd5b919050565b600060208284031215610f6857600080fd5b61066882610f3a565b600060208284031215610f8357600080fd5b5035919050565b60008060408385031215610f9d57600080fd5b82359150610fad60208401610f3a565b90509250929050565b60008060408385031215610fc957600080fd5b610fd283610f3a565b946020939093013593505050565b60008060408385031215610ff357600080fd5b82359150602083013562ffffff8116811461100d57600080fd5b809150509250929050565b60006020828403121561102a57600080fd5b8151801515811461066857600080fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156103b5576103b561103a565b80820281158282048414176103b5576103b561103a565b60008261109757634e487b7160e01b600052601260045260246000fd5b500490565b60005b838110156110b757818101518382015260200161109f565b50506000910152565b600081518084526110d881602086016020860161109c565b601f01601f19169290920160200192915050565b60208152600061066860208301846110c0565b60608152600061111260608301866110c0565b60208301949094525060400152919050565b818103818111156103b5576103b561103a565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161116f81601785016020880161109c565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516111a081602884016020880161109c565b01602801949350505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6000816111e7576111e761103a565b50600019019056feaf290d8680820aad922855f39b306097b20e28774d6c1ad35a20325630c3a02ca2646970667358221220f22e6e59fd0e4419a6fb9679003d5db1c139e7490494acf561471b988c1631df64736f6c63430008110033";

export class Payment__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    dao_: string,
    asto_: string,
    manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Payment> {
    return super.deploy(
      dao_,
      asto_,
      manager,
      overrides || {}
    ) as Promise<Payment>;
  }
  getDeployTransaction(
    dao_: string,
    asto_: string,
    manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(dao_, asto_, manager, overrides || {});
  }
  attach(address: string): Payment {
    return super.attach(address) as Payment;
  }
  connect(signer: Signer): Payment__factory {
    return super.connect(signer) as Payment__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PaymentInterface {
    return new utils.Interface(_abi) as PaymentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Payment {
    return new Contract(address, _abi, signerOrProvider) as Payment;
  }
}
