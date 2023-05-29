// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./ComputeManagerSimple.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

/**
 * ComputeManager.
 * @notice This is a sample implementation including USDC price pegging.
 * @dev This contract uses the Uniswap ASTO-USDC liquidity pair for pricing.
 * @dev Pricing may be subject to slippage.
 */
contract ComputeManagerUSDC is ComputeManagerSimple {
    IERC20 public immutable asto;
    IERC20 public immutable usdc;
    IUniswapV2Pair public immutable lpPair;
    IUniswapV2Router02 public immutable lpRouter;

    constructor(
        address asto_,
        address usdc_,
        address uniswapPair,
        address uniswapRouter,
        address computeRequestManager_
    ) ComputeManagerSimple(computeRequestManager_) {
        asto = IERC20(asto_);
        usdc = IERC20(usdc_);
        lpPair = IUniswapV2Pair(uniswapPair);
        lpRouter = IUniswapV2Router02(uniswapRouter);
    }

    /**
     * Get the cost for a given compute option.
     * @param index The given compute option index.
     * @param units The number of compute units to run.
     * @return cost The cost in ASTO.
     * @dev This function should revert if the compute option is no longer valid.
     */
    function getComputeOptionUnitCost(uint256 index, uint64 units)
        public
        view
        override
        validComputeIndex(index)
        returns (uint256 cost)
    {
        if (!computeOptions[index].enabled) revert ComputeInactive();
        uint256 usdcCost = computeOptions[index].unitCost * units;
        cost = getASTOPriceForUSDC(usdcCost);
        return cost;
    }

    /**
     * Returns the amount of ASTO for USDC using the spot price.
     * @param usdcAmount The amount of USDC.
     * @return astoAmount The equivalent amount of ASTO.
     */
    function getASTOPriceForUSDC(uint256 usdcAmount) public view returns (uint256 astoAmount) {
        uint256 resASTO;
        uint256 resUSDC;
        if (lpPair.token0() == address(asto)) {
            (resASTO, resUSDC, ) = lpPair.getReserves();
        } else {
            (resUSDC, resASTO, ) = lpPair.getReserves();
        }
        return lpRouter.quote(usdcAmount, resUSDC, resASTO);
    }
}
