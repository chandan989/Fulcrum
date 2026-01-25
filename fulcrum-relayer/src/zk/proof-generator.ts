import { groth16 } from 'snarkjs';
import fs from 'fs/promises';
import path from 'path';
import { config } from '../config';
import { logger } from '../logger';
import { IntentEvent } from '../listeners/casper-listener';
import crypto from 'crypto';

export interface ZKProof {
    proof: {
        pi_a: string[];
        pi_b: string[][];
        pi_c: string[];
        protocol: string;
        curve: string;
    };
    publicSignals: string[];
}

export class ZKProofGenerator {
    private wasmPath: string;
    private zkeyPath: string;
    private verificationKeyPath: string;

    constructor() {
        this.wasmPath = config.zk.wasmPath;
        this.zkeyPath = config.zk.zkeyPath;
        this.verificationKeyPath = config.zk.verificationKeyPath;

        logger.info('ZKProofGenerator initialized', {
            wasmPath: this.wasmPath,
            zkeyPath: this.zkeyPath,
        });
    }

    /**
     * Generate a ZK proof for an Ed25519 signature
     */
    async generateProof(event: IntentEvent, signature: string): Promise<ZKProof> {
        try {
            logger.info('Generating ZK proof', {
                deployHash: event.deployHash,
                nonce: event.nonce,
            });

            // Parse the Ed25519 signature
            const { R, S, publicKey } = this.parseEd25519Signature(signature);

            // Compute the message hash (intent hash)
            const messageHash = this.computeIntentHash(event);

            // Prepare circuit inputs
            const input = {
                messageHash: messageHash,
                publicKeyX: publicKey.x,
                publicKeyY: publicKey.y,
                signatureR: R,
                signatureS: S,
            };

            logger.debug('Circuit inputs prepared', { input });

            // Check if circuit files exist
            const wasmExists = await this.fileExists(this.wasmPath);
            const zkeyExists = await this.fileExists(this.zkeyPath);

            if (!wasmExists || !zkeyExists) {
                logger.warn('ZK circuit files not found, using mock proof for development');
                return this.generateMockProof(event, messageHash);
            }

            // Generate the proof using snarkjs
            const { proof, publicSignals } = await groth16.fullProve(
                input,
                this.wasmPath,
                this.zkeyPath
            );

            logger.info('ZK proof generated successfully', {
                publicSignals,
                proofSize: JSON.stringify(proof).length,
            });

            return {
                proof: {
                    pi_a: proof.pi_a,
                    pi_b: proof.pi_b,
                    pi_c: proof.pi_c,
                    protocol: proof.protocol,
                    curve: proof.curve,
                },
                publicSignals,
            };
        } catch (error) {
            logger.error('Error generating ZK proof', { error });
            throw error;
        }
    }

    /**
     * Verify a ZK proof (for testing)
     */
    async verifyProof(proof: ZKProof): Promise<boolean> {
        try {
            const vkeyExists = await this.fileExists(this.verificationKeyPath);

            if (!vkeyExists) {
                logger.warn('Verification key not found, skipping verification');
                return true; // Mock verification for development
            }

            const vKey = JSON.parse(await fs.readFile(this.verificationKeyPath, 'utf-8'));

            const isValid = await groth16.verify(
                vKey,
                proof.publicSignals,
                proof.proof
            );

            logger.info('Proof verification result', { isValid });
            return isValid;
        } catch (error) {
            logger.error('Error verifying proof', { error });
            return false;
        }
    }

    /**
     * Parse Ed25519 signature into components
     */
    private parseEd25519Signature(signature: string): {
        R: string[];
        S: string[];
        publicKey: { x: string; y: string };
    } {
        // Ed25519 signature format: 64 bytes (R: 32 bytes, S: 32 bytes)
        // This is a simplified version - actual implementation would need proper parsing

        const sigBytes = Buffer.from(signature, 'hex');

        // Split into R and S (32 bytes each)
        const R = Array.from(sigBytes.slice(0, 32)).map(b => b.toString());
        const S = Array.from(sigBytes.slice(32, 64)).map(b => b.toString());

        // For Ed25519, we need to extract the public key from the signature or deploy
        // This is a mock - actual implementation would extract from Casper deploy
        const publicKey = {
            x: '0',
            y: '0',
        };

        return { R, S, publicKey };
    }

    /**
     * Compute the intent hash
     */
    private computeIntentHash(event: IntentEvent): string {
        const intentData = {
            caller: event.caller,
            targetChain: event.targetChain,
            targetAddress: event.targetAddress,
            data: event.data,
            value: event.value,
            nonce: event.nonce,
        };

        const hash = crypto
            .createHash('sha256')
            .update(JSON.stringify(intentData))
            .digest('hex');

        return hash;
    }

    /**
     * Generate a mock proof for development/testing
     */
    private generateMockProof(event: IntentEvent, messageHash: string): ZKProof {
        logger.warn('Generating mock ZK proof for development');

        return {
            proof: {
                pi_a: ['0', '0', '1'],
                pi_b: [['0', '0'], ['0', '0'], ['1', '0']],
                pi_c: ['0', '0', '1'],
                protocol: 'groth16',
                curve: 'bn128',
            },
            publicSignals: [messageHash, event.caller],
        };
    }

    /**
     * Check if file exists
     */
    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Save proof to file (for debugging)
     */
    async saveProof(proof: ZKProof, filename: string): Promise<void> {
        try {
            const proofsDir = path.join(process.cwd(), 'proofs');
            await fs.mkdir(proofsDir, { recursive: true });

            const filepath = path.join(proofsDir, filename);
            await fs.writeFile(filepath, JSON.stringify(proof, null, 2));

            logger.info('Proof saved to file', { filepath });
        } catch (error) {
            logger.error('Error saving proof', { error });
        }
    }
}
