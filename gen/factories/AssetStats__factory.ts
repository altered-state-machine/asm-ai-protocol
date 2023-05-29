/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AssetStats, AssetStatsInterface } from "../AssetStats";

const _abi = [
  {
    inputs: [
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
        name: "assetAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    name: "setAddressBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    name: "setAddressTokenIdBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    name: "setBaseURI",
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
        name: "assetAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
  "0x60806040523480156200001157600080fd5b506040516200152e3803806200152e833981016040819052620000349162000145565b600180546001600160a81b0319166101006001600160a01b03841602179055806200006160003362000095565b6200008d7faf290d8680820aad922855f39b306097b20e28774d6c1ad35a20325630c3a02c8262000095565b505062000177565b620000a18282620000a5565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620000a1576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001013390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000602082840312156200015857600080fd5b81516001600160a01b03811681146200017057600080fd5b9392505050565b6113a780620001876000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80638456cb59116100a2578063c52b76fe11610071578063c52b76fe14610200578063d0ebdbe714610213578063d547741f14610226578063e312ef3414610239578063e9dc63751461024c57600080fd5b80638456cb59146101ca5780638e833c65146101d257806391d14854146101e5578063a217fddf146101f857600080fd5b806336568abe116100de57806336568abe146101915780633f4ba83a146101a457806355f804b3146101ac5780635c975abb146101bf57600080fd5b806301ffc9a714610110578063091dcbf314610138578063248a9ca31461014d5780632f2ff15d1461017e575b600080fd5b61012361011e366004610d76565b61026c565b60405190151581526020015b60405180910390f35b61014b610146366004610dbc565b6102b2565b005b61017061015b366004610dd7565b60009081526020819052604090206001015490565b60405190815260200161012f565b61014b61018c366004610df0565b6102f8565b61014b61019f366004610df0565b610322565b61014b6103a1565b61014b6101ba366004610e65565b6103c4565b60015460ff16610123565b61014b6103ef565b61014b6101e0366004610dbc565b61040f565b6101236101f3366004610df0565b610451565b610170600081565b61014b61020e366004610ea7565b61047a565b61014b610221366004610dbc565b6104c8565b61014b610234366004610df0565b61059f565b61014b610247366004610f01565b6105c4565b61025f61025a366004610f54565b610606565b60405161012f9190610fa2565b60006001600160e01b03198216637411d56960e11b1480610291575061029182610812565b806102ac57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000805160206113528339815191526102ca81610847565b6102f47f21605a3b9eb8ab96c474bd303de29038acfda36384936d0180906287c1d530a283610851565b5050565b60008281526020819052604090206001015461031381610847565b61031d83836108b6565b505050565b6001600160a01b03811633146103975760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6102f48282610851565b6000805160206113528339815191526103b981610847565b6103c161093a565b50565b6000805160206113528339815191526103dc81610847565b60026103e983858361106b565b50505050565b60008051602061135283398151915261040781610847565b6103c161098c565b60008051602061135283398151915261042781610847565b6102f47f21605a3b9eb8ab96c474bd303de29038acfda36384936d0180906287c1d530a2836108b6565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60008051602061135283398151915261049281610847565b6001600160a01b038516600090815260046020908152604080832087845290915290206104c083858361106b565b505050505050565b6000805160206113528339815191526104e081610847565b6001600160a01b038216610533576040805180820182526016815275496e76616c69642077616c6c6574206164647265737360501b6020820152905163d647364f60e01b815261038e9190600401610fa2565b61055e60008051602061135283398151915260018054906101000a90046001600160a01b0316610851565b610576600080516020611352833981519152836108b6565b50600180546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b6000828152602081905260409020600101546105ba81610847565b61031d8383610851565b6000805160206113528339815191526105dc81610847565b6001600160a01b03841660009081526003602052604090206105ff83858361106b565b5050505050565b6001600160a01b038216600090815260046020908152604080832084845290915281208054606092919061063990610feb565b80601f016020809104026020016040519081016040528092919081815260200182805461066590610feb565b80156106b25780601f10610687576101008083540402835291602001916106b2565b820191906000526020600020905b81548152906001019060200180831161069557829003601f168201915b505050505090506000815111156106ca5790506102ac565b6001600160a01b038416600090815260036020526040902080546106ed90610feb565b80601f016020809104026020016040519081016040528092919081815260200182805461071990610feb565b80156107665780601f1061073b57610100808354040283529160200191610766565b820191906000526020600020905b81548152906001019060200180831161074957829003601f168201915b505050505090506000815111156107a95780610781846109c7565b60405160200161079292919061112b565b6040516020818303038152906040529150506102ac565b6000600280546107b890610feb565b9050116107d4576040518060200160405280600081525061080a565b60026107df85610ac8565b6107e8856109c7565b6040516020016107fa9392919061115a565b6040516020818303038152906040525b949350505050565b60006001600160e01b03198216637965db0b60e01b14806102ac57506301ffc9a760e01b6001600160e01b03198316146102ac565b6103c18133610ade565b61085b8282610451565b156102f4576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6108c08282610451565b6102f4576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556108f63390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610942610b42565b6001805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b610994610b8d565b6001805460ff1916811790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2583361096f565b6060816000036109ee5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610a185780610a028161121b565b9150610a119050600a8361124a565b91506109f2565b60008167ffffffffffffffff811115610a3357610a33610fd5565b6040519080825280601f01601f191660200182016040528015610a5d576020820181803683370190505b5090505b841561080a57610a7260018361125e565b9150610a7f600a86611271565b610a8a906030611285565b60f81b818381518110610a9f57610a9f611298565b60200101906001600160f81b031916908160001a905350610ac1600a8661124a565b9450610a61565b60606102ac6001600160a01b0383166014610bd3565b610ae88282610451565b6102f457610b00816001600160a01b03166014610bd3565b610b0b836020610bd3565b604051602001610b1c9291906112ae565b60408051601f198184030181529082905262461bcd60e51b825261038e91600401610fa2565b60015460ff16610b8b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161038e565b565b60015460ff1615610b8b5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161038e565b60606000610be2836002611323565b610bed906002611285565b67ffffffffffffffff811115610c0557610c05610fd5565b6040519080825280601f01601f191660200182016040528015610c2f576020820181803683370190505b509050600360fc1b81600081518110610c4a57610c4a611298565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610c7957610c79611298565b60200101906001600160f81b031916908160001a9053506000610c9d846002611323565b610ca8906001611285565b90505b6001811115610d20576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610cdc57610cdc611298565b1a60f81b828281518110610cf257610cf2611298565b60200101906001600160f81b031916908160001a90535060049490941c93610d198161133a565b9050610cab565b508315610d6f5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161038e565b9392505050565b600060208284031215610d8857600080fd5b81356001600160e01b031981168114610d6f57600080fd5b80356001600160a01b0381168114610db757600080fd5b919050565b600060208284031215610dce57600080fd5b610d6f82610da0565b600060208284031215610de957600080fd5b5035919050565b60008060408385031215610e0357600080fd5b82359150610e1360208401610da0565b90509250929050565b60008083601f840112610e2e57600080fd5b50813567ffffffffffffffff811115610e4657600080fd5b602083019150836020828501011115610e5e57600080fd5b9250929050565b60008060208385031215610e7857600080fd5b823567ffffffffffffffff811115610e8f57600080fd5b610e9b85828601610e1c565b90969095509350505050565b60008060008060608587031215610ebd57600080fd5b610ec685610da0565b935060208501359250604085013567ffffffffffffffff811115610ee957600080fd5b610ef587828801610e1c565b95989497509550505050565b600080600060408486031215610f1657600080fd5b610f1f84610da0565b9250602084013567ffffffffffffffff811115610f3b57600080fd5b610f4786828701610e1c565b9497909650939450505050565b60008060408385031215610f6757600080fd5b610f7083610da0565b946020939093013593505050565b60005b83811015610f99578181015183820152602001610f81565b50506000910152565b6020815260008251806020840152610fc1816040850160208701610f7e565b601f01601f19169190910160400192915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610fff57607f821691505b60208210810361101f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561031d57600081815260208120601f850160051c8101602086101561104c5750805b601f850160051c820191505b818110156104c057828155600101611058565b67ffffffffffffffff83111561108357611083610fd5565b611097836110918354610feb565b83611025565b6000601f8411600181146110cb57600085156110b35750838201355b600019600387901b1c1916600186901b1783556105ff565b600083815260209020601f19861690835b828110156110fc57868501358255602094850194600190920191016110dc565b50868210156111195760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6000835161113d818460208801610f7e565b835190830190611151818360208801610f7e565b01949350505050565b600080855461116881610feb565b600182811680156111805760018114611195576111c4565b60ff19841687528215158302870194506111c4565b8960005260208060002060005b858110156111bb5781548a8201529084019082016111a2565b50505082870194505b50875192506111d7838560208b01610f7e565b602f60f81b939092019283528551916111f68382860160208a01610f7e565b91909201019695505050505050565b634e487b7160e01b600052601160045260246000fd5b60006001820161122d5761122d611205565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261125957611259611234565b500490565b818103818111156102ac576102ac611205565b60008261128057611280611234565b500690565b808201808211156102ac576102ac611205565b634e487b7160e01b600052603260045260246000fd5b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516112e6816017850160208801610f7e565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611317816028840160208801610f7e565b01602801949350505050565b80820281158282048414176102ac576102ac611205565b60008161134957611349611205565b50600019019056feaf290d8680820aad922855f39b306097b20e28774d6c1ad35a20325630c3a02ca2646970667358221220f3c77b4f2b88d8e476bcd50f38f650aedd359286cf9bb81b83383b356e98ad4a64736f6c63430008110033";

export class AssetStats__factory extends ContractFactory {
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
    manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AssetStats> {
    return super.deploy(manager, overrides || {}) as Promise<AssetStats>;
  }
  getDeployTransaction(
    manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(manager, overrides || {});
  }
  attach(address: string): AssetStats {
    return super.attach(address) as AssetStats;
  }
  connect(signer: Signer): AssetStats__factory {
    return super.connect(signer) as AssetStats__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssetStatsInterface {
    return new utils.Interface(_abi) as AssetStatsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssetStats {
    return new Contract(address, _abi, signerOrProvider) as AssetStats;
  }
}
