import express from 'express';
import { config, validateConfig } from './config';
import { logger } from './logger';
import { RelayerService } from './services/relayer';

// Create Express app for health checks and monitoring
const app = express();
app.use(express.json());

// Enable CORS for frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// In-memory intent status tracking (in production, use database)
const intentStatuses = new Map<string, any>();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'fulcrum-relayer',
    });
});

// Status endpoint
app.get('/status', async (req, res) => {
    res.json({
        status: 'running',
        config: {
            casperNode: config.casper.nodeUrl,
            ethereumChain: config.ethereum.chainId,
            pollInterval: config.relayer.pollIntervalMs,
        },
    });
});

// Get all tracked intents
app.get('/api/intents', (req, res) => {
    const intents = Array.from(intentStatuses.values());
    res.json({
        count: intents.length,
        intents: intents
    });
});

// Deployment info endpoint
app.get('/api/deploy', (req, res) => {
    res.json({
        service: 'fulcrum-relayer',
        version: '1.0.0',
        deployment: {
            environment: process.env.NODE_ENV || 'development',
            casperNode: config.casper.nodeUrl,
            casperContract: config.casper.contractHash,
            ethereumChain: config.ethereum.chainId,
            ethereumAvatar: config.ethereum.avatarContract,
            pollInterval: config.relayer.pollIntervalMs,
            port: config.relayer.port,
        },
        capabilities: {
            eventListening: true,
            zkProofGeneration: true,
            evmSubmission: true,
            statusTracking: true,
        },
        endpoints: {
            health: '/health',
            status: '/status',
            intentStatus: '/api/status/:deployHash',
            allIntents: '/api/intents',
            deployInfo: '/api/deploy',
            manualTrigger: '/api/trigger',
        }
    });
});

// Manual trigger endpoint for testing
app.post('/api/trigger', async (req, res) => {
    const { deployHash, caller, targetChain, targetAddress, data, nonce } = req.body;

    if (!deployHash) {
        res.status(400).json({ error: 'deployHash is required' });
        return;
    }

    try {
        logger.info('Manual trigger received', { deployHash });

        // Create a mock intent event
        const mockEvent = {
            deployHash: deployHash,
            caller: caller || '0x0000000000000000000000000000000000000000',
            targetChain: targetChain || 1,
            targetAddress: targetAddress || '0x0000000000000000000000000000000000000000',
            data: data || '0x',
            nonce: nonce || 0,
            blockHeight: 0,
        };

        // Update status to pending
        updateIntentStatus(deployHash, {
            status: 'pending_casper',
            casperBlockHeight: 0,
            casperConfirmations: 0,
        });

        res.json({
            success: true,
            message: 'Intent processing triggered',
            deployHash: deployHash,
            status: 'pending_casper'
        });

        // Process in background
        setTimeout(() => {
            processManualIntent(mockEvent);
        }, 1000);

    } catch (error: any) {
        logger.error('Manual trigger failed', { error: error.message });
        res.status(500).json({ error: error.message });
    }
});

// Helper function to process manually triggered intents
async function processManualIntent(event: any) {
    try {
        logger.info('Processing manually triggered intent', { deployHash: event.deployHash });

        // Simulate processing stages
        await new Promise(resolve => setTimeout(resolve, 2000));
        updateIntentStatus(event.deployHash, {
            status: 'proving',
            zkProofGenerated: false,
        });

        await new Promise(resolve => setTimeout(resolve, 5000));
        updateIntentStatus(event.deployHash, {
            status: 'submitting_evm',
            zkProofGenerated: true,
        });

        await new Promise(resolve => setTimeout(resolve, 3000));
        updateIntentStatus(event.deployHash, {
            status: 'confirmed',
            evmTxHash: '0x' + Math.random().toString(16).substring(2, 66),
            gasUsed: '150000',
        });

        logger.info('Manual intent processed successfully', { deployHash: event.deployHash });
    } catch (error: any) {
        logger.error('Manual intent processing failed', { error: error.message });
        updateIntentStatus(event.deployHash, {
            status: 'failed',
            error: error.message,
        });
    }
}

// Intent status endpoint
app.get('/api/status/:deployHash', (req, res) => {
    const { deployHash } = req.params;

    const status = intentStatuses.get(deployHash);

    if (!status) {
        // Intent not found in relayer yet, assume still pending on Casper
        res.status(404).json({
            error: 'Intent not found',
            deployHash,
            message: 'Intent not yet detected by relayer'
        });
        return;
    }

    res.json(status);
});

// Export functions to update intent status
export function updateIntentStatus(deployHash: string, statusData: any) {
    intentStatuses.set(deployHash, {
        ...statusData,
        deployHash,
        timestamp: Date.now(),
    });
    logger.info('Intent status updated', { deployHash, status: statusData.status });
}

// Main function
async function main() {
    try {
        logger.info('Starting Fulcrum Relayer...');

        // Validate configuration
        validateConfig();
        logger.info('Configuration validated');

        // Create logs directory
        const fs = require('fs');
        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }

        // Start Express server
        const port = config.relayer.port;
        app.listen(port, () => {
            logger.info(`HTTP server listening on port ${port}`);
        });

        // Start relayer service
        const relayer = new RelayerService();
        await relayer.start();

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            logger.info('Received SIGINT, shutting down gracefully...');
            await relayer.stop();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            logger.info('Received SIGTERM, shutting down gracefully...');
            await relayer.stop();
            process.exit(0);
        });
    } catch (error: any) {
        logger.error('Fatal error starting relayer', {
            error: error.message,
            stack: error.stack,
        });
        process.exit(1);
    }
}

// Start the application
main();
