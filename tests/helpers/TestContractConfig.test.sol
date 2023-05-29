// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../../contracts/ComputeRequestManager.sol";
import "../../contracts/samples/MemoryTreeEnumerable.sol";
import "../../contracts/samples/ComputeManagerSimple.sol";

import "../../contracts/mocks/MockedMultisig.sol";
import "../../contracts/mocks/MockedERC20.sol";
import "../../contracts/mocks/MockedERC721.sol";
import "../../contracts/mocks/MockedUniswapV2Router02.sol";
import "../../contracts/helpers/Errors.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

import "ds-test/test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

/**
 * Common contract for setting up tests in this repo.
 */
contract TestContractConfig is DSTest, Errors {
    using ECDSA for bytes32;

    MockedMultisig internal multisig_;
    ComputeRequestManager internal crm_;
    MockedERC20 internal asto_;
    MockedERC20 internal usdc_;
    MockedERC721 internal brain1_;
    MockedERC721 internal brain2_;
    ComputeManagerSimple internal computeManager1_;
    MemoryTreeEnumerable internal tree1_;

    address internal dao = 0xca5Fb01F36E8820A91ABb617A8608Db0073E8b3e;
    address internal multisig;
    address internal crm;
    address internal asto;
    address internal brain1;
    address internal brain2;
    address internal computeManager1;
    address internal tree1;

    // Cheat codes are state changing methods called from the address:
    // 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D
    Vm internal vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    address internal deployer = address(this);
    address internal user1 = 0xA847d497b38B9e11833EAc3ea03921B40e6d847c;
    address internal user2 = 0x43cDF1c92eaF45564DB9AD06B22b7A121F7491C2;
    address internal signer = 0xeb24a849E6C908D4166D34D7E3133B452CB627D2;
    address internal manager = 0x1Fb0E85b7Ba55F0384d0E06D81DF915aeb3baca3;

    event BytesEvent(bytes hash);
    event Bytes32Event(bytes32 hash);

    /** ----------------------------------
     * ! Setup
     * ----------------------------------- */

    // The state of the contract gets reset before each
    // test is run, with the `setUp()` function being called
    // each time after deployment. Think of this like a JavaScript
    // `beforeEach` block
    function setUp() public virtual {
        deployContracts();
        setupContracts();
        setupWallets();
    }

    function deployContracts() internal virtual {
        // Admin accounts
        multisig_ = new MockedMultisig();
        multisig = address(multisig_);

        // ERC20
        asto_ = new MockedERC20("ASTO", "ASTO", user1, 1000 * 10e18, 18);
        asto = address(asto_);

        // ERC721
        brain1_ = new MockedERC721("BRAIN1", "BRAIN1");
        brain1 = address(brain1_);
        brain2_ = new MockedERC721("BRAIN2", "BRAIN2");
        brain2 = address(brain2_);

        // Compute Request Manager
        crm_ = new ComputeRequestManager(dao, asto, manager);
        crm = address(crm_);

        // ComputeManager
        computeManager1_ = new ComputeManagerSimple(crm);
        computeManager1 = address(computeManager1_);

        // Memory Tree
        tree1_ = new MemoryTreeEnumerable();
        tree1 = address(tree1_);
    }

    function setupContracts() internal virtual {
        // Add computeManager compute option
        computeManager1_.addComputeOption(1, 1);

        // Set allowances
        vm.prank(user1);
        asto_.increaseAllowance(crm, 100 * 10e18);
    }

    function setupWallets() internal virtual {
        // Give 10 ETH
        vm.deal(address(this), 10e18);
        vm.deal(user1, 10e18);
        vm.deal(user2, 10e18);
        vm.deal(signer, 10e18);

        // Give Brains
        brain1_.mint(user1);
        brain2_.mint(user1);
        brain1_.mint(user2);
    }

    /** ----------------------------------
     * ! Test contract helpers
     * ----------------------------------- */

    function getRoleErrorMessage(address addr, bytes32 role) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "AccessControl: account ",
                    Strings.toHexString(uint160(addr), 20),
                    " is missing role ",
                    Strings.toHexString(uint256(role), 32)
                )
            );
    }

    /**
     * @notice this modifier will skip the test
     */
    modifier skip(bool isSkipped) {
        if (!isSkipped) {
            _;
        }
    }

    /**
     * @notice this modifier will skip the testFail*** tests ONLY
     */
    modifier skipFailing(bool isSkipped) {
        if (isSkipped) {
            require(0 == 1);
        } else {
            _;
        }
    }

    function _sign(bytes memory data, uint256 pk) internal returns (bytes memory) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        (v, r, s) = vm.sign(pk, keccak256(data).toEthSignedMessageHash());
        return abi.encodePacked(r, s, v);
    }
}
