import { ContractTransaction } from "ethers";
import { task } from "hardhat/config";

task("crm-unpause", "Unpause the Compute Request Manager").setAction(
  async (_, hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { execute } = deployments;
    const { manager } = await getNamedAccounts();

    await execute("ComputeRequestManager", { from: manager }, "unpause");
  }
);

task("make-compute-request", "Make a request for compute")
  .addParam("optionId", "The compute option id")
  .addParam("units", "The amount of compute units")
  .addParam("computeHash", "The compute hash")
  .setAction(async ({ optionId, units, computeHash }, hre) => {
    const { deployments, ethers } = hre;

    const crm = await ethers.getContract("ComputeRequestManager");
    console.log(`Requesting with ${await crm.signer.getAddress()}`);

    const tx: ContractTransaction = await crm.requestCompute(
      (
        await deployments.get("ComputeManager")
      ).address,
      optionId,
      units,
      computeHash
    );
    await tx.wait();
    console.log(`Compute request added`);
  });
