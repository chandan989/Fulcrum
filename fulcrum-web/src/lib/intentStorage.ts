// Intent Storage and Management
import type { IntentStatus } from './relayerAPI';

export interface StoredIntent {
    id: string;
    deployHash: string;
    timestamp: number;
    status: IntentStatus;
    chain: string;
    action: string;
    target: string;
    value: string;
    targetChain: number;
    targetAddress: string;
    data: string;
    evmTxHash?: string;
    evmBlockNumber?: number;
    error?: string;
}

const INTENTS_STORAGE_KEY = 'fulcrum_intents';

export const IntentStorage = {
    // Get all stored intents
    getAll(): StoredIntent[] {
        const stored = localStorage.getItem(INTENTS_STORAGE_KEY);
        if (!stored) return [];
        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    },

    // Add a new intent
    add(intent: Omit<StoredIntent, 'id' | 'timestamp'>): StoredIntent {
        const newIntent: StoredIntent = {
            ...intent,
            id: `INT-${Date.now()}`,
            timestamp: Date.now(),
        };

        const intents = this.getAll();
        intents.unshift(newIntent); // Add to beginning
        localStorage.setItem(INTENTS_STORAGE_KEY, JSON.stringify(intents));

        return newIntent;
    },

    // Update intent status (now called from relayer API polling)
    updateStatus(
        deployHash: string,
        status: IntentStatus,
        additionalData?: {
            evmTxHash?: string;
            evmBlockNumber?: number;
            error?: string;
        }
    ) {
        const intents = this.getAll();
        const index = intents.findIndex(i => i.deployHash === deployHash);

        if (index !== -1) {
            intents[index].status = status;
            if (additionalData) {
                Object.assign(intents[index], additionalData);
            }
            localStorage.setItem(INTENTS_STORAGE_KEY, JSON.stringify(intents));
        }
    },

    // Get intent by deploy hash
    getByDeployHash(deployHash: string): StoredIntent | undefined {
        return this.getAll().find(i => i.deployHash === deployHash);
    },

    // Clear all intents
    clear() {
        localStorage.removeItem(INTENTS_STORAGE_KEY);
    },

    // Get recent intents (last 24 hours)
    getRecent(): StoredIntent[] {
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        return this.getAll().filter(i => i.timestamp > oneDayAgo);
    },

    // Get stats
    getStats() {
        const intents = this.getRecent();
        return {
            pending_casper: intents.filter(i => i.status === 'pending_casper').length,
            proving: intents.filter(i => i.status === 'proving').length,
            submitting_evm: intents.filter(i => i.status === 'submitting_evm').length,
            confirmed: intents.filter(i => i.status === 'confirmed').length,
            failed: intents.filter(i => i.status === 'failed').length,
            total: intents.length,
        };
    }
};
