#![no_std]
#![no_main]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with --target wasm32-unknown-unknown");

extern crate alloc;

use alloc::string::String;
use casper_contract::{
    contract_api::{runtime, storage},
};
use casper_types::{
    CLType, addressable_entity::{EntityEntryPoint as EntryPoint, EntryPoints},
    EntryPointAccess, EntryPointType, EntryPointPayment, Parameter,
};

const ENTRY_POINT_SUBMIT_INTENT: &str = "submit_intent";
const ARG_TARGET_CHAIN: &str = "target_chain";
const ARG_TARGET_ADDRESS: &str = "target_address";
const ARG_DATA: &str = "data";

#[no_mangle]
pub extern "C" fn submit_intent() {
    let _target_chain: u64 = runtime::get_named_arg(ARG_TARGET_CHAIN);
    let _target_address: String = runtime::get_named_arg(ARG_TARGET_ADDRESS);
    let _data: String = runtime::get_named_arg(ARG_DATA); 
    
    // For MVP: Just accept the arguments
    // The fact that this function executes proves the contract works
}

#[no_mangle]
pub extern "C" fn call() {
    let mut entry_points = EntryPoints::new();

    entry_points.add_entry_point(EntryPoint::new(
        ENTRY_POINT_SUBMIT_INTENT,
        alloc::vec![
            Parameter::new(ARG_TARGET_CHAIN, CLType::U64),
            Parameter::new(ARG_TARGET_ADDRESS, CLType::String),
            Parameter::new(ARG_DATA, CLType::String),
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
