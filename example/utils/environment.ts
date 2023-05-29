import { readFileSync } from "fs";
import { AddressAbi, ContractNames } from "../types";

export const loadABI = (env: string, contract: ContractNames): AddressAbi => {
  const json = JSON.parse(
    readFileSync(`../deployments/${env}/${contract}.json`, "utf8")
  );
  return { address: json.address, abi: json.abi };
};
