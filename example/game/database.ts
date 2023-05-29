// For this example, the database uses SQLite which using a disk file database
// Replace this implementation with a real database connection

import SQLite, { Database } from "better-sqlite3";
import { hexlify, randomBytes } from "ethers/lib/utils";
import { MemoryTreeNode } from "../types";

const DB_PATH = "data/database.db";

let db: Database;

const makeHash = (): string => hexlify(randomBytes(32));

const init = async () => {
  if (!db) {
    // Create
    db = await SQLite(DB_PATH);
    // Create memory node table
    db.exec(
      "CREATE TABLE IF NOT EXISTS memory_nodes (node_hash VARCHAR PRIMARY KEY, node_id INTEGER, parent_node_id INTEGER, asset_address TEXT NOT NULL, asset_id INTEGER NOT NULL);"
    );
  }
};

export const getNodeHashById = (nodeId: number): string => {
  const stmt = db.prepare(
    "SELECT node_hash as nodeHash FROM memory_nodes WHERE node_id = ?;"
  );
  return stmt.get(nodeId).nodeHash;
};

export const listNodes = (
  assetAddress: string,
  assetId: number
): MemoryTreeNode[] => {
  const stmt = db.prepare(
    "SELECT node_hash as nodeHash, node_id as nodeId, parent_node_id as parentNodeId FROM memory_nodes WHERE asset_address = ? AND asset_id = ?;"
  );
  return stmt
    .all(assetAddress, assetId)
    .map((n) => ({ ...n, assetAddress, assetId }));
};

export const addNode = (
  assetAddress: string,
  assetId: number,
  nodeId: number | null,
  parentNodeId: number | null
): string => {
  const hash = makeHash();
  const stmt = db.prepare(
    "INSERT INTO memory_nodes (node_hash, node_id, parent_node_id, asset_address, asset_id) VALUES (?, ?, ?, ?, ?);"
  );
  stmt.run(hash, nodeId, parentNodeId, assetAddress, assetId);
  return hash;
};

export const updateNodeId = (nodeHash: string, nodeId: number): void => {
  const stmt = db.prepare(
    "UPDATE memory_nodes SET node_id = ? WHERE node_hash = ?;"
  );
  stmt.run(nodeId, nodeHash);
};

init();
