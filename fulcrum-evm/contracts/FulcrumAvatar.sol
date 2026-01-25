// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Groth16Verifier.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title FulcrumAvatar
 * @notice Smart contract wallet controlled by Casper blockchain via ZK proofs
 * @dev This contract holds funds on EVM chains and executes transactions verified by ZK proofs
 *      of Ed25519 signatures from the Casper Controller contract.
 * 
 * Key Features:
 * - Executes arbitrary transactions with ZK proof verification
 * - Nonce-based replay protection
 * - Expiry-based time limits
 * - Emergency pause mechanism
 * - Owner-based recovery
 */
contract FulcrumAvatar is Ownable, ReentrancyGuard {
    // ZK Verifier contract
    Groth16Verifier public immutable verifier;

    // Controller public key hash (from Casper)
    bytes32 public controllerPublicKeyHash;

    // Nonce for replay protection
    mapping(address => uint256) public nonces;

    // Paused state for emergency
    bool public paused;

    // Intent structure
    struct Intent {
        address target;      // Target contract to call
        uint256 value;       // ETH value to send
        bytes data;          // Calldata for the target
        uint256 nonce;       // Nonce for replay protection
        uint256 expiry;      // Expiry timestamp
        uint256 chainId;     // Chain ID for cross-chain protection
    }

    // Events
    event IntentExecuted(
        bytes32 indexed intentHash,
        address indexed target,
        uint256 value,
        uint256 nonce
    );

    event ControllerUpdated(bytes32 indexed oldController, bytes32 indexed newController);
    event Paused(address indexed by);
    event Unpaused(address indexed by);
    event FundsReceived(address indexed from, uint256 amount);
    event FundsWithdrawn(address indexed to, uint256 amount);

    // Errors
    error InvalidProof();
    error InvalidNonce();
    error IntentExpired();
    error InvalidChainId();
    error ExecutionFailed();
    error ContractPaused();
    error InvalidController();

    /**
     * @notice Constructor
     * @param _verifier Address of the Groth16Verifier contract
     * @param _controllerPublicKeyHash Hash of the Casper controller's public key
     */
    constructor(
        address _verifier,
        bytes32 _controllerPublicKeyHash
    ) Ownable(msg.sender) {
        require(_verifier != address(0), "Invalid verifier address");
        require(_controllerPublicKeyHash != bytes32(0), "Invalid controller hash");
        
        verifier = Groth16Verifier(_verifier);
        controllerPublicKeyHash = _controllerPublicKeyHash;
    }

    /**
     * @notice Execute an intent with ZK proof verification
     * @param intent The intent to execute
     * @param proof The Groth16 proof
     * @param publicSignals Public inputs to the ZK circuit
     */
    function executeIntent(
        Intent calldata intent,
        uint[2] calldata proofA,
        uint[2][2] calldata proofB,
        uint[2] calldata proofC,
        uint[2] calldata publicSignals
    ) external nonReentrant returns (bool) {
        // Check if paused
        if (paused) revert ContractPaused();

        // Verify chain ID
        if (intent.chainId != block.chainid) revert InvalidChainId();

        // Verify expiry
        if (block.timestamp > intent.expiry) revert IntentExpired();

        // Verify nonce
        if (intent.nonce != nonces[address(this)]) revert InvalidNonce();

        // Compute intent hash
        bytes32 intentHash = keccak256(abi.encode(
            intent.target,
            intent.value,
            intent.data,
            intent.nonce,
            intent.expiry,
            intent.chainId
        ));

        // Verify that public signals match
        // publicSignals[0] should be the intent hash
        // publicSignals[1] should be the controller public key hash
        if (bytes32(publicSignals[0]) != intentHash) revert InvalidProof();
        if (bytes32(publicSignals[1]) != controllerPublicKeyHash) revert InvalidController();

        // Verify the ZK proof
        bool proofValid = verifier.verifyProof(
            proofA,
            proofB,
            proofC,
            publicSignals
        );

        if (!proofValid) revert InvalidProof();

        // Increment nonce to prevent replay
        nonces[address(this)]++;

        // Execute the intent
        (bool success, ) = intent.target.call{value: intent.value}(intent.data);
        if (!success) revert ExecutionFailed();

        emit IntentExecuted(intentHash, intent.target, intent.value, intent.nonce);

        return true;
    }

    /**
     * @notice Execute a batch of intents
     * @param intents Array of intents to execute
     * @param proofs Array of proofs corresponding to each intent
     */
    function executeBatch(
        Intent[] calldata intents,
        uint[2][] calldata proofsA,
        uint[2][2][] calldata proofsB,
        uint[2][] calldata proofsC,
        uint[2][] calldata publicSignals
    ) external nonReentrant returns (bool) {
        require(
            intents.length == proofsA.length &&
            intents.length == proofsB.length &&
            intents.length == proofsC.length &&
            intents.length == publicSignals.length,
            "Array length mismatch"
        );

        for (uint i = 0; i < intents.length; i++) {
            this.executeIntent(
                intents[i],
                proofsA[i],
                proofsB[i],
                proofsC[i],
                publicSignals[i]
            );
        }

        return true;
    }

    /**
     * @notice Update the controller public key hash
     * @param newControllerHash New controller public key hash
     */
    function updateController(bytes32 newControllerHash) external onlyOwner {
        require(newControllerHash != bytes32(0), "Invalid controller hash");
        
        bytes32 oldController = controllerPublicKeyHash;
        controllerPublicKeyHash = newControllerHash;
        
        emit ControllerUpdated(oldController, newControllerHash);
    }

    /**
     * @notice Pause the contract (emergency)
     */
    function pause() external onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @notice Unpause the contract
     */
    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }

    /**
     * @notice Emergency withdrawal (owner only)
     * @param to Address to send funds to
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        require(amount <= address(this).balance, "Insufficient balance");
        
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(to, amount);
    }

    /**
     * @notice Get the current nonce for this avatar
     */
    function getNonce() external view returns (uint256) {
        return nonces[address(this)];
    }

    /**
     * @notice Compute the hash of an intent
     * @param intent The intent to hash
     */
    function hashIntent(Intent calldata intent) external pure returns (bytes32) {
        return keccak256(abi.encode(
            intent.target,
            intent.value,
            intent.data,
            intent.nonce,
            intent.expiry,
            intent.chainId
        ));
    }

    /**
     * @notice Receive ETH
     */
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }

    /**
     * @notice Fallback function
     */
    fallback() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
}
