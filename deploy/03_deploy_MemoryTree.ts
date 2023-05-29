import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("MemoryTree", {
    from: deployer,
    log: true,
  });
};

func.tags = ["MemoryTree", "test", "computeCustodianOwned", "production"];

export default func;
