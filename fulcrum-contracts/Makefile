prepare:
	rustup target add wasm32-unknown-unknown

build:
	cd contract && cargo build --release --target wasm32-unknown-unknown

clean:
	cd contract && cargo clean
	rm -rf contract/target
