# Fulcrum End-to-End Testing Guide

This guide will walk you through testing the complete Fulcrum protocol from start to finish.

---

## 🎯 Testing Overview

We'll test the complete flow:
1. ✅ Frontend is running
2. Start Relayer service
3. Check Casper contract deployment
4. Submit an intent from frontend
5. Track status updates in real-time
6. Verify execution on EVM

---

## 📋 Prerequisites Checklist

### Required:
- [ ] Node.js installed
- [ ] Casper Wallet browser extension
- [ ] Some CSPR tokens (testnet)
- [ ] Casper contract deployed (or use mock mode)
- [ ] Relayer dependencies installed

### Optional (for full production test):
- [ ] EVM contracts deployed on testnet
- [ ] ZK circuits compiled
- [ ] Relayer wallet funded with ETH

---

## 🚀 Step-by-Step Testing

### Step 1: Verify Frontend is Running ✅

Your frontend is already running! Check:
```bash
# Should be accessible at:
http://localhost:5173
```

**Test**:
1. Open browser to http://localhost:5173
2. You should see the Fulcrum dashboard
3. Click "Intents" in sidebar

---

### Step 2: Start Relayer Service

Open a new terminal:

```bash
cd /Users/nikhilsharma/Downloads/hacks/Fulcrum/fulcrum-relayer

# Install dependencies (if not done)
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# For testing, you can use mock mode
nano .env
```

**Minimal .env for testing**:
```env
# Casper Configuration
CASPER_NODE_URL=http://65.109.83.79:7777/rpc
CASPER_CONTRACT_HASH=hash-YOUR_CONTRACT_HASH_HERE

# Ethereum Configuration (can use mock for testing)
ETH_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
ETH_AVATAR_CONTRACT=0x0000000000000000000000000000000000000000
ETH_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000001

# Relayer Configuration
POLL_INTERVAL_MS=5000
PORT=3001
LOG_LEVEL=info
```

**Start the relayer**:
```bash
npm run dev
```

**Expected output**:
```
[INFO] Starting Fulcrum Relayer...
[INFO] Configuration validated
[INFO] HTTP server listening on port 3001
[INFO] Starting Fulcrum Relayer Service...
[INFO] Relayer Information { balance: '0.0 ETH', gasPrice: '0 gwei' }
[INFO] Starting event listener...
[INFO] Relayer service is now running
```

---

### Step 3: Test Relayer API

Open another terminal:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Expected response:
# {"status":"ok","timestamp":"2026-01-25T...","service":"fulcrum-relayer"}

# Test status endpoint
curl http://localhost:3001/status

# Expected response:
# {"status":"running","config":{...}}
```

---

### Step 4: Connect Casper Wallet

1. Open frontend: http://localhost:5173
2. Click "Connect Wallet" in top right
3. Approve connection in Casper Wallet
4. You should see your address displayed

---

### Step 5: Create Test Intent

**In the frontend**:

1. Click "Create Intent" button
2. Fill in the form:
   - **Action Type**: Transfer
   - **Target Chain**: Ethereum (or any chain)
   - **Recipient Address**: `0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c`
   - **Token**: ETH
   - **Amount**: `1.0`

3. Click "Sign & Submit"
4. Approve in Casper Wallet
5. Wait for confirmation

**Expected behavior**:
- ✅ Toast: "Intent Submitted to Casper Network!"
- ✅ Intent appears in the Intents table
- ✅ Status: "Pending Casper"

---

### Step 6: Monitor Relayer Logs

In the relayer terminal, you should see:

```
[INFO] Event detected: IntentCreated
[INFO] Processing new intent { eventId: '...', caller: '...', targetChain: 1 }
[INFO] Step 1: Fetching deploy info and signature
[INFO] Signature extracted
[INFO] Step 2: Generating ZK proof
[INFO] ZK proof generated and verified
[INFO] Step 3: Submitting transaction to target chain
[INFO] Intent executed successfully! { txHash: '0x...', gasUsed: '...' }
```

---

### Step 7: Monitor Frontend Status Updates

Watch the frontend Intents page:

**Status progression**:
1. 🟡 **Pending Casper** (0-10 seconds)
   - Waiting for Casper finality
   
2. 🔵 **Generating Proof** (10-30 seconds)
   - Toast: "ZK Proof Generation Started"
   - Progress bar appears
   
3. 🟡 **Submitting to EVM** (30-45 seconds)
   - Toast: "Submitting to EVM Chain"
   
4. 🟢 **Confirmed** (45-60 seconds)
   - Toast: "Intent Executed Successfully!"
   - Shows EVM transaction hash

---

### Step 8: Verify Intent Details

Click on the intent in the table to see details:

**Should show**:
- ✅ Intent ID
- ✅ Status badge
- ✅ Chain and action
- ✅ Target address
- ✅ Value and token
- ✅ Created/Expires timestamps
- ✅ Gas metrics
- ✅ Raw intent JSON

---

## 🧪 Testing Modes

### Mode 1: Mock Mode (Recommended for First Test)

**What it does**:
- Relayer uses mock ZK proofs
- No real EVM transactions
- Tests the full flow without blockchain dependencies

**Setup**:
```env
# In relayer .env
ETH_AVATAR_CONTRACT=0x0000000000000000000000000000000000000000
```

**Expected**:
- ✅ Events detected
- ✅ Mock proofs generated
- ✅ Status updates work
- ⚠️ No real EVM transaction

---

### Mode 2: Testnet Mode (Full Integration)

**What it does**:
- Real Casper contract
- Real ZK proofs (if circuits compiled)
- Real EVM transactions

**Setup**:
```env
# Deploy contracts first
CASPER_CONTRACT_HASH=hash-REAL_HASH
ETH_AVATAR_CONTRACT=0xREAL_ADDRESS
ETH_PRIVATE_KEY=0xREAL_PRIVATE_KEY
```

**Expected**:
- ✅ Full end-to-end execution
- ✅ Real blockchain transactions
- ✅ Verifiable on explorers

---

## 🐛 Troubleshooting

### Issue: Relayer not detecting events

**Check**:
```bash
# Verify contract hash is correct
echo $CASPER_CONTRACT_HASH

# Check Casper node is accessible
curl http://65.109.83.79:7777/rpc -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"info_get_status","params":[],"id":1}'
```

**Solution**:
- Verify `CASPER_CONTRACT_HASH` in `.env`
- Check Casper node URL is correct
- Ensure contract is deployed

---

### Issue: Frontend not showing status updates

**Check**:
```bash
# Test relayer API directly
curl http://localhost:3001/api/status/YOUR_DEPLOY_HASH
```

**Solution**:
- Verify relayer is running on port 3001
- Check browser console for CORS errors
- Ensure `VITE_RELAYER_API_URL` is set in frontend `.env`

---

### Issue: "Cannot find module 'express'"

**Solution**:
```bash
cd fulcrum-relayer
npm install
```

---

### Issue: Casper Wallet not connecting

**Solution**:
- Install Casper Wallet extension
- Switch to Casper Testnet
- Refresh the page
- Check browser console for errors

---

## ✅ Success Criteria

Your test is successful if you see:

1. ✅ Intent submitted to Casper
2. ✅ Deploy hash displayed
3. ✅ Status changes from "Pending Casper" → "Generating Proof"
4. ✅ Status changes to "Submitting to EVM"
5. ✅ Final status: "Confirmed"
6. ✅ Toast notifications at each stage
7. ✅ Intent details viewable in modal

---

## 📊 Expected Timeline

| Stage | Duration | Status |
|-------|----------|--------|
| Submit Intent | 2-5s | Pending Casper |
| Casper Finality | 5-10s | Pending Casper |
| ZK Proof Gen | 10-30s | Generating Proof |
| EVM Submission | 15-30s | Submitting to EVM |
| Confirmation | 5-10s | Confirmed |
| **Total** | **~40-85s** | ✅ |

---

## 🎥 Testing Checklist

Run through this checklist:

- [ ] Frontend loads successfully
- [ ] Relayer starts without errors
- [ ] Health endpoint responds
- [ ] Casper Wallet connects
- [ ] Intent form submits
- [ ] Deploy hash appears
- [ ] Intent shows in table
- [ ] Status updates automatically
- [ ] Toast notifications appear
- [ ] Final status is "Confirmed"
- [ ] Intent details modal works
- [ ] Relayer logs show processing

---

## 🚀 Quick Test Script

Save this as `test-flow.sh`:

```bash
#!/bin/bash

echo "🧪 Fulcrum End-to-End Test"
echo "=========================="
echo ""

# Check frontend
echo "1. Checking frontend..."
curl -s http://localhost:5173 > /dev/null && echo "✅ Frontend running" || echo "❌ Frontend not running"

# Check relayer
echo "2. Checking relayer..."
curl -s http://localhost:3001/health > /dev/null && echo "✅ Relayer running" || echo "❌ Relayer not running"

# Test API
echo "3. Testing relayer API..."
HEALTH=$(curl -s http://localhost:3001/health | jq -r '.status')
if [ "$HEALTH" = "ok" ]; then
    echo "✅ Relayer API healthy"
else
    echo "❌ Relayer API not healthy"
fi

echo ""
echo "✅ System ready for testing!"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:5173"
echo "2. Connect Casper Wallet"
echo "3. Create an intent"
echo "4. Watch the magic happen! ✨"
```

Run it:
```bash
chmod +x test-flow.sh
./test-flow.sh
```

---

## 📝 Test Report Template

After testing, document your results:

```markdown
# Fulcrum Test Report

**Date**: 2026-01-25
**Tester**: [Your Name]
**Mode**: [Mock/Testnet]

## Results

- [ ] Frontend accessible
- [ ] Relayer started
- [ ] Wallet connected
- [ ] Intent submitted
- [ ] Status updates received
- [ ] Final status: Confirmed

## Metrics

- Submit to Confirmed: XX seconds
- Deploy Hash: hash-XXXXX
- EVM Tx Hash: 0xXXXXX (if applicable)

## Issues

[List any issues encountered]

## Notes

[Additional observations]
```

---

## 🎉 Next Steps After Successful Test

Once you've verified the flow works:

1. **Deploy to Testnet**: Deploy real contracts
2. **Compile ZK Circuits**: Generate real proofs
3. **Load Testing**: Test with multiple intents
4. **Error Testing**: Test failure scenarios
5. **Performance Tuning**: Optimize polling intervals
6. **Monitoring**: Set up dashboards

---

**Ready to test? Let's go! 🚀**
