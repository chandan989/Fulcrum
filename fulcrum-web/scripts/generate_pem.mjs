import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import CasperSDK from 'casper-js-sdk';
import fs from 'fs';

const { PrivateKey, KeyAlgorithm } = CasperSDK;

const MNEMONIC = "globe web orient tank universe shift foil liar wrap disorder parrot route civil shoulder disagree expect purse scrub common small squirrel gate puzzle silly";

async function main() {
    console.log("🔐 Generating Key from Mnemonic...");

    // 1. Generate Seed
    const seed = await bip39.mnemonicToSeed(MNEMONIC);

    // 2. Derive Private Key (Ed25519)
    // Use fully hardened path for ed25519-hd-key compatibility: m/44'/506'/0'/0'/0'
    const { key } = derivePath("m/44'/506'/0'/0'/0'", seed.toString('hex'));

    // 3. Create PrivateKey instance
    // key is Uint8Array, convert to Hex
    const hexKey = Buffer.from(key).toString('hex');
    const privateKey = PrivateKey.fromHex(hexKey, KeyAlgorithm.ED25519);

    console.log(`👤 Derived Public Key: ${privateKey.publicKey.toHex()}`);

    // 4. Write PEM
    const pem = privateKey.toPem();
    fs.writeFileSync('secret.pem', pem);

    console.log("✅ Saved to secret.pem");
}

main();
