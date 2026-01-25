# Fulcrum EVM Smart Contracts

Solidity smart contracts for the Fulcrum protocol's Avatar system on EVM-compatible chains.

## Overview

The Fulcrum Avatar is a smart contract wallet on EVM chains (Ethereum, Arbitrum, Base, etc.) that executes transactions verified by zero-knowledge proofs of Ed25519 signatures from the Casper blockchain.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Casper Blockchain                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Fulcrum Controller Contract                       │ │
│  │  - Emits IntentCreated events                      │ │
│  │  - Signs with Ed25519                              │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ ZK Proof
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   EVM Chain (Ethereum)                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Groth16Verifier.sol                               │ │
│  │  - Verifies ZK-SNARK proofs                        │ │
│  │  - BN128 pairing operations                        │ │
│  └────────────────────────────────────────────────────┘ │
│                          │                               │
│                          ▼                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │  FulcrumAvatar.sol                                 │ │
│  │  - Holds funds                                     │ │
│  │  - Executes verified intents                       │ │
│  │  - Nonce-based replay protection                   │ │
│  └────────────────────────────────────────────────────┘ │
│                          │                               │
│                          ▼                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │  DeFi Protocols (Uniswap, Aave, etc.)             │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Contracts

### 1. Groth16Verifier.sol

**Purpose**: Verifies zero-knowledge proofs that prove knowledge of a valid Ed25519 signature.

**Key Features**:
- Groth16 proof verification
- BN128 elliptic curve pairing operations
- Gas-optimized verification (~50k gas vs ~150k for naive Ed25519)

**Functions**:
```solidity
function verifyProof(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
) public view returns (bool)
```

**Note**: For production, this file should be generated from your ZK circuit using:
```bash
snarkjs zkey export solidityverifier circuit_final.zkey Groth16Verifier.sol
```

---

### 2. FulcrumAvatar.sol

**Purpose**: Smart contract wallet that holds funds and executes transactions verified by ZK proofs.

**Key Features**:
- ✅ ZK proof-based transaction execution
- ✅ Nonce-based replay protection
- ✅ Expiry-based time limits
- ✅ Chain ID verification
- ✅ Emergency pause mechanism
- ✅ Owner-based recovery
- ✅ Batch execution support

**Main Functions**:

#### executeIntent
```solidity
function executeIntent(
    Intent calldata intent,
    uint[2] calldata proofA,
    uint[2][2] calldata proofB,
    uint[2] calldata proofC,
    uint[2] calldata publicSignals
) external nonReentrant returns (bool)
```

Executes a single intent after verifying the ZK proof.

#### executeBatch
```solidity
function executeBatch(
    Intent[] calldata intents,
    uint[2][] calldata proofsA,
    uint[2][2][] calldata proofsB,
    uint[2][] calldata proofsC,
    uint[2][] calldata publicSignals
) external nonReentrant returns (bool)
```

Executes multiple intents in a single transaction.

#### Emergency Functions
```solidity
function pause() external onlyOwner
function unpause() external onlyOwner
function emergencyWithdraw(address payable to, uint256 amount) external onlyOwner
function updateController(bytes32 newControllerHash) external onlyOwner
```

---

## Installation

```bash
cd fulcrum-evm
npm install
```

## Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit `.env` with your configuration:
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
CASPER_CONTROLLER_PUBLIC_KEY=your_controller_public_key
```

## Compilation

```bash
npm run compile
```

This will compile all contracts and generate artifacts in the `artifacts/` directory.

## Testing

```bash
npm test
```

Test coverage includes:
- ✅ Deployment and initialization
- ✅ Intent execution with various scenarios
- ✅ Nonce management and replay protection
- ✅ Expiry validation
- ✅ Chain ID verification
- ✅ Pause/unpause functionality
- ✅ Controller management
- ✅ Emergency withdrawal
- ✅ ETH receiving

## Deployment

### Local (Hardhat Network)
```bash
npx hardhat run scripts/deploy.js
```

### Sepolia Testnet
```bash
npm run deploy:sepolia
```

### Custom Network
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## Deployment Output

After deployment, you'll see:
```
🚀 Deploying Fulcrum Avatar Contracts...

Deploying contracts with account: 0x...
Account balance: 1000000000000000000

📝 Step 1: Deploying Groth16Verifier...
✅ Groth16Verifier deployed to: 0x...

📝 Step 2: Deploying FulcrumAvatar...
Controller Public Key Hash: 0x...
✅ FulcrumAvatar deployed to: 0x...

📋 Deployment Summary:
═══════════════════════════════════════════
Network: sepolia
Chain ID: 11155111
Deployer: 0x...

Groth16Verifier: 0x...
FulcrumAvatar: 0x...
Controller Hash: 0x...
═══════════════════════════════════════════
```

Deployment info is automatically saved to `deployments/<network>-<timestamp>.json`.

## Verification

After deployment on testnets/mainnet, verify contracts on Etherscan:

```bash
npx hardhat verify --network sepolia <VERIFIER_ADDRESS>

npx hardhat verify --network sepolia <AVATAR_ADDRESS> \
  "<VERIFIER_ADDRESS>" \
  "<CONTROLLER_HASH>"
```

## Usage Example

### 1. Fund the Avatar
```javascript
await signer.sendTransaction({
  to: avatarAddress,
  value: ethers.parseEther("10")
});
```

### 2. Create an Intent on Casper
```javascript
// On Casper blockchain
await casperController.submit_intent(
  target_chain: 1,  // Ethereum
  target_address: "0xUniswapRouter",
  data: "0x...",    // Encoded swap call
  value: "1000000000000000000"
);
```

### 3. Relayer Generates ZK Proof
The relayer service automatically:
- Detects the IntentCreated event
- Extracts the Ed25519 signature
- Generates a ZK proof
- Submits to the Avatar contract

### 4. Avatar Executes Intent
```javascript
await avatar.executeIntent(
  intent,
  proofA,
  proofB,
  proofC,
  publicSignals
);
```

## Security Features

### 1. Replay Protection
- Nonce-based: Each intent must use the next sequential nonce
- Prevents resubmission of the same intent

### 2. Time Limits
- Expiry timestamp: Intents expire after a set time
- Prevents execution of stale intents

### 3. Chain ID Verification
- Ensures intents are executed on the correct chain
- Prevents cross-chain replay attacks

### 4. ZK Proof Verification
- Cryptographically verifies the intent was authorized by Casper
- No signature data revealed on-chain

### 5. Emergency Controls
- Pause mechanism for emergencies
- Owner-based recovery
- Emergency withdrawal capability

## Gas Costs

| Operation | Gas Cost (approx) |
|-----------|-------------------|
| Deploy Verifier | ~1,500,000 |
| Deploy Avatar | ~2,000,000 |
| Execute Intent | ~150,000 - 300,000 |
| ZK Proof Verification | ~50,000 |
| Batch Execute (5 intents) | ~600,000 - 1,200,000 |

## Intent Structure

```solidity
struct Intent {
    address target;      // Target contract to call
    uint256 value;       // ETH value to send
    bytes data;          // Calldata for the target
    uint256 nonce;       // Nonce for replay protection
    uint256 expiry;      // Expiry timestamp
    uint256 chainId;     // Chain ID for cross-chain protection
}
```

## Events

```solidity
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
```

## Error Handling

```solidity
error InvalidProof();
error InvalidNonce();
error IntentExpired();
error InvalidChainId();
error ExecutionFailed();
error ContractPaused();
error InvalidController();
```

## Integration with Relayer

The Avatar contracts are designed to work seamlessly with the Fulcrum Relayer:

1. Relayer detects IntentCreated event on Casper
2. Relayer generates ZK proof
3. Relayer calls `avatar.executeIntent()` with proof
4. Avatar verifies proof and executes transaction

See `../fulcrum-relayer/README.md` for relayer setup.

## Production Checklist

Before deploying to mainnet:

- [ ] Generate actual Groth16Verifier from ZK circuit
- [ ] Audit smart contracts
- [ ] Test on multiple testnets
- [ ] Set up monitoring and alerts
- [ ] Configure multi-sig for owner
- [ ] Document emergency procedures
- [ ] Set up gas price strategies
- [ ] Test with real DeFi protocols
- [ ] Verify contracts on Etherscan
- [ ] Set up contract upgrade path (if needed)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
