#!/bin/bash

echo "🚀 Fulcrum Relayer - Quick Start Script"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
    echo ""
    echo "Required configuration:"
    echo "  - CASPER_CONTRACT_HASH"
    echo "  - ETH_RPC_URL"
    echo "  - ETH_AVATAR_CONTRACT"
    echo "  - ETH_PRIVATE_KEY"
    echo ""
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Create logs directory
mkdir -p logs
mkdir -p proofs

echo "✅ Setup complete!"
echo ""
echo "Starting relayer in development mode..."
echo "Press Ctrl+C to stop"
echo ""

npm run dev
