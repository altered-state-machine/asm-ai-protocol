/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ASTOTokenTest, ASTOTokenTestInterface } from "../ASTOTokenTest";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    ],
    name: "mint",
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
        name: "to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    name: "symbol",
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
    name: "totalSupply",
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
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
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
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040518060400160405280600981526020016854657374204153544f60b81b81525060405180604001604052806008815260200167544553544153544f60c01b81525081600390816100639190610117565b5060046100708282610117565b5050506101d6565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100a257607f821691505b6020821081036100c257634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561011257600081815260208120601f850160051c810160208610156100ef5750805b601f850160051c820191505b8181101561010e578281556001016100fb565b5050505b505050565b81516001600160401b0381111561013057610130610078565b6101448161013e845461008e565b846100c8565b602080601f83116001811461017957600084156101615750858301515b600019600386901b1c1916600185901b17855561010e565b600085815260208120601f198616915b828110156101a857888601518255948401946001909101908401610189565b50858210156101c65787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610a0080620001e66000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c578063a457c2d711610066578063a457c2d7146101a2578063a9059cbb146101b5578063b723b34e146101c8578063dd62ed3e146101db57600080fd5b806370a082311461015c57806395d89b4114610185578063a0712d681461018d57600080fd5b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461011557806323b872dd14610127578063313ce5671461013a5780633950935114610149575b600080fd5b6100dc6101ee565b6040516100e9919061080e565b60405180910390f35b610105610100366004610878565b610280565b60405190151581526020016100e9565b6002545b6040519081526020016100e9565b6101056101353660046108a2565b61029a565b604051601281526020016100e9565b610105610157366004610878565b6102be565b61011961016a3660046108de565b6001600160a01b031660009081526020819052604090205490565b6100dc6102e0565b6101a061019b366004610900565b6102ef565b005b6101056101b0366004610878565b6102fc565b6101056101c3366004610878565b61037c565b6101a06101d6366004610919565b61038a565b6101196101e9366004610945565b610398565b6060600380546101fd9061096f565b80601f01602080910402602001604051908101604052809291908181526020018280546102299061096f565b80156102765780601f1061024b57610100808354040283529160200191610276565b820191906000526020600020905b81548152906001019060200180831161025957829003601f168201915b5050505050905090565b60003361028e8185856103c3565b60019150505b92915050565b6000336102a88582856104e7565b6102b3858585610561565b506001949350505050565b60003361028e8185856102d18383610398565b6102db91906109a9565b6103c3565b6060600480546101fd9061096f565b6102f9338261072f565b50565b6000338161030a8286610398565b90508381101561036f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102b382868684036103c3565b60003361028e818585610561565b610394818361072f565b5050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166104255760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610366565b6001600160a01b0382166104865760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610366565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006104f38484610398565b9050600019811461055b578181101561054e5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610366565b61055b84848484036103c3565b50505050565b6001600160a01b0383166105c55760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610366565b6001600160a01b0382166106275760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610366565b6001600160a01b0383166000908152602081905260409020548181101561069f5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610366565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106d69084906109a9565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161072291815260200190565b60405180910390a361055b565b6001600160a01b0382166107855760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610366565b806002600082825461079791906109a9565b90915550506001600160a01b038216600090815260208190526040812080548392906107c49084906109a9565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600060208083528351808285015260005b8181101561083b5785810183015185820160400152820161081f565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461087357600080fd5b919050565b6000806040838503121561088b57600080fd5b6108948361085c565b946020939093013593505050565b6000806000606084860312156108b757600080fd5b6108c08461085c565b92506108ce6020850161085c565b9150604084013590509250925092565b6000602082840312156108f057600080fd5b6108f98261085c565b9392505050565b60006020828403121561091257600080fd5b5035919050565b6000806040838503121561092c57600080fd5b8235915061093c6020840161085c565b90509250929050565b6000806040838503121561095857600080fd5b6109618361085c565b915061093c6020840161085c565b600181811c9082168061098357607f821691505b6020821081036109a357634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561029457634e487b7160e01b600052601160045260246000fdfea26469706673582212202a43cf953d3f31a447d311d87d41511d85ca9c5b906164ef65037186f097b71f64736f6c63430008110033";

export class ASTOTokenTest__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ASTOTokenTest> {
    return super.deploy(overrides || {}) as Promise<ASTOTokenTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ASTOTokenTest {
    return super.attach(address) as ASTOTokenTest;
  }
  connect(signer: Signer): ASTOTokenTest__factory {
    return super.connect(signer) as ASTOTokenTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ASTOTokenTestInterface {
    return new utils.Interface(_abi) as ASTOTokenTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ASTOTokenTest {
    return new Contract(address, _abi, signerOrProvider) as ASTOTokenTest;
  }
}
