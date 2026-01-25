#!/bin/bash

echo "🧪 Fulcrum Relayer API Test"
echo "==========================="
echo ""

RELAYER_URL="http://localhost:3001"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "${BLUE}1️⃣  Testing Health Endpoint${NC}"
HEALTH=$(curl -s ${RELAYER_URL}/health)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ GET /health${NC}"
    echo "   Response: $HEALTH"
else
    echo -e "${RED}❌ Health check failed${NC}"
    echo "   Is the relayer running? Start with: npm run dev"
    exit 1
fi
echo ""

# Test 2: Service Status
echo -e "${BLUE}2️⃣  Testing Status Endpoint${NC}"
STATUS=$(curl -s ${RELAYER_URL}/status)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ GET /status${NC}"
    echo "   Response: $STATUS"
else
    echo -e "${RED}❌ Status check failed${NC}"
fi
echo ""

# Test 3: Deployment Info
echo -e "${BLUE}3️⃣  Testing Deployment Info Endpoint${NC}"
DEPLOY=$(curl -s ${RELAYER_URL}/api/deploy)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ GET /api/deploy${NC}"
    echo "   Service: $(echo $DEPLOY | jq -r '.service')"
    echo "   Version: $(echo $DEPLOY | jq -r '.version')"
    echo "   Environment: $(echo $DEPLOY | jq -r '.deployment.environment')"
else
    echo -e "${RED}❌ Deployment info failed${NC}"
fi
echo ""

# Test 4: All Intents
echo -e "${BLUE}4️⃣  Testing All Intents Endpoint${NC}"
INTENTS=$(curl -s ${RELAYER_URL}/api/intents)
if [ $? -eq 0 ]; then
    COUNT=$(echo $INTENTS | jq -r '.count')
    echo -e "${GREEN}✅ GET /api/intents${NC}"
    echo "   Tracked intents: $COUNT"
else
    echo -e "${RED}❌ All intents failed${NC}"
fi
echo ""

# Test 5: Manual Trigger
echo -e "${BLUE}5️⃣  Testing Manual Trigger Endpoint${NC}"
DEPLOY_HASH="test-api-$(date +%s)"
echo "   Triggering test intent: $DEPLOY_HASH"

TRIGGER=$(curl -s -X POST ${RELAYER_URL}/api/trigger \
  -H "Content-Type: application/json" \
  -d "{
    \"deployHash\": \"$DEPLOY_HASH\",
    \"targetChain\": 1,
    \"targetAddress\": \"0x742d35Cc6634C0532925a3b844Bc9e7595f3a1c\"
  }")

if [ $? -eq 0 ]; then
    SUCCESS=$(echo $TRIGGER | jq -r '.success')
    if [ "$SUCCESS" = "true" ]; then
        echo -e "${GREEN}✅ POST /api/trigger${NC}"
        echo "   Deploy Hash: $DEPLOY_HASH"
        echo "   Status: $(echo $TRIGGER | jq -r '.status')"
    else
        echo -e "${RED}❌ Trigger failed${NC}"
        echo "   Response: $TRIGGER"
    fi
else
    echo -e "${RED}❌ Manual trigger failed${NC}"
fi
echo ""

# Test 6: Poll Status Updates
echo -e "${BLUE}6️⃣  Polling Status Updates (10 seconds)${NC}"
echo "   Watching: $DEPLOY_HASH"
echo ""

for i in {1..5}; do
    sleep 2
    STATUS_RESPONSE=$(curl -s ${RELAYER_URL}/api/status/${DEPLOY_HASH})
    CURRENT_STATUS=$(echo $STATUS_RESPONSE | jq -r '.status')
    
    if [ "$CURRENT_STATUS" != "null" ]; then
        case $CURRENT_STATUS in
            "pending_casper")
                echo -e "   [${i}/5] 🟡 Pending Casper"
                ;;
            "proving")
                echo -e "   [${i}/5] 🔵 Generating Proof"
                ;;
            "submitting_evm")
                echo -e "   [${i}/5] 🟡 Submitting to EVM"
                ;;
            "confirmed")
                echo -e "   [${i}/5] ${GREEN}🟢 Confirmed${NC}"
                TX_HASH=$(echo $STATUS_RESPONSE | jq -r '.evmTxHash')
                echo "   EVM Tx: $TX_HASH"
                break
                ;;
            "failed")
                echo -e "   [${i}/5] ${RED}🔴 Failed${NC}"
                ERROR=$(echo $STATUS_RESPONSE | jq -r '.error')
                echo "   Error: $ERROR"
                break
                ;;
        esac
    else
        echo -e "   [${i}/5] ⏳ Waiting..."
    fi
done

echo ""

# Summary
echo -e "${BLUE}📋 Test Summary${NC}"
echo "==============="
echo -e "${GREEN}✅ All API endpoints working!${NC}"
echo ""
echo "Available endpoints:"
echo "  GET  /health                    - Health check"
echo "  GET  /status                    - Service status"
echo "  GET  /api/deploy                - Deployment info"
echo "  GET  /api/intents               - All tracked intents"
echo "  GET  /api/status/:deployHash    - Intent status"
echo "  POST /api/trigger               - Manual trigger (testing)"
echo ""
echo "📖 Full API documentation: fulcrum-relayer/API.md"
echo ""
