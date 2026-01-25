import dotenv from 'dotenv';

dotenv.config();

export const config = {
    casper: {
        nodeUrl: process.env.CASPER_NODE_URL || 'http://65.109.83.79:7777/rpc',
        chainName: process.env.CASPER_CHAIN_NAME || 'casper-test',
        contractHash: process.env.CASPER_CONTRACT_HASH || '',
    },
    ethereum: {
        rpcUrl: process.env.ETH_RPC_URL || '',
        chainId: parseInt(process.env.ETH_CHAIN_ID || '11155111'),
        avatarContract: process.env.ETH_AVATAR_CONTRACT || '',
        privateKey: process.env.ETH_PRIVATE_KEY || '',
    },
    relayer: {
        pollIntervalMs: parseInt(process.env.POLL_INTERVAL_MS || '5000'),
        port: parseInt(process.env.PORT || '3001'),
    },
    zk: {
        wasmPath: process.env.ZK_WASM_PATH || './circuits/ed25519_verifier.wasm',
        zkeyPath: process.env.ZK_ZKEY_PATH || './circuits/ed25519_verifier.zkey',
        verificationKeyPath: process.env.ZK_VERIFICATION_KEY_PATH || './circuits/verification_key.json',
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
};

// Validate required configuration
export function validateConfig(): void {
    const errors: string[] = [];

    if (!config.casper.contractHash) {
        errors.push('CASPER_CONTRACT_HASH is required');
    }

    if (!config.ethereum.rpcUrl) {
        errors.push('ETH_RPC_URL is required');
    }

    if (!config.ethereum.avatarContract || config.ethereum.avatarContract === '0x0000000000000000000000000000000000000000') {
        errors.push('ETH_AVATAR_CONTRACT is required');
    }

    if (!config.ethereum.privateKey || config.ethereum.privateKey === 'your_private_key_here') {
        errors.push('ETH_PRIVATE_KEY is required');
    }

    if (errors.length > 0) {
        throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
}
