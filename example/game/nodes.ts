import { providers, utils, Wallet } from "ethers";
import { hexlify, parseBytes32String, toUtf8Bytes } from "ethers/lib/utils";
import { existsSync, mkdirSync, readFileSync, writeFile } from "fs";
import { dirname } from "path";
import { MemoryNodeData, MemoryTreeNode } from "../types";
import { addNode, getNodeHashById, listNodes } from "./database";

const { RPC_URL, MEMORY_TREE_SIGNER_KEY } = process.env;

// Set up listener
const provider = new providers.JsonRpcProvider(RPC_URL);
const w = new Wallet(MEMORY_TREE_SIGNER_KEY!!, provider);

const getPath = (hash: string): string => `data/nodes/${hash}.json`;

// Create and store training request data
export const createPendingMemoryNode = (
  data: MemoryNodeData
): MemoryNodeData => {
  const { trainingData } = data;
  if (data.trainingData.computeId === undefined) {
    throw Error("Compute request not made for this node");
  }

  // Write reference info to db
  const hash = addNode(
    trainingData.assetAddr,
    trainingData.assetId,
    null, // Pending
    trainingData.parentNodeId
  );

  // Write full details to disk
  const path = getPath(hash);
  mkdirSync(dirname(path), { recursive: true });
  writeFile(path, JSON.stringify(data), (err) => {
    console.error(err);
  });
  return data;
};

// Get stored memory tree node information
export const getMemoryNodeByHash = (hash: string): MemoryNodeData => {
  const path = getPath(hash);
  if (!existsSync(path)) {
    throw Error("Compute hash does not exist");
  }
  return JSON.parse(readFileSync(path, "utf8")) as MemoryNodeData;
};
export const getMemoryNodeById = (nodeId: number): MemoryNodeData =>
  getMemoryNodeByHash(getNodeHashById(nodeId));

// Get stored memory tree nodes in tree format
export const getMemoryTreeView = (
  assetAddress: string,
  assetId: number,
  includeStats = false
): MemoryTreeNode[] => {
  const nodes: MemoryTreeNode[] = listNodes(assetAddress, assetId);
  const roots: MemoryTreeNode[] = [];
  nodes.forEach((n) => {
    if (includeStats) {
      n.stats = getMemoryNodeByHash(n.nodeHash).stats;
    }
    if (n.parentNodeId == null) {
      roots.push(n);
    }
    if (n.nodeId !== null) {
      n.children = nodes.filter((c) => c.parentNodeId == n.nodeId);
    }
  });

  return roots;
};

// Get stored memory tree node information
export const getPendingNodeParams = async (
  nodeHash: string
): Promise<any[]> => {
  // FIXME Check node is pending
  const { trainingData } = getMemoryNodeByHash(nodeHash);
  let msgHash: string;
  let params: any[] = [];
  if (trainingData.parentNodeId == null) {
    // New memory tree
    params = [trainingData.assetAddr, trainingData.assetId, nodeHash, nodeHash];
    msgHash = utils.solidityKeccak256(
      ["address", "uint256", "bytes32", "string"],
      params
    );
  } else {
    // New node in tree
    params = [trainingData.parentNodeId, nodeHash, nodeHash];
    msgHash = utils.solidityKeccak256(["uint256", "bytes32", "string"], params);
  }
  // Push sig
  params.push(await w.signMessage(utils.arrayify(msgHash)));
  return params;
};
