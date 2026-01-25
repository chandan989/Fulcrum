#!/bin/bash

echo "🧪 Fulcrum End-to-End Test Script"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check frontend
echo "1️⃣  Checking frontend..."
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend running on http://localhost:5173${NC}"
else
    echo -e "${RED}❌ Frontend not running${NC}"
    echo "   Start with: cd fulcrum-web && npm run dev"
fi

echo ""

# Check relayer
echo "2️⃣  Checking relayer..."
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Relayer running on http://localhost:3001${NC}"
    
    # Get health status
    HEALTH=$(curl -s http://localhost:3001/health)
    echo "   Health: $HEALTH"
else
    echo -e "${RED}❌ Relayer not running${NC}"
    echo "   Start with: cd fulcrum-relayer && npm run dev"
fi

echo ""

# Check if relayer dependencies installed
echo "3️⃣  Checking relayer dependencies..."
if [ -d "fulcrum-relayer/node_modules" ]; then
    echo -e "${GREEN}✅ Relayer dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Relayer dependencies not installed${NC}"
    echo "   Install with: cd fulcrum-relayer && npm install"
fi

echo ""

# Check relayer .env
echo "4️⃣  Checking relayer configuration..."
if [ -f "fulcrum-relayer/.env" ]; then
    echo -e "${GREEN}✅ Relayer .env file exists${NC}"
else
    echo -e "${YELLOW}⚠️  Relayer .env file not found${NC}"
    echo "   Create with: cd fulcrum-relayer && cp .env.example .env"
fi

echo ""

# Summary
echo "📋 System Status Summary"
echo "========================"

FRONTEND_OK=$(curl -s http://localhost:5173 > /dev/null 2>&1 && echo "1" || echo "0")
RELAYER_OK=$(curl -s http://localhost:3001/health > /dev/null 2>&1 && echo "1" || echo "0")

if [ "$FRONTEND_OK" = "1" ] && [ "$RELAYER_OK" = "1" ]; then
    echo -e "${GREEN}✅ System ready for testing!${NC}"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Open http://localhost:5173 in your browser"
    echo "   2. Connect your Casper Wallet"
    echo "   3. Click 'Create Intent'"
    echo "   4. Fill in the form and submit"
    echo "   5. Watch real-time status updates! ✨"
elif [ "$FRONTEND_OK" = "1" ]; then
    echo -e "${YELLOW}⚠️  Frontend ready, but relayer needs to be started${NC}"
    echo ""
    echo "Start relayer:"
    echo "   cd fulcrum-relayer"
    echo "   npm install  # if not done"
    echo "   cp .env.example .env  # if not done"
    echo "   npm run dev"
elif [ "$RELAYER_OK" = "1" ]; then
    echo -e "${YELLOW}⚠️  Relayer ready, but frontend needs to be started${NC}"
    echo ""
    echo "Frontend should already be running..."
    echo "Check: http://localhost:5173"
else
    echo -e "${RED}❌ Both services need to be started${NC}"
    echo ""
    echo "Terminal 1 - Start frontend:"
    echo "   cd fulcrum-web"
    echo "   npm run dev"
    echo ""
    echo "Terminal 2 - Start relayer:"
    echo "   cd fulcrum-relayer"
    echo "   npm install"
    echo "   cp .env.example .env"
    echo "   npm run dev"
fi

echo ""
