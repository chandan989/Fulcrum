#!/bin/bash

echo "🚀 Fulcrum Quick Setup & Test"
echo "=============================="
echo ""

cd "$(dirname "$0")"

# Step 1: Setup Relayer
echo "📦 Step 1: Setting up Relayer..."
cd fulcrum-relayer

if [ ! -d "node_modules" ]; then
    echo "Installing relayer dependencies..."
    npm install
else
    echo "✅ Relayer dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit fulcrum-relayer/.env with your configuration"
    echo ""
    echo "For quick testing, use these minimal settings:"
    echo "CASPER_NODE_URL=http://65.109.83.79:7777/rpc"
    echo "CASPER_CONTRACT_HASH=hash-0000000000000000000000000000000000000000000000000000000000000000"
    echo "ETH_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY"
    echo "ETH_AVATAR_CONTRACT=0x0000000000000000000000000000000000000000"
    echo "ETH_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000001"
    echo ""
else
    echo "✅ .env file exists"
fi

cd ..

# Step 2: Setup Frontend
echo ""
echo "📦 Step 2: Setting up Frontend..."
cd fulcrum-web

if [ ! -f ".env" ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo "✅ Frontend .env created"
else
    echo "✅ Frontend .env exists"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 To start testing:"
echo ""
echo "Terminal 1 (Frontend):"
echo "  cd fulcrum-web"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Relayer):"
echo "  cd fulcrum-relayer"
echo "  npm run dev"
echo ""
echo "Then run: ./test-system.sh to verify both are running"
echo ""
