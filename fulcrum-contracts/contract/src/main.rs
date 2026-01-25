#![no_std]
#![no_main]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with --target wasm32-unknown-unknown");

extern crate alloc;

use alloc::{string::String, vec::Vec, format};
use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    CLType, CLTyped, Key, URef, U512,
    account::AccountHash,
    addressable_entity::{EntityEntryPoint as EntryPoint, EntryPoints},
    EntryPointAccess, EntryPointType, EntryPointPayment, Parameter,
    bytesrepr::FromBytes,
};

// Entry Points
const ENTRY_POINT_SUBMIT_INTENT: &str = "submit_intent";
const ENTRY_POINT_INIT_GOVERNANCE: &str = "init_governance";
const ENTRY_POINT_UPDATE_POLICY: &str = "update_policy";

// Arguments
const ARG_TARGET_CHAIN: &str = "target_chain";
const ARG_TARGET_ADDRESS: &str = "target_address";
const ARG_DATA: &str = "data";
const ARG_VALUE: &str = "value";
const ARG_THRESHOLD: &str = "threshold";
const ARG_DAILY_LIMIT: &str = "daily_limit";
const ARG_PER_TX_LIMIT: &str = "per_tx_limit";

// Storage Keys
const KEY_NONCES: &str = "nonces";
const KEY_OWNER: &str = "owner";
const KEY_THRESHOLD: &str = "threshold";
const KEY_DAILY_LIMIT: &str = "daily_limit";
const KEY_PER_TX_LIMIT: &str = "per_tx_limit";
const KEY_DAILY_SPENT: &str = "daily_spent";
const KEY_LAST_RESET: &str = "last_reset";
const KEY_EVENT_COUNTER: &str = "event_counter";

// Events
const EVENT_INTENT_CREATED: &str = "IntentCreated";
const EVENT_GOVERNANCE_UPDATED: &str = "GovernanceUpdated";

// Error codes
const ERROR_UNAUTHORIZED: u16 = 1;
const ERROR_DAILY_LIMIT_EXCEEDED: u16 = 3;
const ERROR_PER_TX_LIMIT_EXCEEDED: u16 = 4;
const ERROR_NOT_INITIALIZED: u16 = 6;

/// Get or create a dictionary for nonce management
fn get_nonces_dict() -> URef {
    let key_name = KEY_NONCES;
    match runtime::get_key(key_name) {
        Some(Key::URef(uref)) => uref,
        Some(_) => runtime::revert(casper_types::ApiError::UnexpectedKeyVariant),
        None => {
            // Create new dictionary
            let new_dict = storage::new_dictionary(key_name).unwrap_or_revert();
            runtime::put_key(key_name, new_dict.into());
            new_dict
        }
    }
}

/// Get nonce for an account
fn get_nonce(account: &AccountHash) -> u64 {
    let nonces_dict = get_nonces_dict();
    let key = account.to_formatted_string();
    
    storage::dictionary_get::<u64>(nonces_dict, &key)
        .unwrap_or_revert()
        .unwrap_or(0)
}

/// Increment and return the new nonce
fn increment_nonce(account: &AccountHash) -> u64 {
    let nonces_dict = get_nonces_dict();
    let key = account.to_formatted_string();
    let current_nonce = get_nonce(account);
    let new_nonce = current_nonce + 1;
    
    storage::dictionary_put(nonces_dict, &key, new_nonce);
    new_nonce
}

/// Get stored value or revert
fn get_key_value<T: FromBytes + CLTyped>(key_name: &str) -> T {
    let uref = runtime::get_key(key_name)
        .unwrap_or_revert_with(casper_types::ApiError::User(ERROR_NOT_INITIALIZED))
        .into_uref()
        .unwrap_or_revert();
    
    storage::read(uref)
        .unwrap_or_revert()
        .unwrap_or_revert()
}

/// Check if caller is owner
fn is_owner() -> bool {
    let owner: AccountHash = get_key_value(KEY_OWNER);
    runtime::get_caller() == owner
}

/// Reset daily spending if needed
fn reset_daily_spending_if_needed() {
    let last_reset_uref = runtime::get_key(KEY_LAST_RESET)
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert();
    
    let last_reset: u64 = storage::read(last_reset_uref)
        .unwrap_or_revert()
        .unwrap_or(0);
    
    let current_time: u64 = runtime::get_blocktime().into();
    let one_day = 86400u64; // 24 hours in seconds
    
    if current_time >= last_reset + one_day {
        // Reset daily spent
        let daily_spent_uref = runtime::get_key(KEY_DAILY_SPENT)
            .unwrap_or_revert()
            .into_uref()
            .unwrap_or_revert();
        storage::write(daily_spent_uref, U512::zero());
        storage::write(last_reset_uref, current_time);
    }
}

/// Check spending limits
fn check_spending_limits(value: U512) {
    reset_daily_spending_if_needed();
    
    // Check per-transaction limit
    let per_tx_limit: U512 = get_key_value(KEY_PER_TX_LIMIT);
    
    if value > per_tx_limit {
        runtime::revert(casper_types::ApiError::User(ERROR_PER_TX_LIMIT_EXCEEDED));
    }
    
    // Check daily limit
    let daily_limit: U512 = get_key_value(KEY_DAILY_LIMIT);
    let daily_spent_uref = runtime::get_key(KEY_DAILY_SPENT)
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert();
    let daily_spent: U512 = storage::read(daily_spent_uref)
        .unwrap_or_revert()
        .unwrap_or(U512::zero());
    
    let new_daily_spent = daily_spent + value;
    
    if new_daily_spent > daily_limit {
        runtime::revert(casper_types::ApiError::User(ERROR_DAILY_LIMIT_EXCEEDED));
    }
    
    // Update daily spent
    storage::write(daily_spent_uref, new_daily_spent);
}

/// Record an event by storing it in a named key
fn emit_event(event_name: &str, data: Vec<(String, String)>) {
    // Get or create event counter
    let counter_uref = match runtime::get_key(KEY_EVENT_COUNTER) {
        Some(Key::URef(uref)) => uref,
        _ => {
            let new_uref = storage::new_uref(0u64);
            runtime::put_key(KEY_EVENT_COUNTER, new_uref.into());
            new_uref
        }
    };
    
    let counter: u64 = storage::read(counter_uref)
        .unwrap_or_revert()
        .unwrap_or(0);
    
    // Create event data string
    let mut event_str = format!("{{\"event\":\"{}\"", event_name);
    for (key, value) in data.iter() {
        event_str.push_str(&format!(",\"{}\":\"{}\"", key, value));
    }
    event_str.push_str("}");
    
    // Store event with counter-based key
    let event_key = format!("event_{}_{}", counter, event_name);
    let event_uref = storage::new_uref(event_str);
    runtime::put_key(&event_key, event_uref.into());
    
    // Increment counter
    storage::write(counter_uref, counter + 1);
}

/// Submit an intent - the main entry point
#[no_mangle]
pub extern "C" fn submit_intent() {
    let caller = runtime::get_caller();
    
    // Get arguments
    let target_chain: u64 = runtime::get_named_arg(ARG_TARGET_CHAIN);
    let target_address: String = runtime::get_named_arg(ARG_TARGET_ADDRESS);
    let data: String = runtime::get_named_arg(ARG_DATA);
    let value: U512 = runtime::get_named_arg(ARG_VALUE);
    
    // Check spending limits
    check_spending_limits(value);
    
    // Get and increment nonce
    let nonce = increment_nonce(&caller);
    
    let timestamp: u64 = runtime::get_blocktime().into();
    
    // Emit IntentCreated event
    emit_event(
        EVENT_INTENT_CREATED,
        alloc::vec![
            (String::from("caller"), caller.to_formatted_string()),
            (String::from("target_chain"), format!("{}", target_chain)),
            (String::from("target_address"), target_address.clone()),
            (String::from("data"), data.clone()),
            (String::from("value"), format!("{}", value)),
            (String::from("nonce"), format!("{}", nonce)),
            (String::from("timestamp"), format!("{}", timestamp)),
        ],
    );
}

/// Initialize governance structure
#[no_mangle]
pub extern "C" fn init_governance() {
    let caller = runtime::get_caller();
    
    // Only allow initialization once
    if runtime::get_key(KEY_OWNER).is_some() {
        runtime::revert(casper_types::ApiError::User(ERROR_UNAUTHORIZED));
    }
    
    let threshold: u64 = runtime::get_named_arg(ARG_THRESHOLD);
    let daily_limit: U512 = runtime::get_named_arg(ARG_DAILY_LIMIT);
    let per_tx_limit: U512 = runtime::get_named_arg(ARG_PER_TX_LIMIT);
    
    // Store owner
    let owner_uref = storage::new_uref(caller);
    runtime::put_key(KEY_OWNER, owner_uref.into());
    
    // Store governance parameters
    let threshold_uref = storage::new_uref(threshold);
    runtime::put_key(KEY_THRESHOLD, threshold_uref.into());
    
    let daily_limit_uref = storage::new_uref(daily_limit);
    runtime::put_key(KEY_DAILY_LIMIT, daily_limit_uref.into());
    
    let per_tx_limit_uref = storage::new_uref(per_tx_limit);
    runtime::put_key(KEY_PER_TX_LIMIT, per_tx_limit_uref.into());
    
    let daily_spent_uref = storage::new_uref(U512::zero());
    runtime::put_key(KEY_DAILY_SPENT, daily_spent_uref.into());
    
    let current_time: u64 = runtime::get_blocktime().into();
    let last_reset_uref = storage::new_uref(current_time);
    runtime::put_key(KEY_LAST_RESET, last_reset_uref.into());
    
    emit_event(
        EVENT_GOVERNANCE_UPDATED,
        alloc::vec![
            (String::from("threshold"), format!("{}", threshold)),
            (String::from("daily_limit"), format!("{}", daily_limit)),
            (String::from("per_tx_limit"), format!("{}", per_tx_limit)),
        ],
    );
}

/// Update spending policy
#[no_mangle]
pub extern "C" fn update_policy() {
    if !is_owner() {
        runtime::revert(casper_types::ApiError::User(ERROR_UNAUTHORIZED));
    }
    
    let daily_limit: U512 = runtime::get_named_arg(ARG_DAILY_LIMIT);
    let per_tx_limit: U512 = runtime::get_named_arg(ARG_PER_TX_LIMIT);
    
    let daily_limit_uref = runtime::get_key(KEY_DAILY_LIMIT)
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert();
    storage::write(daily_limit_uref, daily_limit);
    
    let per_tx_limit_uref = runtime::get_key(KEY_PER_TX_LIMIT)
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert();
    storage::write(per_tx_limit_uref, per_tx_limit);
    
    emit_event(
        EVENT_GOVERNANCE_UPDATED,
        alloc::vec![
            (String::from("daily_limit"), format!("{}", daily_limit)),
            (String::from("per_tx_limit"), format!("{}", per_tx_limit)),
        ],
    );
}

/// Contract installation entry point
#[no_mangle]
pub extern "C" fn call() {
    let mut entry_points = EntryPoints::new();

    // Submit intent entry point
    entry_points.add_entry_point(EntryPoint::new(
        ENTRY_POINT_SUBMIT_INTENT,
        alloc::vec![
            Parameter::new(ARG_TARGET_CHAIN, CLType::U64),
            Parameter::new(ARG_TARGET_ADDRESS, CLType::String),
            Parameter::new(ARG_DATA, CLType::String),
            Parameter::new(ARG_VALUE, CLType::U512),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Called,
        EntryPointPayment::Caller,
    ));

    // Initialize governance entry point
    entry_points.add_entry_point(EntryPoint::new(
        ENTRY_POINT_INIT_GOVERNANCE,
        alloc::vec![
            Parameter::new(ARG_THRESHOLD, CLType::U64),
            Parameter::new(ARG_DAILY_LIMIT, CLType::U512),
            Parameter::new(ARG_PER_TX_LIMIT, CLType::U512),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Called,
        EntryPointPayment::Caller,
    ));

    // Update policy entry point
    entry_points.add_entry_point(EntryPoint::new(
        ENTRY_POINT_UPDATE_POLICY,
        alloc::vec![
            Parameter::new(ARG_DAILY_LIMIT, CLType::U512),
            Parameter::new(ARG_PER_TX_LIMIT, CLType::U512),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Called,
        EntryPointPayment::Caller,
    ));

    let (contract_hash, _contract_version) = storage::new_contract(
        entry_points,
        None,
        Some(String::from("fulcrum_controller_package")),
        Some(String::from("fulcrum_controller_access_token")),
        None,
    );
    
    // Store contract hash in the account's named keys for easy access
    runtime::put_key("fulcrum_controller", contract_hash.into());
}
