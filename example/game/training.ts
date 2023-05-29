import { hexlify, randomBytes } from "ethers/lib/utils";
import { existsSync, mkdirSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname } from "path";
import {
  AssetData,
  MemoryNodeData,
  TrainingData,
  TrainingParams,
} from "../types";

// Get a random hash string
const makeHash = (): string => hexlify(randomBytes(32));

const getPath = (hash: string): string => `data/training/${hash}.json`;

// Create and store training request data
export const createTrainingData = async (
  assetAddr: string,
  assetId: number,
  parentNodeId: number | null,
  trainingParams: TrainingParams = {}
): Promise<TrainingData> => {
  const computeHash = makeHash();
  const path = getPath(computeHash);
  if (existsSync(path)) {
    // Very unlikely
    throw Error("Compute hash already created");
  }
  mkdirSync(dirname(path), { recursive: true });
  const data: TrainingData = {
    computeHash,
    assetAddr,
    assetId,
    parentNodeId,
    trainingParams,
  };
  await writeFile(path, JSON.stringify(data));
  return data;
};

// Get stored training request data
export const getTrainingData = (hash: string): TrainingData => {
  const path = getPath(hash);
  if (!existsSync(path)) {
    throw Error("Compute hash does not exist");
  }
  return JSON.parse(readFileSync(path, "utf8")) as TrainingData;
};

// Update stored training request data
export const updateTrainingData = (data: TrainingData): void => {
  const path = getPath(data.computeHash);
  writeFile(path, JSON.stringify(data));
};

// Run training on a given model
export const runTraining = (
  assetData: AssetData,
  parentNodeData: MemoryNodeData | null,
  trainingData: TrainingData
): MemoryNodeData => {
  // If no parent, use the "base" model
  const stats =
    parentNodeData == null ? { power: 1, defense: 1 } : parentNodeData.stats;

  // Run training loops
  for (let i = 0; i < trainingData.computeUnits!!; i++) {
    // For this example we use the brain stat "growth" to determine how quickly the stats can improve
    // This is a trivial and unbalance implementation. Do not use this in production
    if (Math.random() < assetData.genome.growth) {
      stats.power++;
      stats.defense++;
    }
  }
  assetData.computeUnits += trainingData.computeUnits!!; // Update in place

  // Create new node from outputs
  const nodeData: MemoryNodeData = {
    stats,
    trainingData,
  };
  return nodeData;
};
