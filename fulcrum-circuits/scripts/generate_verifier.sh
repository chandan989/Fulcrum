#!/bin/bash

echo "🔨 Generating Solidity Verifier Contract..."
echo "==========================================="
echo ""

CIRCUIT_NAME="ed25519_verifier"

# Check if zkey exists
if [ ! -f "build/keys/${CIRCUIT_NAME}_final.zkey" ]; then
    echo "❌ Error: ${CIRCUIT_NAME}_final.zkey not found!"
    echo "Please run the trusted setup first: npm run setup"
    exit 1
fi

echo "📝 Exporting Solidity verifier from zkey..."

npx snarkjs zkey export solidityverifier \
  build/keys/${CIRCUIT_NAME}_final.zkey \
  build/Groth16Verifier.sol

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Solidity verifier!"
    exit 1
fi

echo "✅ Solidity verifier generated!"
echo ""

# Copy to EVM contracts directory
if [ -d "../fulcrum-evm/contracts" ]; then
    cp build/Groth16Verifier.sol ../fulcrum-evm/contracts/
    echo "✅ Verifier copied to fulcrum-evm/contracts/"
    echo ""
    echo "⚠️  Note: You should replace the existing Groth16Verifier.sol"
    echo "   in fulcrum-evm/contracts with this generated version."
else
    echo "⚠️  fulcrum-evm/contracts directory not found"
fi

echo ""
echo "📁 Generated file:"
echo "  - build/Groth16Verifier.sol"
echo ""
echo "✅ Verifier generation complete!"
