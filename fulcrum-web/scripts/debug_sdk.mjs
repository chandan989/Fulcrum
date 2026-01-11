

import CasperSDK from 'casper-js-sdk';
const allKeys = Object.keys(CasperSDK);
const keyMatches = allKeys.filter(k => k.toLowerCase().includes('key') || k.toLowerCase().includes('ed25519'));
console.log("Matches:", keyMatches);

