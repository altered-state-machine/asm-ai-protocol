/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Studio, StudioInterface } from "../Studio";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "coreProtocol_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "address",
        name: "expectedSigner",
        type: "address",
      },
      {
        internalType: "address",
        name: "actualSigner",
        type: "address",
      },
    ],
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
    ],
    name: "InvalidTrainingDisbursement",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTrainingIndex",
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
    name: "InvalidTrainingRequest",
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
    inputs: [],
    name: "TrainingInactive",
    type: "error",
  },
  {
    inputs: [],
    name: "TrainingRequestClosed",
    type: "error",
  },
  {
    inputs: [],
    name: "TrainingRequestRevoked",
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
    name: "TrainingSLANotReached",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "unitCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unitMinutes",
        type: "uint256",
      },
    ],
    name: "addTrainingOption",
    outputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
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
    inputs: [],
    name: "coreProtocol",
    outputs: [
      {
        internalType: "contract ICoreProtocol",
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
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "getTrainingOptionDisbursement",
    outputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "units",
        type: "uint64",
      },
    ],
    name: "getTrainingOptionSLA",
    outputs: [
      {
        internalType: "uint64",
        name: "maxTime",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "units",
        type: "uint64",
      },
    ],
    name: "getTrainingOptionUnitCost",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
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
    inputs: [],
    name: "totalTrainingOptions",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "trainingOptions",
    outputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "unitCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unitSeconds",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "unitCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unitMinutes",
        type: "uint256",
      },
    ],
    name: "updateTrainingOption",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610b6f380380610b6f83398101604081905261002f91610099565b61003833610049565b6001600160a01b03166080526100c9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100ab57600080fd5b81516001600160a01b03811681146100c257600080fd5b9392505050565b608051610a7d6100f260003960008181610193015281816104d601526106060152610a7d6000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636415dbde1161008c5780638da5cb5b116100665780638da5cb5b14610210578063ddd985bb14610221578063eae5b62814610272578063f2fde38b1461028557600080fd5b80636415dbde146101e2578063715018a6146101f557806376dfb4a2146101fd57600080fd5b806319dfb9fb116100c857806319dfb9fb1461014f57806330fcb1a1146101625780633c9c223c1461018e5780634e1ef6a2146101cd57600080fd5b806301ffc9a7146100ef57806308db623a1461011757806314d9d61b14610138575b600080fd5b6101026100fd36600461078b565b610298565b60405190151581526020015b60405180910390f35b61012a6101253660046107bc565b6102cf565b60405161010e9291906107de565b61014160025481565b60405190815260200161010e565b61014161015d3660046107bc565b610392565b61017561017036600461087f565b610410565b60405167ffffffffffffffff909116815260200161010e565b6101b57f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161010e565b6101e06101db3660046108bb565b610465565b005b6101e06101f03660046108fd565b6104b8565b6101e061053e565b61014161020b366004610916565b610552565b6000546001600160a01b03166101b5565b61025561022f3660046108fd565b600160208190526000918252604090912080549181015460029091015460ff9092169183565b60408051931515845260208401929092529082015260600161010e565b6101e0610280366004610959565b6105d8565b6101e0610293366004610983565b610666565b60006001600160e01b03198216632783d74f60e11b14806102c957506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060808360025481106102f557604051638c37400560e01b815260040160405180910390fd5b60408051600180825281830190925290602080830190803683375050600054919450506001600160a01b0316836000815181106103345761033461099e565b6001600160a01b0392909216602092830291909101820152604080516001808252818301909252918281019080368337019050509150838260008151811061037e5761037e61099e565b602002602001018181525050509250929050565b600061039c6106e1565b6040805160608101825260018152602081018590529081016103bf84603c6109ca565b90526002805460009081526001602081815260408084208651815460ff1916901515178155918601519282019290925593015192820192909255805491610405836109e1565b909155509392505050565b600083600254811061043557604051638c37400560e01b815260040160405180910390fd5b6000858152600160205260409020600201546104529084906109fa565b61045c9085610a26565b95945050505050565b61046d6106e1565b6040805160608101825293151584526020808501938452848201928352600095865260019081905294209251835460ff19169015151783559051928201929092559051600290910155565b6104c06106e1565b60405163320aedef60e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636415dbde90602401600060405180830381600087803b15801561052257600080fd5b505af1158015610536573d6000803e3d6000fd5b505050505b50565b6105466106e1565b610550600061073b565b565b600082600254811061057757604051638c37400560e01b815260040160405180910390fd5b60008481526001602052604090205460ff166105a65760405163bf723de160e01b815260040160405180910390fd5b600084815260016020819052604090912001546105ce9067ffffffffffffffff8516906109ca565b91505b5092915050565b6105e06106e1565b604051631d5cb6c560e31b81526001600160a01b038381166004830152602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063eae5b62890604401600060405180830381600087803b15801561064a57600080fd5b505af115801561065e573d6000803e3d6000fd5b505050505050565b61066e6106e1565b6001600160a01b0381166106d85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61053b8161073b565b6000546001600160a01b031633146105505760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106cf565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561079d57600080fd5b81356001600160e01b0319811681146107b557600080fd5b9392505050565b600080604083850312156107cf57600080fd5b50508035926020909101359150565b604080825283519082018190526000906020906060840190828701845b828110156108205781516001600160a01b0316845292840192908401906001016107fb565b5050508381038285015284518082528583019183019060005b8181101561085557835183529284019291840191600101610839565b5090979650505050505050565b803567ffffffffffffffff8116811461087a57600080fd5b919050565b60008060006060848603121561089457600080fd5b833592506108a460208501610862565b91506108b260408501610862565b90509250925092565b600080600080608085870312156108d157600080fd5b84359350602085013580151581146108e857600080fd5b93969395505050506040820135916060013590565b60006020828403121561090f57600080fd5b5035919050565b6000806040838503121561092957600080fd5b8235915061093960208401610862565b90509250929050565b80356001600160a01b038116811461087a57600080fd5b6000806040838503121561096c57600080fd5b61097583610942565b946020939093013593505050565b60006020828403121561099557600080fd5b6107b582610942565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176102c9576102c96109b4565b6000600182016109f3576109f36109b4565b5060010190565b67ffffffffffffffff818116838216028082169190828114610a1e57610a1e6109b4565b505092915050565b67ffffffffffffffff8181168382160190808211156105d1576105d16109b456fea26469706673582212209f3118da81a6774d4df16de212b5821f9d2ece4e4e21670f15d9a127bc538bdb64736f6c63430008110033";

export class Studio__factory extends ContractFactory {
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
    coreProtocol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Studio> {
    return super.deploy(coreProtocol_, overrides || {}) as Promise<Studio>;
  }
  getDeployTransaction(
    coreProtocol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(coreProtocol_, overrides || {});
  }
  attach(address: string): Studio {
    return super.attach(address) as Studio;
  }
  connect(signer: Signer): Studio__factory {
    return super.connect(signer) as Studio__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StudioInterface {
    return new utils.Interface(_abi) as StudioInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Studio {
    return new Contract(address, _abi, signerOrProvider) as Studio;
  }
}
