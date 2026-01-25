#!/bin/bash

echo "🔐 Fulcrum ZK Circuit - Trusted Setup (Powers of Tau)"
echo "======================================================"
echo ""

CIRCUIT_NAME="ed25519_verifier"
PTAU_FILE="powersOfTau28_hez_final_14.ptau"

# Create directories
mkdir -p build/ptau
mkdir -p build/keys

echo "This script will perform the trusted setup for the Fulcrum ZK circuit."
echo "The process involves:"
echo "  1. Downloading Powers of Tau ceremony file (if needed)"
echo "  2. Generating the proving key (zkey)"
echo "  3. Exporting the verification key"
echo ""

# Step 1: Download Powers of Tau file if not exists
if [ ! -f "build/ptau/${PTAU_FILE}" ]; then
    echo "📥 Step 1: Downloading Powers of Tau file..."
    echo "This may take a few minutes..."
    
    # Download from Hermez ceremony
    wget -O build/ptau/${PTAU_FILE} \
      https://hermez.s3-eu-west-1.amazonaws.com/${PTAU_FILE}
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to download Powers of Tau file!"
        echo "You can manually download it from:"
        echo "https://github.com/iden3/snarkjs#7-prepare-phase-2"
        exit 1
    fi
    
    echo "✅ Powers of Tau file downloaded!"
else
    echo "✅ Step 1: Powers of Tau file already exists"
fi

echo ""

# Step 2: Generate zkey (Phase 2)
echo "🔑 Step 2: Generating proving key (Phase 2)..."
echo "This may take several minutes..."

npx snarkjs groth16 setup \
  build/circuits/${CIRCUIT_NAME}.r1cs \
  build/ptau/${PTAU_FILE} \
  build/keys/${CIRCUIT_NAME}_0000.zkey

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate initial zkey!"
    exit 1
fi

echo "✅ Initial zkey generated!"
echo ""

# Step 3: Contribute to Phase 2 ceremony
echo "🎲 Step 3: Contributing to Phase 2 ceremony..."
echo "Enter some random text (this adds entropy):"

npx snarkjs zkey contribute \
  build/keys/${CIRCUIT_NAME}_0000.zkey \
  build/keys/${CIRCUIT_NAME}_final.zkey \
  --name="Fulcrum Contribution" \
  -v

if [ $? -ne 0 ]; then
    echo "❌ Failed to contribute to ceremony!"
    exit 1
fi

echo "✅ Phase 2 contribution complete!"
echo ""

# Step 4: Export verification key
echo "📤 Step 4: Exporting verification key..."

npx snarkjs zkey export verificationkey \
  build/keys/${CIRCUIT_NAME}_final.zkey \
  build/keys/verification_key.json

if [ $? -ne 0 ]; then
    echo "❌ Failed to export verification key!"
    exit 1
fi

echo "✅ Verification key exported!"
echo ""

# Step 5: Verify the final zkey
echo "✔️  Step 5: Verifying the final zkey..."

npx snarkjs zkey verify \
  build/circuits/${CIRCUIT_NAME}.r1cs \
  build/ptau/${PTAU_FILE} \
  build/keys/${CIRCUIT_NAME}_final.zkey

if [ $? -ne 0 ]; then
    echo "❌ zkey verification failed!"
    exit 1
fi

echo "✅ zkey verified successfully!"
echo ""

# Summary
echo "📋 Trusted Setup Summary:"
echo "========================="
echo "Circuit: ${CIRCUIT_NAME}"
echo ""
echo "Generated files:"
echo "  - build/keys/${CIRCUIT_NAME}_final.zkey (Proving key)"
echo "  - build/keys/verification_key.json (Verification key)"
echo "  - build/ptau/${PTAU_FILE} (Powers of Tau)"
echo ""

# Copy files to relayer and EVM directories
echo "📦 Copying files to other modules..."

# Copy to relayer
if [ -d "../fulcrum-relayer/circuits" ]; then
    cp build/circuits/${CIRCUIT_NAME}_js/${CIRCUIT_NAME}.wasm ../fulcrum-relayer/circuits/
    cp build/keys/${CIRCUIT_NAME}_final.zkey ../fulcrum-relayer/circuits/
    cp build/keys/verification_key.json ../fulcrum-relayer/circuits/
    echo "✅ Files copied to fulcrum-relayer/circuits/"
else
    echo "⚠️  fulcrum-relayer/circuits directory not found"
fi

echo ""
echo "✅ Trusted setup complete!"
echo ""
echo "Next steps:"
echo "  1. Generate Solidity verifier: npm run generate-verifier"
echo "  2. Test the circuit: npm run test"
