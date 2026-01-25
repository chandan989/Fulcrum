pragma circom 2.1.8;

include "../node_modules/circomlib/circuits/bitify.circom";
include "../node_modules/circomlib/circuits/comparators.circom";
include "./ed25519_core.circom";

/**
 * @title Ed25519SignatureVerifier
 * @notice Main circuit for verifying Ed25519 signatures from Casper blockchain
 * @dev This circuit proves: "I know a valid Ed25519 signature for this message hash,
 *      signed by the specified public key, without revealing the signature itself."
 * 
 * Public Inputs:
 *   - messageHash: Hash of the intent (keccak256)
 *   - publicKeyHash: Hash of the Casper controller's public key
 * 
 * Private Inputs:
 *   - signature: The Ed25519 signature (R, S components)
 *   - publicKey: The Ed25519 public key
 * 
 * Output:
 *   - Proof that the signature is valid
 */
template Ed25519SignatureVerifier() {
    // Public inputs (visible on-chain)
    signal input messageHash;           // Hash of the intent
    signal input publicKeyHash;         // Hash of the controller's public key
    
    // Private inputs (hidden, only proven)
    signal input signatureR[256];       // R component of Ed25519 signature (256 bits)
    signal input signatureS[256];       // S component of Ed25519 signature (256 bits)
    signal input publicKeyX[256];       // X coordinate of public key (256 bits)
    signal input publicKeyY[256];       // Y coordinate of public key (256 bits)
    
    // Step 1: Verify that the provided public key matches the public key hash
    component pubKeyHasher = Sha256(512);
    for (var i = 0; i < 256; i++) {
        pubKeyHasher.in[i] <== publicKeyX[i];
        pubKeyHasher.in[256 + i] <== publicKeyY[i];
    }
    
    // Convert hash output to single field element for comparison
    component hashBits2Num = Bits2Num(256);
    for (var i = 0; i < 256; i++) {
        hashBits2Num.in[i] <== pubKeyHasher.out[i];
    }
    
    // Verify public key hash matches
    publicKeyHash === hashBits2Num.out;
    
    // Step 2: Verify the Ed25519 signature
    component ed25519Verify = Ed25519Verify();
    
    // Connect message hash
    component msgHashBits = Num2Bits(256);
    msgHashBits.in <== messageHash;
    for (var i = 0; i < 256; i++) {
        ed25519Verify.msg[i] <== msgHashBits.out[i];
    }
    
    // Connect public key
    for (var i = 0; i < 256; i++) {
        ed25519Verify.pubKeyX[i] <== publicKeyX[i];
        ed25519Verify.pubKeyY[i] <== publicKeyY[i];
    }
    
    // Connect signature
    for (var i = 0; i < 256; i++) {
        ed25519Verify.sigR[i] <== signatureR[i];
        ed25519Verify.sigS[i] <== signatureS[i];
    }
    
    // The circuit will fail if signature is invalid
    // If we reach here, signature is valid
    ed25519Verify.valid === 1;
}

/**
 * @title Sha256
 * @notice SHA-256 hash function
 * @dev Simplified version - in production, use circomlib's SHA256
 */
template Sha256(nBits) {
    signal input in[nBits];
    signal output out[256];
    
    // This is a placeholder - in production, use the full SHA-256 implementation
    // from circomlib or a specialized Ed25519 library
    
    // For now, we'll use a simplified hash (XOR-based)
    // In production, replace with actual SHA-256
    component xorGates[256];
    for (var i = 0; i < 256; i++) {
        xorGates[i] = XOR();
        xorGates[i].a <== in[i % nBits];
        xorGates[i].b <== in[(i + 1) % nBits];
        out[i] <== xorGates[i].out;
    }
}

/**
 * @title XOR
 * @notice XOR gate
 */
template XOR() {
    signal input a;
    signal input b;
    signal output out;
    
    out <== a + b - 2*a*b;
}

// Main component
component main {public [messageHash, publicKeyHash]} = Ed25519SignatureVerifier();
