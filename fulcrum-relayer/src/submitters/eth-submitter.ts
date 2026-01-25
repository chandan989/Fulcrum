import { ethers } from 'ethers';
import { config } from '../config';
import { logger } from '../logger';
import { IntentEvent } from '../listeners/casper-listener';
import { ZKProof } from '../zk/proof-generator';

// Avatar contract ABI (simplified)
const AVATAR_ABI = [
    'function executeIntent(tuple(address target, uint256 value, bytes data, uint256 nonce, uint256 expiry, uint256 chainId) intent, tuple(uint256[2] a, uint256[2][2] b, uint256[2] c) proof, uint256[2] publicSignals) external returns (bool)',
    'function nonces(address avatar) external view returns (uint256)',
    'event IntentExecuted(bytes32 indexed intentHash, address indexed target)',
];

export interface ExecutionResult {
    success: boolean;
    txHash?: string;
    error?: string;
    gasUsed?: string;
}

export class TransactionSubmitter {
    private provider: ethers.JsonRpcProvider;
    private wallet: ethers.Wallet;
    private avatarContract: ethers.Contract;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(config.ethereum.rpcUrl);
        this.wallet = new ethers.Wallet(config.ethereum.privateKey, this.provider);
        this.avatarContract = new ethers.Contract(
            config.ethereum.avatarContract,
            AVATAR_ABI,
            this.wallet
        );

        logger.info('TransactionSubmitter initialized', {
            chainId: config.ethereum.chainId,
            avatarContract: config.ethereum.avatarContract,
            relayerAddress: this.wallet.address,
        });
    }

    /**
     * Submit a transaction to the target chain
     */
    async submitTransaction(
        event: IntentEvent,
        proof: ZKProof
    ): Promise<ExecutionResult> {
        try {
            logger.info('Submitting transaction to target chain', {
                targetChain: event.targetChain,
                targetAddress: event.targetAddress,
                nonce: event.nonce,
            });

            // Check relayer balance
            const balance = await this.provider.getBalance(this.wallet.address);
            logger.info('Relayer balance', {
                balance: ethers.formatEther(balance),
                address: this.wallet.address,
            });

            if (balance < ethers.parseEther('0.01')) {
                throw new Error('Insufficient relayer balance');
            }

            // Prepare intent struct
            const intent = {
                target: event.targetAddress,
                value: event.value,
                data: event.data,
                nonce: event.nonce,
                expiry: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
                chainId: config.ethereum.chainId,
            };

            // Prepare proof struct
            const proofStruct = {
                a: [proof.proof.pi_a[0], proof.proof.pi_a[1]],
                b: [
                    [proof.proof.pi_b[0][0], proof.proof.pi_b[0][1]],
                    [proof.proof.pi_b[1][0], proof.proof.pi_b[1][1]],
                ],
                c: [proof.proof.pi_c[0], proof.proof.pi_c[1]],
            };

            // Public signals
            const publicSignals = [
                proof.publicSignals[0],
                proof.publicSignals[1],
            ];

            logger.debug('Calling Avatar.executeIntent', {
                intent,
                proofStruct,
                publicSignals,
            });

            // Estimate gas
            const gasEstimate = await this.avatarContract.executeIntent.estimateGas(
                intent,
                proofStruct,
                publicSignals
            );

            logger.info('Gas estimate', { gasEstimate: gasEstimate.toString() });

            // Submit transaction
            const tx = await this.avatarContract.executeIntent(
                intent,
                proofStruct,
                publicSignals,
                {
                    gasLimit: gasEstimate * 120n / 100n, // 20% buffer
                }
            );

            logger.info('Transaction submitted', {
                txHash: tx.hash,
                from: this.wallet.address,
            });

            // Wait for confirmation
            const receipt = await tx.wait();

            logger.info('Transaction confirmed', {
                txHash: receipt.hash,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed.toString(),
                status: receipt.status,
            });

            return {
                success: receipt.status === 1,
                txHash: receipt.hash,
                gasUsed: receipt.gasUsed.toString(),
            };
        } catch (error: any) {
            logger.error('Error submitting transaction', {
                error: error.message,
                stack: error.stack,
            });

            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Get current nonce for an avatar
     */
    async getNonce(avatarAddress: string): Promise<number> {
        try {
            const nonce = await this.avatarContract.nonces(avatarAddress);
            return Number(nonce);
        } catch (error) {
            logger.error('Error getting nonce', { error, avatarAddress });
            return 0;
        }
    }

    /**
     * Check if transaction was already executed
     */
    async isExecuted(intentHash: string): Promise<boolean> {
        try {
            // Query past events to check if intent was already executed
            const filter = this.avatarContract.filters.IntentExecuted(intentHash);
            const events = await this.avatarContract.queryFilter(filter, -1000); // Last 1000 blocks

            return events.length > 0;
        } catch (error) {
            logger.error('Error checking if executed', { error, intentHash });
            return false;
        }
    }

    /**
     * Get relayer balance
     */
    async getBalance(): Promise<string> {
        const balance = await this.provider.getBalance(this.wallet.address);
        return ethers.formatEther(balance);
    }

    /**
     * Get gas price
     */
    async getGasPrice(): Promise<string> {
        const feeData = await this.provider.getFeeData();
        return ethers.formatUnits(feeData.gasPrice || 0n, 'gwei');
    }
}
