import { CasperEventListener, IntentEvent } from '../listeners/casper-listener';
import { ZKProofGenerator } from '../zk/proof-generator';
import { TransactionSubmitter } from '../submitters/eth-submitter';
import { logger } from '../logger';
import { updateIntentStatus } from '../index';

export class RelayerService {
    private eventListener: CasperEventListener;
    private proofGenerator: ZKProofGenerator;
    private txSubmitter: TransactionSubmitter;
    private processing: Set<string> = new Set();

    constructor() {
        this.eventListener = new CasperEventListener();
        this.proofGenerator = new ZKProofGenerator();
        this.txSubmitter = new TransactionSubmitter();

        logger.info('RelayerService initialized');
    }

    /**
     * Start the relayer service
     */
    async start(): Promise<void> {
        logger.info('Starting Fulcrum Relayer Service...');

        // Display relayer info
        await this.displayRelayerInfo();

        // Start listening for events
        await this.eventListener.startListening(async (event) => {
            await this.handleIntent(event);
        });

        logger.info('Relayer service is now running');
    }

    /**
     * Handle a new intent event
     */
    private async handleIntent(event: IntentEvent): Promise<void> {
        const eventId = `${event.deployHash}-${event.nonce}`;

        // Prevent duplicate processing
        if (this.processing.has(eventId)) {
            logger.debug('Event already being processed', { eventId });
            return;
        }

        this.processing.add(eventId);

        try {
            logger.info('Processing new intent', {
                eventId,
                caller: event.caller,
                targetChain: event.targetChain,
                targetAddress: event.targetAddress,
                nonce: event.nonce,
            });

            // Update status: pending_casper (event detected)
            updateIntentStatus(event.deployHash, {
                status: 'pending_casper',
                casperBlockHeight: 0,
                casperConfirmations: 0,
            });

            // Step 1: Get deploy info and extract signature
            logger.info('Step 1: Fetching deploy info and signature');
            const deployInfo = await this.eventListener.getDeployInfo(event.deployHash);

            if (!deployInfo) {
                throw new Error('Failed to fetch deploy info');
            }

            const signature = this.eventListener.extractSignature(deployInfo);

            if (!signature) {
                throw new Error('Failed to extract signature from deploy');
            }

            logger.info('Signature extracted', { signature: signature.substring(0, 20) + '...' });

            // Update status: proving (starting ZK proof generation)
            updateIntentStatus(event.deployHash, {
                status: 'proving',
                zkProofGenerated: false,
            });

            // Step 2: Generate ZK proof
            logger.info('Step 2: Generating ZK proof');
            const proof = await this.proofGenerator.generateProof(event, signature);

            // Save proof for debugging
            await this.proofGenerator.saveProof(proof, `proof_${eventId}.json`);

            // Verify proof (optional, for testing)
            const isValid = await this.proofGenerator.verifyProof(proof);
            if (!isValid) {
                throw new Error('Generated proof is invalid');
            }

            logger.info('ZK proof generated and verified', {
                publicSignals: proof.publicSignals,
            });

            // Update status: submitting_evm (proof ready, submitting to EVM)
            updateIntentStatus(event.deployHash, {
                status: 'submitting_evm',
                zkProofGenerated: true,
            });

            // Step 3: Submit transaction to target chain
            logger.info('Step 3: Submitting transaction to target chain');
            const result = await this.txSubmitter.submitTransaction(event, proof);

            if (result.success) {
                // Update status: confirmed (transaction successful)
                updateIntentStatus(event.deployHash, {
                    status: 'confirmed',
                    evmTxHash: result.txHash,
                    gasUsed: result.gasUsed,
                });

                logger.info('Intent executed successfully!', {
                    eventId,
                    txHash: result.txHash,
                    gasUsed: result.gasUsed,
                });
            } else {
                // Update status: failed
                updateIntentStatus(event.deployHash, {
                    status: 'failed',
                    error: result.error,
                });

                logger.error('Intent execution failed', {
                    eventId,
                    error: result.error,
                });
            }
        } catch (error: any) {
            // Update status: failed
            updateIntentStatus(event.deployHash, {
                status: 'failed',
                error: error.message,
            });

            logger.error('Error handling intent', {
                eventId,
                error: error.message,
                stack: error.stack,
            });
        } finally {
            this.processing.delete(eventId);
        }
    }

    /**
     * Display relayer information
     */
    private async displayRelayerInfo(): Promise<void> {
        try {
            const balance = await this.txSubmitter.getBalance();
            const gasPrice = await this.txSubmitter.getGasPrice();

            logger.info('Relayer Information', {
                balance: `${balance} ETH`,
                gasPrice: `${gasPrice} gwei`,
            });
        } catch (error) {
            logger.error('Error fetching relayer info', { error });
        }
    }

    /**
     * Stop the relayer service
     */
    async stop(): Promise<void> {
        logger.info('Stopping Fulcrum Relayer Service...');
        // Cleanup logic here
        logger.info('Relayer service stopped');
    }
}
