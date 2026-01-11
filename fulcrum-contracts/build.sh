#!/bin/bash
echo "=== Fulcrum Contract Builder ==="

# 1. Check for Cargo
if ! command -v cargo &> /dev/null
then
    echo "❌ Error: Rust (cargo) is not installed or not in your PATH."
    echo "To install Rust, run this command:"
    echo "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
    echo ""
    echo "After installing, RESTART your terminal and try running this script again."
    exit 1
fi

# 2. Add Wasm Target
echo "🛠️  Adding wasm32-unknown-unknown target..."
rustup target add wasm32-unknown-unknown

# 3. Build
echo "🚀 Building contract..."
cd contract
cargo build --release --target wasm32-unknown-unknown

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build Successful!"
    echo "The WASM file is ready at:"
    echo "$(pwd)/target/wasm32-unknown-unknown/release/contract.wasm"
    echo ""
    echo "NEXT STEP: Upload this file to https://testnet.cspr.live/tools/deploy"
else
    echo "❌ Build Failed. See errors above."
fi
