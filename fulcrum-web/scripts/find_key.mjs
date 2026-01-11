import CasperSDK from 'casper-js-sdk';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);
const { PrivateKey, KeyAlgorithm } = CasperSDK;

const MNEMONIC = "globe web orient tank universe shift foil liar wrap disorder parrot route civil shoulder disagree expect purse scrub common small squirrel gate puzzle silly";
const TARGET_PUB_KEY = "0202b0decd51d21ee47f97a1cd083ada3457a18a7f79aa6e75318878db4a315b1edf";

async function main() {
    console.log("🔍 Searching for key matching:", TARGET_PUB_KEY);

    const seed = await bip39.mnemonicToSeed(MNEMONIC);
    const root = bip32.fromSeed(seed);

    // Try standard Casper Secp256k1 path: m/44'/506'/0'/0/0
    // Note: Casper usually marks 506 as coin type for Secp256k1 as well? 
    // Actually documentation says CSPR coin type is 506.
    // Some wallets use m/44'/506'/0'/0/0

    const paths = [
        "m/44'/506'/0'/0/0",
        "m/44'/506'/0'/0/0'", // Hardened last index?
        "m/44'/60'/0'/0/0"    // ETH style?
    ];

    for (const path of paths) {
        try {
            const child = root.derivePath(path);
            if (!child.privateKey) {
                console.log(`Path: ${path} => No private key derived?`);
                continue;
            }
            // child.privateKey might be Uint8Array
            const hexKey = Buffer.from(child.privateKey).toString('hex');
            console.log(`Path: ${path} => Hex: ${hexKey}`);

            const privateKey = PrivateKey.fromHex(hexKey, KeyAlgorithm.SECP256K1);
            const pubKeyHex = privateKey.publicKey.toHex();

            console.log(`Path: ${path} => ${pubKeyHex}`);

            if (pubKeyHex.toLowerCase() === TARGET_PUB_KEY.toLowerCase()) {
                console.log("\n✅ FOUND MATCH!");
                console.log("--------------------------------------------------");
                console.log(privateKey.toPem());
                console.log("--------------------------------------------------");
                process.exit(0);
            }
        } catch (e) {
            console.error(`Error with path ${path}:`, e.message);
        }
    }

    console.log("\n❌ No match found with tested paths.");
}

main();
