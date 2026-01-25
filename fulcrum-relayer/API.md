# Fulcrum Relayer API Documentation

Complete API reference for the Fulcrum Relayer service.

---

## Base URL

```
http://localhost:3001
```

For production:
```
https://your-relayer-domain.com
```

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check if the relayer service is running.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-01-25T18:15:00.000Z",
  "service": "fulcrum-relayer"
}
```

**Example**:
```bash
curl http://localhost:3001/health
```

---

### 2. Service Status

**GET** `/status`

Get detailed service status and configuration.

**Response**:
```json
{
  "status": "running",
  "config": {
    "casperNode": "http://65.109.83.79:7777/rpc",
    "ethereumChain": 1,
    "pollInterval": 5000
  }
}
```

**Example**:
```bash
curl http://localhost:3001/status
```

---

### 3. Deployment Info

**GET** `/api/deploy`

Get complete deployment information and capabilities.

**Response**:
```json
{
  "service": "fulcrum-relayer",
  "version": "1.0.0",
  "deployment": {
    "environment": "development",
    "casperNode": "http://65.109.83.79:7777/rpc",
    "casperContract": "hash-...",
    "ethereumChain": 1,
    "ethereumAvatar": "0x...",
    "pollInterval": 5000,
    "port": 3001
  },
  "capabilities": {
    "eventListening": true,
    "zkProofGeneration": true,
    "evmSubmission": true,
    "statusTracking": true
  },
  "endpoints": {
    "health": "/health",
    "status": "/status",
    "intentStatus": "/api/status/:deployHash",
    "allIntents": "/api/intents",
    "deployInfo": "/api/deploy",
    "manualTrigger": "/api/trigger"
  }
}
```

**Example**:
```bash
curl http://localhost:3001/api/deploy
```

**Use Cases**:
- Check relayer configuration
- Verify deployment settings
- Discover available endpoints
- Validate capabilities

---

### 4. Intent Status

**GET** `/api/status/:deployHash`

Get the current status of a specific intent.

**Parameters**:
- `deployHash` (path) - The Casper deploy hash

**Response** (Success):
```json
{
  "deployHash": "803bc77641db...",
  "status": "confirmed",
  "casperBlockHeight": 12345,
  "casperConfirmations": 10,
  "zkProofGenerated": true,
  "evmTxHash": "0x7f83b1657ff1...",
  "evmBlockNumber": 54321,
  "gasUsed": "150000",
  "timestamp": 1706198400000
}
```

**Response** (Not Found):
```json
{
  "error": "Intent not found",
  "deployHash": "803bc77641db...",
  "message": "Intent not yet detected by relayer"
}
```

**Status Values**:
- `pending_casper` - Waiting for Casper finality
- `proving` - Generating ZK proof
- `submitting_evm` - Submitting to EVM chain
- `confirmed` - Successfully executed
- `failed` - Execution failed

**Example**:
```bash
curl http://localhost:3001/api/status/803bc77641db...
```

**Frontend Integration**:
```typescript
const status = await fetch(
  `http://localhost:3001/api/status/${deployHash}`
).then(r => r.json());

console.log(status.status); // "confirmed"
console.log(status.evmTxHash); // "0x..."
```

---

### 5. All Intents

**GET** `/api/intents`

Get all tracked intents.

**Response**:
```json
{
  "count": 3,
  "intents": [
    {
      "deployHash": "803bc77641db...",
      "status": "confirmed",
      "evmTxHash": "0x7f83b1657ff1...",
      "timestamp": 1706198400000
    },
    {
      "deployHash": "a1b2c3d4e5f6...",
      "status": "proving",
      "zkProofGenerated": false,
      "timestamp": 1706198450000
    },
    {
      "deployHash": "f6e5d4c3b2a1...",
      "status": "pending_casper",
      "timestamp": 1706198500000
    }
  ]
}
```

**Example**:
```bash
curl http://localhost:3001/api/intents
```

**Use Cases**:
- Dashboard overview
- Analytics
- Monitoring
- Debugging

---

### 6. Manual Trigger (Testing)

**POST** `/api/trigger`

Manually trigger intent processing (for testing/demo).

**Request Body**:
```json
{
  "deployHash": "test-deploy-hash-123",
  "caller": "0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c",
  "targetChain": 1,
  "targetAddress": "0x1234567890123456789012345678901234567890",
  "data": "0x",
  "nonce": 0
}
```

**Required Fields**:
- `deployHash` - Unique identifier for the intent

**Optional Fields**:
- `caller` - Casper address (default: 0x0000...)
- `targetChain` - Chain ID (default: 1)
- `targetAddress` - Target contract (default: 0x0000...)
- `data` - Calldata (default: "0x")
- `nonce` - Nonce (default: 0)

**Response**:
```json
{
  "success": true,
  "message": "Intent processing triggered",
  "deployHash": "test-deploy-hash-123",
  "status": "pending_casper"
}
```

**Example**:
```bash
curl -X POST http://localhost:3001/api/trigger \
  -H "Content-Type: application/json" \
  -d '{
    "deployHash": "test-deploy-hash-123",
    "targetChain": 1,
    "targetAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c"
  }'
```

**Processing Timeline**:
1. Immediately: Status set to `pending_casper`
2. After 2s: Status changes to `proving`
3. After 7s: Status changes to `submitting_evm`
4. After 10s: Status changes to `confirmed`

**Use Cases**:
- Testing without Casper wallet
- Demo purposes
- Integration testing
- Development workflow

**Frontend Example**:
```typescript
// Trigger a test intent
const response = await fetch('http://localhost:3001/api/trigger', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    deployHash: 'test-' + Date.now(),
    targetChain: 1,
    targetAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c'
  })
});

const result = await response.json();
console.log(result.deployHash); // "test-1706198400000"

// Poll for status updates
const pollStatus = async (deployHash) => {
  const status = await fetch(
    `http://localhost:3001/api/status/${deployHash}`
  ).then(r => r.json());
  
  console.log(status.status);
  
  if (status.status !== 'confirmed' && status.status !== 'failed') {
    setTimeout(() => pollStatus(deployHash), 2000);
  }
};

pollStatus(result.deployHash);
```

---

## Error Responses

All endpoints may return error responses:

**400 Bad Request**:
```json
{
  "error": "deployHash is required"
}
```

**404 Not Found**:
```json
{
  "error": "Intent not found",
  "deployHash": "...",
  "message": "Intent not yet detected by relayer"
}
```

**500 Internal Server Error**:
```json
{
  "error": "Internal server error message"
}
```

---

## CORS

The relayer has CORS enabled for all origins:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production:
- Implement rate limiting per IP
- Add authentication for sensitive endpoints
- Monitor for abuse

---

## Monitoring

### Health Check Monitoring

Set up monitoring to ping `/health` every 30 seconds:

```bash
# Example with curl
while true; do
  curl -s http://localhost:3001/health | jq .status
  sleep 30
done
```

### Intent Tracking

Monitor all intents:

```bash
# Get current intent count
curl -s http://localhost:3001/api/intents | jq .count

# Get pending intents
curl -s http://localhost:3001/api/intents | \
  jq '.intents[] | select(.status == "pending_casper")'
```

---

## Testing Workflow

### 1. Quick Test

```bash
# Start relayer
cd fulcrum-relayer
npm run dev

# In another terminal, trigger a test intent
curl -X POST http://localhost:3001/api/trigger \
  -H "Content-Type: application/json" \
  -d '{"deployHash": "test-123"}'

# Watch status updates
watch -n 2 'curl -s http://localhost:3001/api/status/test-123 | jq'
```

### 2. Frontend Integration Test

```typescript
// Test button in your frontend
const testIntent = async () => {
  // Trigger intent
  const trigger = await fetch('http://localhost:3001/api/trigger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deployHash: 'frontend-test-' + Date.now(),
      targetChain: 1,
      targetAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c'
    })
  }).then(r => r.json());
  
  console.log('Triggered:', trigger);
  
  // Start polling
  RelayerAPI.pollIntentStatus(trigger.deployHash, (status) => {
    console.log('Status update:', status);
  });
};
```

---

## Production Deployment

### Environment Variables

```env
NODE_ENV=production
PORT=3001
CASPER_NODE_URL=https://casper-node.example.com
CASPER_CONTRACT_HASH=hash-...
ETH_RPC_URL=https://mainnet.infura.io/v3/...
ETH_AVATAR_CONTRACT=0x...
ETH_PRIVATE_KEY=0x...
```

### Docker Deployment

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Health Check Endpoint

Configure your load balancer:
- Health check URL: `/health`
- Expected response: `{"status":"ok"}`
- Check interval: 30 seconds
- Timeout: 5 seconds

---

## API Versioning

Current version: `v1` (implicit)

Future versions will use path prefix:
- `/api/v1/status/:deployHash`
- `/api/v2/status/:deployHash`

---

## Changelog

### v1.0.0 (Current)
- ✅ Health check endpoint
- ✅ Service status endpoint
- ✅ Intent status tracking
- ✅ All intents listing
- ✅ Deployment info
- ✅ Manual trigger for testing

### Future
- [ ] WebSocket support for real-time updates
- [ ] Authentication/API keys
- [ ] Rate limiting
- [ ] Batch status queries
- [ ] Historical data API

---

## Support

For issues or questions:
- Check logs: `tail -f logs/relayer.log`
- Test health: `curl http://localhost:3001/health`
- Check deployment: `curl http://localhost:3001/api/deploy`

---

**The Fulcrum Relayer API is ready for integration! 🚀**
