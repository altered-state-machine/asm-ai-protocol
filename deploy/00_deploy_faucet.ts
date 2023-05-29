import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "ethers";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("MockASTO", {
    from: deployer,
    log: true,
  });

  await deploy("MockBrain", {
    from: deployer,
    log: true,
  });
};

func.tags = ["faucet"];

export default func;
