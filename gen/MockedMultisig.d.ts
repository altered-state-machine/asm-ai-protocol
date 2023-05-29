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

interface MockedMultisigInterface extends ethers.utils.Interface {
  functions: {
    "execute(address,bytes)": FunctionFragment;
    "getBalance()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "execute",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;

  events: {
    "EthReceived(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EthReceived"): EventFragment;
}

export type EthReceivedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    from: string;
    amount: BigNumber;
    blockNumber: BigNumber;
  }
>;

export class MockedMultisig extends BaseContract {
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

  interface: MockedMultisigInterface;

  functions: {
    execute(
      destination: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBalance(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  execute(
    destination: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    execute(
      destination: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "EthReceived(address,uint256,uint256)"(
      from?: string | null,
      amount?: null,
      blockNumber?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { from: string; amount: BigNumber; blockNumber: BigNumber }
    >;

    EthReceived(
      from?: string | null,
      amount?: null,
      blockNumber?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { from: string; amount: BigNumber; blockNumber: BigNumber }
    >;
  };

  estimateGas: {
    execute(
      destination: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    execute(
      destination: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
