import { CasperClient, CLPublicKey, Contracts } from 'casper-js-sdk';
import { config } from '../config';
import { logger } from '../logger';

export interface IntentEvent {
    caller: string;
    targetChain: string;
    targetAddress: string;
    data: string;
    value: string;
    nonce: string;
    timestamp: string;
    deployHash: string;
    blockHash: string;
    signature?: string;
}

export class CasperEventListener {
    private client: CasperClient;
    private lastProcessedBlock: number = 0;
    private processedEvents: Set<string> = new Set();

    constructor() {
        this.client = new CasperClient(config.casper.nodeUrl);
        logger.info('CasperEventListener initialized', {
            nodeUrl: config.casper.nodeUrl,
            contractHash: config.casper.contractHash,
        });
    }

    /**
     * Start listening for IntentCreated events
     */
    async startListening(onEvent: (event: IntentEvent) => Promise<void>): Promise<void> {
        logger.info('Starting event listener...');

        setInterval(async () => {
            try {
                await this.pollForEvents(onEvent);
            } catch (error) {
                logger.error('Error polling for events', { error });
            }
        }, config.relayer.pollIntervalMs);
    }

    /**
     * Poll the Casper node for new events
     */
    private async pollForEvents(onEvent: (event: IntentEvent) => Promise<void>): Promise<void> {
        try {
            // Get latest block info
            const latestBlock = await this.client.nodeClient.getLatestBlockInfo();
            const currentBlockHeight = latestBlock.block?.header.height || 0;

            if (currentBlockHeight <= this.lastProcessedBlock) {
                return; // No new blocks
            }

            logger.debug('Checking for new events', {
                lastProcessedBlock: this.lastProcessedBlock,
                currentBlockHeight,
            });

            // Query contract state for events
            const stateRootHash = latestBlock.block?.header.state_root_hash;
            if (!stateRootHash) {
                logger.warn('No state root hash found');
                return;
            }

            // Get contract named keys to find events
            const contractHash = config.casper.contractHash.replace('hash-', '');
            const contractData = await this.client.nodeClient.getBlockState(
                stateRootHash,
                `hash-${contractHash}`,
                []
            );

            if (contractData && contractData.Account) {
                const namedKeys = contractData.Account.namedKeys;

                // Find event keys (format: event_{counter}_{event_name})
                const eventKeys = namedKeys.filter((key: any) =>
                    key.name.startsWith('event_') && key.name.includes('IntentCreated')
                );

                for (const eventKey of eventKeys) {
                    const eventId = eventKey.name;

                    // Skip if already processed
                    if (this.processedEvents.has(eventId)) {
                        continue;
                    }

                    // Read event data
                    const eventData = await this.readEventData(stateRootHash, eventKey.key);

                    if (eventData) {
                        logger.info('New IntentCreated event detected', { eventId, eventData });

                        // Mark as processed
                        this.processedEvents.add(eventId);

                        // Call the event handler
                        await onEvent(eventData);
                    }
                }
            }

            this.lastProcessedBlock = currentBlockHeight;
        } catch (error) {
            logger.error('Error in pollForEvents', { error });
        }
    }

    /**
     * Read event data from contract storage
     */
    private async readEventData(stateRootHash: string, eventKey: string): Promise<IntentEvent | null> {
        try {
            const eventDataResult = await this.client.nodeClient.getBlockState(
                stateRootHash,
                eventKey,
                []
            );

            if (!eventDataResult || !eventDataResult.CLValue) {
                return null;
            }

            // Parse the JSON event data
            const eventJson = eventDataResult.CLValue.data;
            const event = JSON.parse(eventJson);

            return {
                caller: event.caller,
                targetChain: event.target_chain,
                targetAddress: event.target_address,
                data: event.data,
                value: event.value,
                nonce: event.nonce,
                timestamp: event.timestamp,
                deployHash: event.deploy_hash || '',
                blockHash: event.block_hash || '',
                signature: event.signature,
            };
        } catch (error) {
            logger.error('Error reading event data', { error, eventKey });
            return null;
        }
    }

    /**
     * Get deploy information including signature
     */
    async getDeployInfo(deployHash: string): Promise<any> {
        try {
            const deploy = await this.client.nodeClient.getDeployInfo(deployHash);
            return deploy;
        } catch (error) {
            logger.error('Error getting deploy info', { error, deployHash });
            return null;
        }
    }

    /**
     * Extract Ed25519 signature from deploy
     */
    extractSignature(deployInfo: any): string | null {
        try {
            if (deployInfo && deployInfo.deploy && deployInfo.deploy.approvals) {
                const approval = deployInfo.deploy.approvals[0];
                if (approval && approval.signature) {
                    return approval.signature;
                }
            }
            return null;
        } catch (error) {
            logger.error('Error extracting signature', { error });
            return null;
        }
    }
}
