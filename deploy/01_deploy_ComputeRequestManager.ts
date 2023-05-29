import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, ethers } = hre;
  const { deploy, execute, getNetworkName } = deployments;
  const { asto, dao, deployer, manager } = await getNamedAccounts();

  const isDev =
    getNetworkName() === "hardhat" || getNetworkName() === "localhost";

  console.log(`Deploying to ${getNetworkName()}`);
  console.log(`Deploying with ${deployer}`);
  console.log(`Deployer balance ${await ethers.provider.getBalance(deployer)}`);

  const astoToUse = isDev
    ? (await hre.deployments.get("MockedERC20")).address
    : asto;

  const crm = await deploy("ComputeRequestManager", {
    from: deployer,
    args: [dao, astoToUse, manager],
    log: true,
  });

  if (crm.newlyDeployed && isDev) {
    console.log("Unpausing Compute Protocol");
    // Unpause
    await execute("ComputeRequestManager", { from: manager }, "unpause");
  }

  console.log(`Deployer balance ${await ethers.provider.getBalance(deployer)}`);
};

func.tags = ["ComputeRequestManager", "production", "test"];

export default func;
