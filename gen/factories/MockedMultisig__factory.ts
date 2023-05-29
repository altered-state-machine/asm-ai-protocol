/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockedMultisig,
  MockedMultisigInterface,
} from "../MockedMultisig";

const _abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
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
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "EthReceived",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604052610276806100136000396000f3fe60806040526004361061002a5760003560e01c806312065fe01461006d5780631cff79cd1461008d57005b3661006b576040805134815243602082015233917f217c08711b46e0b51f406ee1bf927ab14a2816c116bbac3bfba8ae8cee825b49910160405180910390a2005b005b34801561007957600080fd5b504760405190815260200160405180910390f35b34801561009957600080fd5b5061006b6100a8366004610141565b600080836001600160a01b0316836040516100c39190610211565b6000604051808303816000865af19150503d8060008114610100576040519150601f19603f3d011682016040523d82523d6000602084013e610105565b606091505b50915091508161012557805160000361011d57600080fd5b805181602001fd5b50505050565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561015457600080fd5b82356001600160a01b038116811461016b57600080fd5b9150602083013567ffffffffffffffff8082111561018857600080fd5b818501915085601f83011261019c57600080fd5b8135818111156101ae576101ae61012b565b604051601f8201601f19908116603f011681019083821181831017156101d6576101d661012b565b816040528281528860208487010111156101ef57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000825160005b818110156102325760208186018101518583015201610218565b50600092019182525091905056fea264697066735822122067cb364990b4d88e11e57800314e688ba12c51d5e291afa54331638367825cd464736f6c63430008110033";

export class MockedMultisig__factory extends ContractFactory {
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
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<MockedMultisig> {
    return super.deploy(overrides || {}) as Promise<MockedMultisig>;
  }
  getDeployTransaction(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockedMultisig {
    return super.attach(address) as MockedMultisig;
  }
  connect(signer: Signer): MockedMultisig__factory {
    return super.connect(signer) as MockedMultisig__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockedMultisigInterface {
    return new utils.Interface(_abi) as MockedMultisigInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockedMultisig {
    return new Contract(address, _abi, signerOrProvider) as MockedMultisig;
  }
}