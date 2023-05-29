/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICoreProtocol, ICoreProtocolInterface } from "../ICoreProtocol";

const _abi = [
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
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "studio",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "trainingId",
        type: "uint256",
      },
    ],
    name: "TrainingCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "studio",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "trainingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "trainingUnits",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "trainingHash",
        type: "bytes32",
      },
    ],
    name: "TrainingRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "studio",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "trainingId",
        type: "uint256",
      },
    ],
    name: "TrainingRevoked",
    type: "event",
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
    inputs: [
      {
        internalType: "uint256",
        name: "trainingId",
        type: "uint256",
      },
    ],
    name: "completeTraining",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "studio",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "optionId",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "units",
        type: "uint64",
      },
      {
        internalType: "bytes32",
        name: "trainingHash",
        type: "bytes32",
      },
    ],
    name: "requestTraining",
    outputs: [
      {
        internalType: "uint256",
        name: "trainingId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "trainingId",
        type: "uint256",
      },
    ],
    name: "revokeTraining",
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
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ICoreProtocol__factory {
  static readonly abi = _abi;
  static createInterface(): ICoreProtocolInterface {
    return new utils.Interface(_abi) as ICoreProtocolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICoreProtocol {
    return new Contract(address, _abi, signerOrProvider) as ICoreProtocol;
  }
}