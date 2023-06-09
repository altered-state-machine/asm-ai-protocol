/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IComputeRequestManagerInterface extends ethers.utils.Interface {
  functions: {
    "claimAsto(address,uint256)": FunctionFragment;
    "completeCompute(uint256)": FunctionFragment;
    "requestCompute(address,uint256,uint64,bytes32)": FunctionFragment;
    "revokeCompute(uint256)": FunctionFragment;
    "stakeAsto(address,uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "claimAsto",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "completeCompute",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requestCompute",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeCompute",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeAsto",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "claimAsto", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "completeCompute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestCompute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeCompute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakeAsto", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "AccountBalanceCorrected(address,uint256)": EventFragment;
    "ComputeCompleted(address,address,uint256)": EventFragment;
    "ComputeRequested(address,address,uint256,uint256,uint256,bytes32)": EventFragment;
    "ComputeRevoked(address,address,uint256)": EventFragment;
    "DaoFeeUpdated(uint256,uint24)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccountBalanceCorrected"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComputeCompleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComputeRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComputeRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DaoFeeUpdated"): EventFragment;
}

export type AccountBalanceCorrectedEvent = TypedEvent<
  [string, BigNumber] & { account: string; amount: BigNumber }
>;

export type ComputeCompletedEvent = TypedEvent<
  [string, string, BigNumber] & {
    requester: string;
    computeManager: string;
    computeId: BigNumber;
  }
>;

export type ComputeRequestedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, string] & {
    requester: string;
    computeManager: string;
    optionId: BigNumber;
    computeId: BigNumber;
    computeUnits: BigNumber;
    computeHash: string;
  }
>;

export type ComputeRevokedEvent = TypedEvent<
  [string, string, BigNumber] & {
    requester: string;
    computeManager: string;
    computeId: BigNumber;
  }
>;

export type DaoFeeUpdatedEvent = TypedEvent<
  [BigNumber, number] & { minimumFee: BigNumber; percentageFee: number }
>;

export class IComputeRequestManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IComputeRequestManagerInterface;

  functions: {
    claimAsto(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    completeCompute(
      computeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestCompute(
      computeManager: string,
      optionId: BigNumberish,
      units: BigNumberish,
      computeHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeCompute(
      computeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakeAsto(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  claimAsto(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  completeCompute(
    computeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestCompute(
    computeManager: string,
    optionId: BigNumberish,
    units: BigNumberish,
    computeHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeCompute(
    computeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakeAsto(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimAsto(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    completeCompute(
      computeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    requestCompute(
      computeManager: string,
      optionId: BigNumberish,
      units: BigNumberish,
      computeHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revokeCompute(
      computeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeAsto(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "AccountBalanceCorrected(address,uint256)"(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    AccountBalanceCorrected(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    "ComputeCompleted(address,address,uint256)"(
      requester?: string | null,
      computeManager?: string | null,
      computeId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { requester: string; computeManager: string; computeId: BigNumber }
    >;

    ComputeCompleted(
      requester?: string | null,
      computeManager?: string | null,
      computeId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { requester: string; computeManager: string; computeId: BigNumber }
    >;

    "ComputeRequested(address,address,uint256,uint256,uint256,bytes32)"(
      requester?: string | null,
      computeManager?: string | null,
      optionId?: null,
      computeId?: null,
      computeUnits?: null,
      computeHash?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber, string],
      {
        requester: string;
        computeManager: string;
        optionId: BigNumber;
        computeId: BigNumber;
        computeUnits: BigNumber;
        computeHash: string;
      }
    >;

    ComputeRequested(
      requester?: string | null,
      computeManager?: string | null,
      optionId?: null,
      computeId?: null,
      computeUnits?: null,
      computeHash?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber, string],
      {
        requester: string;
        computeManager: string;
        optionId: BigNumber;
        computeId: BigNumber;
        computeUnits: BigNumber;
        computeHash: string;
      }
    >;

    "ComputeRevoked(address,address,uint256)"(
      requester?: string | null,
      computeManager?: string | null,
      computeId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { requester: string; computeManager: string; computeId: BigNumber }
    >;

    ComputeRevoked(
      requester?: string | null,
      computeManager?: string | null,
      computeId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { requester: string; computeManager: string; computeId: BigNumber }
    >;

    "DaoFeeUpdated(uint256,uint24)"(
      minimumFee?: null,
      percentageFee?: null
    ): TypedEventFilter<
      [BigNumber, number],
      { minimumFee: BigNumber; percentageFee: number }
    >;

    DaoFeeUpdated(
      minimumFee?: null,
      percentageFee?: null
    ): TypedEventFilter<
      [BigNumber, number],
      { minimumFee: BigNumber; percentageFee: number }
    >;
  };

  estimateGas: {
    claimAsto(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    completeCompute(
      computeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestCompute(
      computeManager: string,
      optionId: BigNumberish,
      units: BigNumberish,
      computeHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeCompute(
      computeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakeAsto(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimAsto(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    completeCompute(
      computeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestCompute(
      computeManager: string,
      optionId: BigNumberish,
      units: BigNumberish,
      computeHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeCompute(
      computeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakeAsto(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
