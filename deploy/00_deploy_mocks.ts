import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "ethers";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const multisig = await deploy("MockedMultisig", {
    from: deployer,
    log: true,
  });

  await deploy("MockedERC20", {
    from: deployer,
    args: ["ASTO", "ASTO", multisig.address, BigNumber.from(10).pow(18), 18],
    log: true,
  });

  await deploy("MockedERC721", {
    from: deployer,
    args: ["BRAIN1", "BRAIN1"],
    log: true,
  });
};

func.tags = ["test"];

export default func;
