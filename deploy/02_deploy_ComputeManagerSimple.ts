import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "ethers";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, execute, getNetworkName } = deployments;
  const { deployer } = await getNamedAccounts();

  const computeManager = await deploy("ComputeManagerSimple", {
    from: deployer,
    args: [(await hre.deployments.get("ComputeRequestManager")).address],
    log: true,
  });

  const isDev =
    getNetworkName() === "hardhat" ||
    getNetworkName() === "localhost" ||
    getNetworkName() === "porcini";

  if (computeManager.newlyDeployed && isDev) {
    // Add default compute option
    await execute(
      "ComputeManagerSimple",
      { from: deployer },
      "addComputeOption",
      BigNumber.from(10).pow(18), // 1 ASTO per compute unit
      1 // 1 min per compute unit
    );
  }
};

func.tags = ["ComputeManager", "test", "computeCustodianOwned", "production"];

export default func;
