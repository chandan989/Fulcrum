# Fulcrum Smart Contract Deployment

## ✅ Successful Deployment to Casper Testnet

**Deployment Date:** January 12, 2026, 2:57:33 AM GMT+5:30

### Contract Details

- **Contract Hash:** `hash-803bc77641db94ca0247662d76dbe96e4cc1feca82a269e3dd6d01035be99aa9`
- **Contract Package Hash:** `contract-package-8a8b10e87c0b47e02d3a48699d00014a1f586feef10f2bdfe15130c6b80cf216`
- **Named Key:** `fulcrum_controller`

### Transaction Details

- **Deploy Hash:** `54728021ff9dc1222dbaeed4cb10665de86906e2cebe4103e494e8821b00ad86`
- **Block Hash:** `f502359f3273ab670d9ad56962cc99f08f930ae134b339b28702c3ba1dc487bd`
- **Explorer Link:** https://testnet.cspr.live/deploy/54728021ff9dc1222dbaeed4cb10665de86906e2cebe4103e494e8821b00ad86

### Gas Costs

- **Transaction Payment:** 150.00000 CSPR ($0.75)
- **Consumed Gas:** 19.11464 CSPR ($0.10)
- **Charged Amount:** 51.83598 CSPR ($0.26)

### Deployer Account

- **Public Key:** `0203392c71c3738bf56c0410ffa2e4d31b4ee77ac68244375bc1f269637f25839f93`
- **Account Hash:** `account-hash-915e22b3e9bae5875aa00966c1991c433b86e4ae85a485e8d2e79126758add2b`

## Contract Entry Points

The deployed contract has the following entry point:

### `submit_intent`

**Parameters:**
- `target_chain` (U64) - The target blockchain chain ID
- `target_address` (String) - The target address on the destination chain
- `data` (String) - Intent data/payload

**Return Type:** Unit  
**Access:** Public  
**Type:** Called

## SDK Versions Used

The contract was successfully compiled and deployed using:

- **casper-contract:** 5.0.0
- **casper-types:** 6.0.0
- **Rust Toolchain:** nightly-2024-07-31
- **base64ct:** 1.7.2

## Resolution of EarlyEndOfStream Error

The initial deployment attempts failed with `ApiError::EarlyEndOfStream [17]` error. This was resolved by:

1. **Upgrading SDK versions** from 2.0.0 to 5.0.0/6.0.0
2. **Updating Rust toolchain** from nightly-2023-08-01 to nightly-2024-07-31
3. **Migrating to new API:**
   - Using `addressable_entity::EntityEntryPoint` instead of `contracts::EntryPoint`
   - Adding `EntryPointPayment::Caller` parameter
   - Adding 5th parameter (message topics) to `storage::new_contract()`

## Frontend Integration

The contract hash has been updated in:
- `/fulcrum-web/src/lib/casper.ts` (line 87)

The frontend is now configured to interact with the deployed contract on Casper Testnet.

## Network Configuration

- **Network Name:** casper-test
- **RPC Node:** http://65.109.83.79:7777/rpc
- **Protocol Version:** 2.1.1

## Next Steps

1. ✅ Contract deployed successfully
2. ✅ Frontend updated with contract hash
3. 🎯 Test the frontend integration with Casper Wallet
4. 🎯 Record hackathon demo video
5. 🎯 Submit to hackathon

---

**Note:** This deployment is on the Casper Testnet for hackathon demonstration purposes.
