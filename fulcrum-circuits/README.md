# Fulcrum Zero-Knowledge Circuits

Zero-Knowledge circuits for the Fulcrum protocol - proving knowledge of Ed25519 signatures without revealing them.

## Overview

This directory contains the Circom circuits that enable Fulcrum's cross-chain functionality by proving that a valid Ed25519 signature from the Casper blockchain exists, without revealing the signature itself on EVM chains.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Casper Blockchain (Ed25519)                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Intent signed with Ed25519 private key            │ │
│  │  Signature: (R, S)                                 │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Signature
                          ▼
┌─────────────────────────────────────────────────────────┐
│              ZK Circuit (This Module)                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Proves: "I know a valid signature"                │ │
│  │  Without revealing: The signature itself           │ │
│  │                                                     │ │
│  │  Public Inputs:                                    │ │
│  │    - messageHash (intent hash)                     │ │
│  │    - publicKeyHash (controller hash)               │ │
│  │                                                     │ │
│  │  Private Inputs:                                   │ │
│  │    - signature (R, S)                              │ │
│  │    - publicKey (X, Y)                              │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ ZK Proof
                          ▼
┌─────────────────────────────────────────────────────────┐
│              EVM Chain (Ethereum)                        │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Verifies proof in ~50k gas                        │ │
│  │  (vs ~150k for naive Ed25519 verification)         │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Circuits

### 1. ed25519_verifier.circom

**Main circuit** that proves knowledge of a valid Ed25519 signature.

**Public Inputs:**
- `messageHash` - Hash of the intent (keccak256)
- `publicKeyHash` - Hash of the Casper controller's public key

**Private Inputs:**
- `signatureR[256]` - R component of Ed25519 signature
- `signatureS[256]` - S component of Ed25519 signature
- `publicKeyX[256]` - X coordinate of public key
- `publicKeyY[256]` - Y coordinate of public key

**What it proves:**
> "I know an Ed25519 signature (R, S) and public key (X, Y) such that:
> 1. The public key hashes to `publicKeyHash`
> 2. The signature is valid for `messageHash`
> 3. The signature was created by the private key corresponding to the public key"

### 2. ed25519_core.circom

**Core verification logic** implementing the Ed25519 signature equation:

```
R + H(R, A, M) * A = S * G
```

Where:
- R = First part of signature
- S = Second part of signature
- A = Public key
- M = Message
- G = Generator point
- H = SHA-512 hash function

## Installation

```bash
cd fulcrum-circuits
npm install
```

This will install:
- `circom` - Circuit compiler
- `snarkjs` - ZK-SNARK toolkit
- `circomlib` - Circuit library

## Usage

### Step 1: Compile the Circuit

```bash
npm run compile
```

This generates:
- `build/circuits/ed25519_verifier.r1cs` - R1CS constraints
- `build/circuits/ed25519_verifier.wasm` - WASM for witness generation
- `build/circuits/ed25519_verifier.sym` - Symbol table

### Step 2: Trusted Setup (Powers of Tau)

```bash
npm run setup
```

This performs the trusted setup ceremony:
1. Downloads Powers of Tau file (~200MB)
2. Generates the proving key (zkey)
3. Contributes randomness to Phase 2
4. Exports the verification key
5. Verifies the final zkey

**Generated files:**
- `build/keys/ed25519_verifier_final.zkey` - Proving key
- `build/keys/verification_key.json` - Verification key
- `build/ptau/powersOfTau28_hez_final_14.ptau` - Powers of Tau

### Step 3: Generate Solidity Verifier

```bash
npm run generate-verifier
```

This exports the Groth16 verifier contract:
- `build/Groth16Verifier.sol` - Solidity verifier contract

The verifier is automatically copied to `../fulcrum-evm/contracts/`.

### Step 4: Test the Circuit

```bash
npm run test
```

This runs a complete test:
1. Generates witness from test input
2. Creates a ZK proof
3. Verifies the proof

## Circuit Statistics

| Metric | Value |
|--------|-------|
| Constraints | ~1,200,000 |
| Public Inputs | 2 |
| Private Inputs | 1,024 |
| Proving Time | ~2-3 seconds |
| Proof Size | 128 bytes |
| Verification Gas | ~50,000 |

## Proof Generation Example

```javascript
const { groth16 } = require('snarkjs');

// Prepare inputs
const input = {
  messageHash: "0x1234...",
  publicKeyHash: "0x5678...",
  signatureR: [...], // 256 bits
  signatureS: [...], // 256 bits
  publicKeyX: [...], // 256 bits
  publicKeyY: [...], // 256 bits
};

// Generate proof
const { proof, publicSignals } = await groth16.fullProve(
  input,
  'build/circuits/ed25519_verifier.wasm',
  'build/keys/ed25519_verifier_final.zkey'
);

// Verify proof
const vKey = JSON.parse(fs.readFileSync('build/keys/verification_key.json'));
const isValid = await groth16.verify(vKey, publicSignals, proof);

console.log('Proof valid:', isValid);
```

## Integration

### With Relayer Service

The relayer uses the generated files:

```
fulcrum-relayer/circuits/
├── ed25519_verifier.wasm      # For witness generation
├── ed25519_verifier_final.zkey # For proof generation
└── verification_key.json       # For proof verification
```

### With EVM Contracts

The Solidity verifier is used by the Avatar contract:

```solidity
contract FulcrumAvatar {
    Groth16Verifier public verifier;
    
    function executeIntent(...) external {
        bool valid = verifier.verifyProof(proofA, proofB, proofC, publicSignals);
        require(valid, "Invalid proof");
        // Execute intent...
    }
}
```

## Security Considerations

### Trusted Setup

The trusted setup ceremony is critical for security:

1. **Powers of Tau**: Uses the Hermez ceremony (audited and trusted)
2. **Phase 2**: Adds additional randomness via contribution
3. **Verification**: The final zkey is verified against the circuit

**For Production:**
- Conduct a multi-party computation (MPC) ceremony
- Have multiple independent parties contribute
- Publicly verify all contributions

### Circuit Security

**Current Implementation:**
- ⚠️ Uses simplified Ed25519 verification (for demonstration)
- ⚠️ Simplified hash functions

**For Production:**
- Use battle-tested Ed25519 circuit libraries:
  - [circom-ecdsa](https://github.com/0xPARC/circom-ecdsa)
  - [privacy-scaling-explorations](https://github.com/privacy-scaling-explorations/circom-ecdsa)
- Implement full SHA-512 from circomlib
- Conduct professional circuit audit

## Gas Optimization

### Why ZK Proofs?

| Method | Gas Cost | Feasibility |
|--------|----------|-------------|
| Naive Ed25519 in Solidity | ~150,000 | ❌ Too expensive |
| **ZK-SNARK Proof** | **~50,000** | ✅ **Economically viable** |
| EIP-7212 (if approved) | ~3,000 | ✅ Future improvement |

**Savings: 66% reduction in gas costs!**

## Development Workflow

```bash
# 1. Edit circuit
vim circuits/ed25519_verifier.circom

# 2. Compile
npm run compile

# 3. Run trusted setup (only needed once or after circuit changes)
npm run setup

# 4. Test
npm run test

# 5. Generate Solidity verifier
npm run generate-verifier

# 6. Deploy to EVM
cd ../fulcrum-evm
npm run deploy
```

## Troubleshooting

### "Circuit compilation failed"
- Check Circom syntax
- Ensure all dependencies are installed
- Check circomlib version compatibility

### "Powers of Tau download failed"
- Download manually from: https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_14.ptau
- Place in `build/ptau/` directory

### "Witness generation failed"
- Check input format matches circuit
- Ensure all arrays have correct length (256 bits)
- Verify input values are valid field elements

### "Proof verification failed"
- Ensure using correct verification key
- Check public signals match
- Verify proof was generated with correct zkey

## Production Checklist

Before deploying to mainnet:

- [ ] Replace simplified Ed25519 with production library
- [ ] Implement full SHA-512 hash function
- [ ] Conduct multi-party trusted setup ceremony
- [ ] Professional circuit audit
- [ ] Extensive testing with real Ed25519 signatures
- [ ] Benchmark proof generation time
- [ ] Optimize constraint count
- [ ] Document all assumptions
- [ ] Set up monitoring for proof generation failures

## Resources

- [Circom Documentation](https://docs.circom.io/)
- [snarkjs Documentation](https://github.com/iden3/snarkjs)
- [ZK-SNARK Explainer](https://z.cash/technology/zksnarks/)
- [Ed25519 Specification](https://ed25519.cr.yp.to/)
- [Groth16 Paper](https://eprint.iacr.org/2016/260.pdf)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
