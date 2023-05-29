import { task } from "hardhat/config";
import { BigNumber, ContractTransaction } from "ethers";

task(
  "add-compute-option",
  "Add a compute option to the deployed compute manager"
)
  .addParam("unitCost", "The amount of ASTO per compute unit")
  .addParam("unitSLA", "The SLA per compute unit")
  .setAction(async ({ unitCost, unitSLA }, hre) => {
    const { ethers } = hre;

    const computeManager = await ethers.getContract("ComputeManager");
    console.log(`Requesting with ${await computeManager.signer.getAddress()}`);
    const tx: ContractTransaction = await computeManager.addComputeOption(
      BigNumber.from(10).pow(18).mul(unitCost),
      unitSLA
    );
    await tx.wait();
    console.log(`Compute option added`);
  });
