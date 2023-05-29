import { task } from "hardhat/config";
import { BigNumber } from "ethers";

task("give-brain", "Mint a brain from a mock ERC721 contract")
  .addParam("address", "The address to mint to")
  .setAction(async ({ address, amount }, hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { execute } = deployments;
    const { deployer } = await getNamedAccounts();

    await execute("MockedERC721", { from: deployer }, "mint", address);
  });

task("give-asto", "Mint ASTO from a mock ERC20 contract")
  .addParam("address", "The address to mint ASTO to")
  .addParam("amount", "The amount of ASTO to mint")
  .setAction(async ({ address, amount }, hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { execute } = deployments;
    const { deployer } = await getNamedAccounts();

    await execute(
      "MockedERC20",
      { from: deployer },
      "mint",
      address,
      BigNumber.from(10).pow(18).mul(amount)
    );
  });

task("update-crm-allowance", "Update the ASTO allowance for the ")
  .addParam("amount", "The amount of ASTO to set as the allowance")
  .setAction(async ({ amount }, hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { execute } = deployments;
    const { deployer } = await getNamedAccounts();

    await execute(
      "MockedERC20",
      { from: deployer },
      "approve",
      (
        await deployments.get("ComputeRequestManager")
      ).address,
      BigNumber.from(10).pow(18).mul(amount)
    );
  });

task("send-eth", "Send ETH from the deployer")
  .addParam("address", "The address to send ETH to")
  .addParam("amount", "The amount of ETH to send")
  .setAction(async ({ address, amount }, hre) => {
    const { ethers } = hre;

    const [deployer] = await ethers.getSigners();

    const tx = await deployer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();
  });
