# 🧪 Fulcrum End-to-End Testing - Quick Start

## Current Status

Your frontend has been running for 13+ hours. Let's get the relayer running and test the full flow!

---

## ⚡ Quick Start (3 Steps)

### Step 1: Setup (Running Now)
The setup script is installing dependencies. Wait for it to complete.

### Step 2: Start Services

**Terminal 1 - Relayer** (New terminal):
```bash
cd /Users/nikhilsharma/Downloads/hacks/Fulcrum/fulcrum-relayer
npm run dev
```

**Terminal 2 - Frontend** (If not running):
```bash
cd /Users/nikhilsharma/Downloads/hacks/Fulcrum/fulcrum-web
npm run dev
```

### Step 3: Test
```bash
cd /Users/nikhilsharma/Downloads/hacks/Fulcrum
./test-system.sh
```

---

## 🎯 Testing Flow

### 1. Open Frontend
```
http://localhost:5173
```

### 2. Connect Wallet
- Click "Connect Wallet"
- Approve in Casper Wallet extension

### 3. Create Intent
- Click "Create Intent" button
- Fill form:
  - Action: **Transfer**
  - Chain: **Ethereum**
  - Address: `0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c`
  - Amount: `1.0`
  - Token: **ETH**
- Click "Sign & Submit"
- Approve in wallet

### 4. Watch Magic Happen! ✨

**You'll see**:
1. Toast: "Intent Submitted to Casper Network!"
2. Intent appears in table with status "Pending Casper"
3. Status updates automatically:
   - 🟡 Pending Casper (5-10s)
   - 🔵 Generating Proof (10-30s)
   - 🟡 Submitting to EVM (15-30s)
   - 🟢 Confirmed (Total: ~40-60s)

**In Relayer Terminal**:
```
[INFO] Event detected: IntentCreated
[INFO] Processing new intent
[INFO] Step 1: Fetching deploy info and signature
[INFO] Step 2: Generating ZK proof
[INFO] Step 3: Submitting transaction
[INFO] Intent executed successfully!
```

---

## 📊 What to Expect

### Timeline
| Stage | Duration | What Happens |
|-------|----------|--------------|
| Submit | 2-5s | Casper deploy created |
| Pending | 5-10s | Waiting for finality |
| Proving | 10-30s | ZK proof generation |
| Submitting | 15-30s | EVM transaction |
| Confirmed | 5-10s | Final confirmation |
| **Total** | **~40-85s** | ✅ Complete |

### Status Updates
- Frontend polls relayer every 5 seconds
- Toast notifications at each stage
- Progress bar during proof generation
- Final EVM transaction hash displayed

---

## 🔍 Verification

### Check Relayer is Working
```bash
# Health check
curl http://localhost:3001/health

# Should return:
# {"status":"ok","timestamp":"...","service":"fulcrum-relayer"}
```

### Check Status API
```bash
# After submitting an intent, check its status
curl http://localhost:3001/api/status/YOUR_DEPLOY_HASH

# Returns current status and details
```

### Check Frontend
- Open browser console (F12)
- Watch for API calls to relayer
- Check for any errors

---

## 🐛 Common Issues & Solutions

### Issue: Relayer won't start
**Error**: "Cannot find module 'express'"

**Solution**:
```bash
cd fulcrum-relayer
npm install
```

---

### Issue: Frontend not connecting to relayer
**Error**: CORS error in browser console

**Solution**: Relayer already has CORS enabled. Check:
```bash
# Verify relayer is running
curl http://localhost:3001/health
```

---

### Issue: No status updates
**Cause**: Relayer not detecting events

**Solution**: 
- Check `CASPER_CONTRACT_HASH` in `.env`
- Verify contract is deployed
- For testing, relayer will use mock mode

---

### Issue: Casper Wallet not connecting
**Solution**:
1. Install Casper Wallet extension
2. Switch to Casper Testnet
3. Refresh page
4. Try connecting again

---

## 🎮 Testing Modes

### Mode 1: Mock Mode (Recommended First)
**What**: Tests the flow without real blockchain transactions

**Setup**: Use default `.env` values
```env
CASPER_CONTRACT_HASH=hash-0000...
ETH_AVATAR_CONTRACT=0x0000...
```

**Result**: 
- ✅ Full UI flow works
- ✅ Status updates work
- ✅ No real transactions
- ✅ Perfect for demo!

---

### Mode 2: Casper Testnet
**What**: Real Casper transactions, mock EVM

**Setup**:
1. Deploy Casper contract
2. Update `CASPER_CONTRACT_HASH`
3. Keep EVM settings as mock

**Result**:
- ✅ Real Casper deploys
- ✅ Real event detection
- ✅ Mock EVM execution

---

### Mode 3: Full Integration
**What**: Real transactions on both chains

**Setup**:
1. Deploy Casper contract
2. Deploy EVM contracts
3. Compile ZK circuits
4. Update all `.env` values

**Result**:
- ✅ Complete end-to-end
- ✅ Real blockchain transactions
- ✅ Production-ready test

---

## ✅ Success Checklist

After testing, verify:

- [ ] Frontend loads at http://localhost:5173
- [ ] Relayer running at http://localhost:3001
- [ ] Casper Wallet connects
- [ ] Intent form submits successfully
- [ ] Deploy hash appears
- [ ] Intent shows in table
- [ ] Status: "Pending Casper" appears
- [ ] Status updates to "Generating Proof"
- [ ] Status updates to "Submitting to EVM"
- [ ] Final status: "Confirmed"
- [ ] Toast notifications appear
- [ ] Intent details modal opens
- [ ] Relayer logs show processing

---

## 📸 Screenshot Checklist

Capture these for documentation:

1. Dashboard page
2. Intents page with active intent
3. Create intent modal
4. Intent with "Generating Proof" status
5. Intent with "Confirmed" status
6. Intent details modal
7. Relayer terminal logs
8. Browser console (no errors)

---

## 🎬 Demo Script

Perfect for showing others:

1. **Open frontend**: "This is Fulcrum, a cross-chain intent execution protocol"
2. **Show dashboard**: "Here's the overview of the system"
3. **Navigate to Intents**: "This is where we manage cross-chain transactions"
4. **Connect wallet**: "First, we connect our Casper wallet"
5. **Create intent**: "Let's create an intent to swap on Ethereum"
6. **Submit**: "Sign with Casper wallet..."
7. **Watch status**: "Now watch the magic - the relayer detects the event..."
8. **Point to stages**: "It generates a zero-knowledge proof..."
9. **Show confirmation**: "And executes on Ethereum! All verified cryptographically."
10. **Show details**: "Here are all the details of the execution"

---

## 📊 Performance Metrics to Track

During testing, note:

- **Submit to Pending**: _____ seconds
- **Pending to Proving**: _____ seconds  
- **Proving to Submitting**: _____ seconds
- **Submitting to Confirmed**: _____ seconds
- **Total Time**: _____ seconds

**Target**: 40-85 seconds total

---

## 🚀 After Successful Test

Once everything works:

1. **Document**: Take screenshots
2. **Record**: Screen recording of the flow
3. **Deploy**: Deploy to testnets
4. **Share**: Show your team!
5. **Iterate**: Gather feedback

---

## 💡 Pro Tips

1. **Keep relayer terminal visible** - Watch the logs in real-time
2. **Open browser console** - See API calls and any errors
3. **Test multiple intents** - Submit 2-3 to see queuing
4. **Try different chains** - Test Arbitrum, Base, etc.
5. **Test error cases** - What happens if relayer stops?

---

## 🎉 You're Ready!

Everything is set up. Now:

1. Wait for setup script to finish
2. Start the relayer
3. Open the frontend
4. Create your first intent
5. Watch it execute cross-chain! ✨

**Good luck with testing! 🚀**
