import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getAsset } from "./game/assets";
import { createTrainingData } from "./game/training";
import { getMemoryTreeView, getPendingNodeParams } from "./game/nodes";

// Load vars
const { PORT_GAME, ENVIRONMENT } = process.env;
if (!PORT_GAME || !ENVIRONMENT) {
  console.error("Missing env vars!!!");
  process.abort();
}

// Set up web server
const app = express();
app.use(express.json());

// UI
app.get("/", (req, res) => {
  res.redirect("static/index.html");
});
app.use("/abi", express.static(`../deployments/${ENVIRONMENT}`));
app.use("/static", express.static("ui"));

// Get asset statistics
app.get("/asset/:addr/:id", async (req, res) => {
  const { addr, id } = req.params;
  res.send(await getAsset(addr, parseInt(id)));
});

// Create training request
app.post("/training", async (req, res) => {
  const { addr, id, parentNodeId, params } = req.body;
  res.send(
    await createTrainingData(
      addr,
      parseInt(id),
      parentNodeId ? parseInt(parentNodeId) : null,
      params
    )
  );
});

// List all nodes
app.get("/nodes/:addr/:id", async (req, res) => {
  const { addr, id } = req.params;
  res.send(await getMemoryTreeView(addr, parseInt(id), true));
});
// Get the signed hash for finalising this pending node
app.post("/nodes/pending", async (req, res) => {
  const { nodeHash } = req.body;
  const params = await getPendingNodeParams(nodeHash);
  res.send({ params });
});

// Start app
app.listen(PORT_GAME, () => {
  console.log(`Server is running at https://localhost:${PORT_GAME}`);
});
