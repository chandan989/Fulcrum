// Relayer API Service
// Connects to the Fulcrum Relayer backend to track intent status

const RELAYER_API_URL = import.meta.env.VITE_RELAYER_API_URL || 'http://localhost:3001';

export type IntentStatus =
    | 'pending_casper'    // Waiting for Casper block finality
    | 'proving'           // Relayer is generating ZK proof
    | 'submitting_evm'    // Relayer sent tx to Ethereum
    | 'confirmed'         // Ethereum tx successful
    | 'failed';           // Transaction failed

export interface RelayerStatusResponse {
    deployHash: string;
    status: IntentStatus;
    casperBlockHeight?: number;
    casperConfirmations?: number;
    zkProofGenerated?: boolean;
    evmTxHash?: string;
    evmBlockNumber?: number;
    error?: string;
    timestamp: number;
}

export const RelayerAPI = {
    /**
     * Get the status of an intent by deploy hash
     */
    async getIntentStatus(deployHash: string): Promise<RelayerStatusResponse> {
        try {
            const response = await fetch(`${RELAYER_API_URL}/api/status/${deployHash}`);

            if (!response.ok) {
                // If intent not found in relayer, assume it's still pending on Casper
                if (response.status === 404) {
                    return {
                        deployHash,
                        status: 'pending_casper',
                        timestamp: Date.now(),
                    };
                }
                throw new Error(`Relayer API error: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching intent status:', error);
            // Fallback to pending if relayer is unreachable
            return {
                deployHash,
                status: 'pending_casper',
                timestamp: Date.now(),
            };
        }
    },

    /**
     * Poll for intent status updates
     * @param deployHash The deploy hash to track
     * @param onUpdate Callback when status changes
     * @param intervalMs Polling interval in milliseconds
     * @returns Stop function to cancel polling
     */
    pollIntentStatus(
        deployHash: string,
        onUpdate: (status: RelayerStatusResponse) => void,
        intervalMs: number = 5000
    ): () => void {
        let lastStatus: IntentStatus | null = null;
        let stopped = false;

        const poll = async () => {
            if (stopped) return;

            try {
                const status = await this.getIntentStatus(deployHash);

                // Only call onUpdate if status changed
                if (status.status !== lastStatus) {
                    lastStatus = status.status;
                    onUpdate(status);
                }

                // Stop polling if intent is in final state
                if (status.status === 'confirmed' || status.status === 'failed') {
                    stopped = true;
                    return;
                }

                // Continue polling
                if (!stopped) {
                    setTimeout(poll, intervalMs);
                }
            } catch (error) {
                console.error('Polling error:', error);
                // Continue polling even on error
                if (!stopped) {
                    setTimeout(poll, intervalMs);
                }
            }
        };

        // Start polling
        poll();

        // Return stop function
        return () => {
            stopped = true;
        };
    },

    /**
     * Get relayer health status
     */
    async getHealth(): Promise<{ status: string; timestamp: string }> {
        try {
            const response = await fetch(`${RELAYER_API_URL}/health`);
            return await response.json();
        } catch (error) {
            console.error('Relayer health check failed:', error);
            return { status: 'offline', timestamp: new Date().toISOString() };
        }
    },

    /**
     * Get relayer service status
     */
    async getServiceStatus(): Promise<any> {
        try {
            const response = await fetch(`${RELAYER_API_URL}/status`);
            return await response.json();
        } catch (error) {
            console.error('Relayer status check failed:', error);
            return { status: 'offline' };
        }
    },
};
