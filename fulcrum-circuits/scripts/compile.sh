#!/bin/bash

echo "🔧 Compiling Fulcrum ZK Circuits..."
echo "===================================="
echo ""

# Create build directory
mkdir -p build
mkdir -p build/circuits

# Circuit name
CIRCUIT_NAME="ed25519_verifier"

echo "📝 Step 1: Compiling circuit..."
circom circuits/${CIRCUIT_NAME}.circom \
  --r1cs \
  --wasm \
  --sym \
  --c \
  -o build/circuits

if [ $? -ne 0 ]; then
    echo "❌ Circuit compilation failed!"
    exit 1
fi

echo "✅ Circuit compiled successfully!"
echo ""

echo "📊 Circuit Statistics:"
echo "====================="

# Show circuit info
if [ -f "build/circuits/${CIRCUIT_NAME}.r1cs" ]; then
    npx snarkjs r1cs info build/circuits/${CIRCUIT_NAME}.r1cs
fi

echo ""
echo "📁 Generated files:"
echo "  - build/circuits/${CIRCUIT_NAME}.r1cs (R1CS constraints)"
echo "  - build/circuits/${CIRCUIT_NAME}.wasm (WASM for witness generation)"
echo "  - build/circuits/${CIRCUIT_NAME}.sym (Symbol table)"
echo ""

echo "✅ Compilation complete!"
echo ""
echo "Next steps:"
echo "  1. Run trusted setup: npm run setup"
echo "  2. Generate verifier: npm run generate-verifier"
