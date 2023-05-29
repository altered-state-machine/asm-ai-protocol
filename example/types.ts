import { ContractInterface } from "ethers";

// Web3

export type ContractNames =
  | "ComputeRequestManager"
  | "MemoryTree"
  | "ComputeManagerSimple"
  | "MockedERC721";

export type AddressAbi = {
  address: string;
  abi: ContractInterface;
};

// Assets / brains
export type AssetData = {
  id: number;
  genome: {
    growth: number;
  };
  computeUnits: number;
};

// Training

export type TrainingParams = { [key: string]: any };

export type TrainingData = {
  computeId?: number;
  computeHash: string;
  assetAddr: string;
  assetId: number;
  parentNodeId: number | null;
  computeUnits?: number; // Only known after chain result
  trainingParams: TrainingParams;
};

// Memories

export type NodeStats = {
  power: number;
  defense: number;
};

export type MemoryTreeNode = {
  nodeHash: string;
  nodeId: number | null;
  parentNodeId: number | null;
  assetAddress: string;
  assetId: string;
  stats?: NodeStats;
  children?: MemoryTreeNode[];
};

export type MemoryNodeData = {
  trainingData: TrainingData;
  stats: NodeStats;
};
