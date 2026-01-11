import CasperSDK from 'casper-js-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const {
    RpcClient,
    HttpHandler,
    Deploy,
    DeployHeader,
    ExecutableDeployItem,
    Args,
    PrivateKey,
    KeyAlgorithm
} = CasperSDK;

// --- CONFIG ---
const NODE_URL = 'http://65.109.83.79:7777/rpc';
const NETWORK_NAME = 'casper-test';
const WASM_PATH = '../../fulcrum-contracts/contract/target/wasm32-unknown-unknown/release/contract.wasm';
const KEY_PATH = 'secret.pem';

// Setup Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullWasmPath = path.resolve(__dirname, WASM_PATH);
const fullKeyPath = path.resolve(__dirname, '../', KEY_PATH);

async function deploy() {
    console.log("=== Fulcrum Contract Deployer ===");
    console.log(`🌍 Node: ${NODE_URL} `);
    console.log(`🕸️  Network: ${NETWORK_NAME} `);

    // 1. Load Keys
    if (!fs.existsSync(fullKeyPath)) {
        console.error(`❌ Error: Could not find 'secret.pem' at ${fullKeyPath} `);
        console.error("👉 Please download your Secret Key from Casper Wallet and save it as 'secret.pem' in the 'fulcrum-web' folder.");
        process.exit(1);
    }
    console.log("🔑 Loading Private Key...");
    // Attempt Ed25519 first (default for Casper), then Secp256k1
    let keys;
    const pemContent = fs.readFileSync(fullKeyPath, 'utf8');
    try {
        keys = PrivateKey.fromPem(pemContent, KeyAlgorithm.ED25519);
    } catch (e) {
        try {
            keys = PrivateKey.fromPem(pemContent, KeyAlgorithm.SECP256K1);
        } catch (e2) {
            console.error("❌ Failed to load key file (Tried Ed25519 and Secp256k1). Is it a valid PEM?");
            process.exit(1);
        }
    }
    console.log(`👤 Account: ${keys.publicKey.toHex()} `);

    // 2. Load WASM
    if (!fs.existsSync(fullWasmPath)) {
        console.error(`❌ Error: WASM file not found at ${fullWasmPath} `);
        console.error("👉 Please make sure the build command finished successfully.");
        process.exit(1);
    }
    console.log(`📦 Loading Contract WASM(${fs.statSync(fullWasmPath).size} bytes)...`);
    const wasm = new Uint8Array(fs.readFileSync(fullWasmPath));

    // 3. Create Deploy
    console.log("🛠️  Creating Deploy...");
    const client = new RpcClient(new HttpHandler(NODE_URL));

    // Install params
    const paymentAmount = "150000000000"; // 150 CSPR

    // Using standard deploy creation (v5)
    // Deploy.makeDeploy(header, payment, session)
    const deploy = Deploy.makeDeploy(
        new DeployHeader(
            NETWORK_NAME,
            [], // dependencies
            1, // gasPrice
            undefined, // timestamp
            undefined, // ttl
            keys.publicKey, // account
            undefined // bodyHash
        ),
        ExecutableDeployItem.standardPayment(paymentAmount), // Payment
        ExecutableDeployItem.newModuleBytes(                 // Session
            wasm,
            new Args(new Map())
        )
    );

    // 4. Sign
    console.log("✍️  Signing Deploy...");
    // v5 SDK sign method takes a single key
    deploy.sign(keys);
    const signedDeploy = deploy;

    // 5. Send
    console.log("🚀 Sending to Network...");
    let deployHash;
    try {
        const putDeployResult = await client.putDeploy(signedDeploy);
        console.log("DEBUG - putDeployResult type:", typeof putDeployResult);
        console.log("DEBUG - putDeployResult:", JSON.stringify(putDeployResult, null, 2));

        // Extract the hash - try different possible formats
        if (typeof putDeployResult === 'string') {
            deployHash = putDeployResult;
        } else if (putDeployResult && putDeployResult.deploy_hash) {
            deployHash = putDeployResult.deploy_hash;
        } else if (putDeployResult && typeof putDeployResult.toHex === 'function') {
            deployHash = putDeployResult.toHex();
        } else {
            // Last resort - use the deploy's hash
            deployHash = signedDeploy.hash.toHex();
        }
    } catch (e) {
        console.error("❌ Deploy Failed:", e);
        process.exit(1);
    }
    console.log(`✅ Deploy Sent! Hash: ${deployHash} `);
    console.log("⏳ Waiting for execution (~1-2 mins)...");

    // 6. Poll for Result
    const poller = setInterval(async () => {
        try {
            const result = await client.getDeploy(deployHash);
            const executionResults = result.execution_results;

            if (executionResults && executionResults.length > 0) {
                clearInterval(poller);
                const executionParams = executionResults[0].result;

                if (executionParams.Success) {
                    console.log("\n🎉 CONTRACT DEPLOYED SUCCESSFULLY!");

                    // The effect contains the transforms. One of them is the new Contract.
                    // But easier is to assume the Named Key we set ("fulcrum_controller") is on the account.
                    console.log("🔍 Checking Account for Named Keys...");

                    // We need to fetch the account state to find the contract hash
                    // But standard way: print the deploy result details
                    // The user can find the hash in the block explorer or we can query account
                    const stateRootHash = await client.getStateRootHash();
                    const accountInfo = await client.getBlockState(
                        stateRootHash,
                        keys.publicKey.toAccountHashStr(),
                        []
                    );

                    const namedKeys = accountInfo.Account.namedKeys;
                    const contractKey = namedKeys.find(k => k.name === "fulcrum_controller");

                    if (contractKey) {
                        console.log("\n📍 CONTRACT HASH FOUND:");
                        console.log(`--------------------------------------------------`);
                        console.log(contractKey.key);
                        console.log(`--------------------------------------------------`);
                        console.log("👉 Please copy this hash (including 'hash-') for the frontend.");
                    } else {
                        console.warn("⚠️  Could not find 'fulcrum_controller' in account named keys yet. Specify it manually from explorer.");
                        console.log(`Check deploy here: https://testnet.cspr.live/deploy/${deployHash}`);
                    }

                    process.exit(0);

                } else {
                    console.error("\n❌ Execution Failed:");
                    console.error(JSON.stringify(executionParams.Failure, null, 2));
                    process.exit(1);
                }
            } else {
                process.stdout.write(".");
            }
        } catch (e) {
            // Ignore transient errors
        }
    }, 5000);

}

deploy();
