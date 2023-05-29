import dotenv from "dotenv";
dotenv.config();
import { BigNumber, ethers, Wallet } from "ethers";
import { loadABI } from "./utils/environment";
import {
  getTrainingData,
  runTraining,
  updateTrainingData,
} from "./game/training";
import { getAsset, updateAsset } from "./game/assets";
import { createPendingMemoryNode, getMemoryNodeById } from "./game/nodes";
import { updateNodeId } from "./game/database";

// Load vars
dotenv.config();
const { RPC_URL, ENVIRONMENT, COMPUTE_CUSTODIAN_SIGNER_KEY } = process.env;
if (!ENVIRONMENT) {
  console.error("Missing env vars!!!");
  process.abort();
}

// Load ABIs
const crmData = loadABI(ENVIRONMENT, "ComputeRequestManager");
const computeManagerData = loadABI(ENVIRONMENT, "ComputeManagerSimple");
const mtData = loadABI(ENVIRONMENT, "MemoryTree");

// Set up listener
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const w = new Wallet(COMPUTE_CUSTODIAN_SIGNER_KEY!!, provider);
const crm = new ethers.Contract(crmData.address, crmData.abi, w);
const computeManager = new ethers.Contract(
  computeManagerData.address,
  computeManagerData.abi,
  w
);
const memoryTree = new ethers.Contract(mtData.address, mtData.abi, w);

// Listen to compute manager training requests
crm.on(
  crm.filters.ComputeRequested(
    null,
    computeManagerData.address,
    null,
    null,
    null,
    null
  ),
  async (...data) => {
    const computeHash = data[5];
    try {
      // Load training info
      const trainingData = getTrainingData(computeHash);
      trainingData.computeId = data[3];
      trainingData.computeUnits = BigNumber.from(data[4]).toNumber();
      updateTrainingData(trainingData);
      const { assetAddr, assetId } = trainingData;
      console.log(
        `Training running ${computeHash} for token ${assetAddr} ${assetId}`
      );
      const assetData = await getAsset(assetAddr, assetId);

      // Run training
      const parentNodeData =
        trainingData.parentNodeId != null
          ? getMemoryNodeById(trainingData.parentNodeId)
          : null;
      const nodeData = runTraining(assetData, parentNodeData, trainingData);

      // Store results
      updateAsset(assetAddr, assetId, assetData);
      createPendingMemoryNode(nodeData);

      // Mark compute completed
      await computeManager.completeCompute(trainingData.computeId);

      console.log(
        `Training ${trainingData.computeId} completed ${computeHash} for token ${assetAddr} ${assetId}`
      );
    } catch (err) {
      //FIXME Better error handling
      console.log(err);
      console.log(`Training hash ${computeHash} not found`);
    }
  }
);

// Listen to memory tree updates
memoryTree.on("MemoryNodeAdded", async (...data) => {
  const nodeHash: string = data[3];
  const nodeId: number = BigNumber.from(data[2]).toNumber();
  try {
    updateNodeId(nodeHash, nodeId);
    console.log(`Updated ${nodeHash} id to ${nodeId}`);
  } catch (err) {
    //FIXME Better error handling
    console.log(err);
    console.log(`Node with hash ${nodeHash} not found`);
  }
});
