// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract MockedUniswapV2Router02 is IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256,
        address[] calldata path,
        address to,
        uint256
    ) external override returns (uint256[] memory amounts) {
        // Perform an exact swap for testing
        IERC20(path[0]).transferFrom(msg.sender, address(this), amountIn);
        IERC20(path[1]).transfer(to, amountIn);
        amounts = new uint256[](2);
        amounts[0] = 0;
        amounts[1] = amountIn;
        return amounts;
    }

    function quote(
        uint256 amountA,
        uint256,
        uint256
    ) external pure override returns (uint256) {
        // Return twice as much testing
        return amountA * 2;
    }

    //
    // Not implemented
    //

    function factory() external pure override returns (address) {
        return address(0);
    }

    // solhint-disable-next-line func-name-mixedcase
    function WETH() external pure override returns (address) {
        return address(0);
    }

    function addLiquidity(
        address,
        address,
        uint256,
        uint256,
        uint256,
        uint256,
        address,
        uint256
    )
        external
        pure
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        )
    {
        return (0, 0, 0);
    }

    function addLiquidityETH(
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        )
    {
        return (0, 0, 0);
    }

    function removeLiquidity(
        address,
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256
    ) external pure override returns (uint256 amountA, uint256 amountB) {
        return (0, 0);
    }

    function removeLiquidityETH(
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256
    ) external pure override returns (uint256 amountToken, uint256 amountETH) {
        return (0, 0);
    }

    function removeLiquidityWithPermit(
        address,
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256,
        bool,
        uint8,
        bytes32,
        bytes32
    ) external pure override returns (uint256 amountA, uint256 amountB) {
        return (0, 0);
    }

    function removeLiquidityETHWithPermit(
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256,
        bool,
        uint8,
        bytes32,
        bytes32
    ) external pure override returns (uint256 amountToken, uint256 amountETH) {
        return (0, 0);
    }

    function swapTokensForExactTokens(
        uint256,
        uint256,
        address[] calldata,
        address,
        uint256
    ) external pure override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function swapExactETHForTokens(
        uint256,
        address[] calldata,
        address,
        uint256
    ) external payable override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function swapTokensForExactETH(
        uint256,
        uint256,
        address[] calldata,
        address,
        uint256
    ) external pure override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function swapExactTokensForETH(
        uint256,
        uint256,
        address[] calldata,
        address,
        uint256
    ) external pure override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function swapETHForExactTokens(
        uint256,
        address[] calldata,
        address,
        uint256
    ) external payable override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function getAmountOut(
        uint256,
        uint256,
        uint256
    ) external pure override returns (uint256) {
        return 0;
    }

    function getAmountIn(
        uint256,
        uint256,
        uint256
    ) external pure override returns (uint256) {
        return 0;
    }

    function getAmountsOut(uint256, address[] calldata) external pure override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function getAmountsIn(uint256, address[] calldata) external pure override returns (uint256[] memory) {
        return new uint256[](0);
    }

    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256
    ) external pure override returns (uint256) {
        return 0;
    }

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address,
        uint256,
        uint256,
        uint256,
        address,
        uint256,
        bool,
        uint8,
        bytes32,
        bytes32
    ) external pure override returns (uint256) {
        return 0;
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256,
        uint256,
        address[] calldata,
        address,
        uint256
    ) external override {} // solhint-disable-line no-empty-blocks

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256,
        address[] calldata,
        address,
        uint256
    ) external payable override {} // solhint-disable-line no-empty-blocks

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256,
        uint256,
        address[] calldata,
        address,
        uint256
    ) external override {} // solhint-disable-line no-empty-blocks
}
