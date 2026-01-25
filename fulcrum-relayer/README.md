# Fulcrum Relayer Service

The Fulcrum Relayer is a backend service that listens for cross-chain intent events on the Casper blockchain, generates zero-knowledge proofs, and submits them to target chains (like Ethereum) for execution.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Fulcrum Relayer Service                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐    ┌──────────────────┐              │
│  │  Event Listener  │───▶│  Proof Generator │              │
│  │   (Casper)       │    │   (ZK-SNARKs)    │              │
│  └──────────────────┘    └──────────────────┘              │
│           │                        │                         │
│           │                        ▼                         │
│           │              ┌──────────────────┐               │
│           └─────────────▶│  TX Submitter    │               │
│                          │   (Ethereum)     │               │
│                          └──────────────────┘               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Features

✅ **Event Listener Module** - Polls Casper blockchain for `IntentCreated` events  
✅ **ZK Proof Generator** - Generates zero-knowledge proofs for Ed25519 signatures  
✅ **Transaction Submitter** - Submits proofs to Ethereum Avatar contracts  
✅ **Health Monitoring** - HTTP endpoints for health checks and status  
✅ **Graceful Shutdown** - Handles SIGINT/SIGTERM signals  
✅ **Structured Logging** - Winston-based logging with file rotation  

## Installation

```bash
cd fulcrum-relayer
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your configuration:

```env
# Casper Configuration
CASPER_NODE_URL=http://65.109.83.79:7777/rpc
CASPER_CHAIN_NAME=casper-test
CASPER_CONTRACT_HASH=hash-803bc77641db94ca0247662d76dbe96e4cc1feca82a269e3dd6d01035be99aa9

# Ethereum Configuration
ETH_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
ETH_CHAIN_ID=11155111
ETH_AVATAR_CONTRACT=0xYourAvatarContractAddress
ETH_PRIVATE_KEY=your_private_key_here

# Relayer Configuration
POLL_INTERVAL_MS=5000
PORT=3001

# ZK Circuit Paths (optional - will use mock proofs if not available)
ZK_WASM_PATH=./circuits/ed25519_verifier.wasm
ZK_ZKEY_PATH=./circuits/ed25519_verifier.zkey
ZK_VERIFICATION_KEY_PATH=./circuits/verification_key.json
```

## Running the Relayer

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```bash
GET http://localhost:3001/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-25T12:00:00.000Z",
  "service": "fulcrum-relayer"
}
```

### Status
```bash
GET http://localhost:3001/status
```

Response:
```json
{
  "status": "running",
  "config": {
    "casperNode": "http://65.109.83.79:7777/rpc",
    "ethereumChain": 11155111,
    "pollInterval": 5000
  }
}
```

## How It Works

### 1. Event Listening
The relayer continuously polls the Casper blockchain for new `IntentCreated` events:

```typescript
// Polls every 5 seconds (configurable)
await eventListener.startListening(async (event) => {
  await handleIntent(event);
});
```

### 2. Signature Extraction
When an event is detected, the relayer fetches the deploy information and extracts the Ed25519 signature:

```typescript
const deployInfo = await eventListener.getDeployInfo(event.deployHash);
const signature = eventListener.extractSignature(deployInfo);
```

### 3. ZK Proof Generation
The signature is fed into a ZK circuit to generate a proof:

```typescript
const proof = await proofGenerator.generateProof(event, signature);
```

**Note**: For development, if ZK circuit files are not available, the relayer will generate mock proofs.

### 4. Transaction Submission
The proof is submitted to the Ethereum Avatar contract:

```typescript
const result = await txSubmitter.submitTransaction(event, proof);
```

## Project Structure

```
fulcrum-relayer/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── config.ts                   # Configuration management
│   ├── logger.ts                   # Logging utility
│   ├── listeners/
│   │   └── casper-listener.ts      # Casper event listener
│   ├── zk/
│   │   └── proof-generator.ts      # ZK proof generation
│   ├── submitters/
│   │   └── eth-submitter.ts        # Ethereum transaction submitter
│   └── services/
│       └── relayer.ts              # Main relayer orchestrator
├── circuits/                       # ZK circuit files (optional)
├── proofs/                         # Generated proofs (auto-created)
├── logs/                           # Log files (auto-created)
├── package.json
├── tsconfig.json
└── .env
```

## Logging

Logs are written to:
- **Console**: Colored, formatted output
- **logs/combined.log**: All logs
- **logs/error.log**: Error logs only

Log levels: `error`, `warn`, `info`, `debug`

## Development Notes

### Mock Proofs
If ZK circuit files are not available, the relayer will automatically use mock proofs for development. This allows you to test the full flow without setting up the ZK circuits.

### Gas Management
The relayer needs ETH on the target chain to pay for gas. Monitor the relayer balance:

```bash
# Check logs for balance information
tail -f logs/combined.log | grep "balance"
```

### Event Processing
Events are processed once and tracked to prevent duplicates. The relayer maintains a set of processed event IDs.

## Troubleshooting

### "Configuration validation failed"
Make sure all required environment variables are set in `.env`.

### "Insufficient relayer balance"
Fund the relayer wallet with ETH on the target chain.

### "Failed to fetch deploy info"
Check that the Casper node URL is correct and accessible.

### "Error submitting transaction"
- Verify the Avatar contract address is correct
- Check that the contract is deployed on the target chain
- Ensure the relayer has enough gas

## Production Deployment

### Using PM2
```bash
npm install -g pm2
npm run build
pm2 start dist/index.js --name fulcrum-relayer
pm2 save
pm2 startup
```

### Using Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

## Security Considerations

1. **Private Key Management**: Never commit `.env` file. Use environment variables or secret management systems in production.
2. **RPC Endpoints**: Use authenticated RPC endpoints (Infura, Alchemy) for production.
3. **Rate Limiting**: Implement rate limiting for API endpoints.
4. **Monitoring**: Set up alerts for relayer balance, failed transactions, and errors.

## Next Steps

1. **ZK Circuits**: Set up actual ZK circuits for Ed25519 signature verification
2. **Gas Optimization**: Implement gas price strategies
3. **Multi-Chain**: Add support for more target chains (Arbitrum, Base, etc.)
4. **Monitoring**: Integrate with monitoring tools (Prometheus, Grafana)
5. **Database**: Add database for event tracking and analytics

## License

MIT
