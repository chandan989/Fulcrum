const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FulcrumAvatar", function () {
    let verifier;
    let avatar;
    let owner;
    let user;
    let controllerPublicKeyHash;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        // Deploy Groth16Verifier
        const Groth16Verifier = await ethers.getContractFactory("Groth16Verifier");
        verifier = await Groth16Verifier.deploy();
        await verifier.waitForDeployment();

        // Create controller public key hash
        controllerPublicKeyHash = ethers.keccak256(
            ethers.toUtf8Bytes("test_controller_key")
        );

        // Deploy FulcrumAvatar
        const FulcrumAvatar = await ethers.getContractFactory("FulcrumAvatar");
        avatar = await FulcrumAvatar.deploy(
            await verifier.getAddress(),
            controllerPublicKeyHash
        );
        await avatar.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the correct verifier", async function () {
            expect(await avatar.verifier()).to.equal(await verifier.getAddress());
        });

        it("Should set the correct controller hash", async function () {
            expect(await avatar.controllerPublicKeyHash()).to.equal(controllerPublicKeyHash);
        });

        it("Should set the correct owner", async function () {
            expect(await avatar.owner()).to.equal(owner.address);
        });

        it("Should initialize with nonce 0", async function () {
            expect(await avatar.getNonce()).to.equal(0);
        });

        it("Should not be paused initially", async function () {
            expect(await avatar.paused()).to.equal(false);
        });
    });

    describe("Intent Execution", function () {
        it("Should compute intent hash correctly", async function () {
            const intent = {
                target: user.address,
                value: ethers.parseEther("1"),
                data: "0x",
                nonce: 0,
                expiry: Math.floor(Date.now() / 1000) + 3600,
                chainId: 31337,
            };

            const hash = await avatar.hashIntent(intent);
            expect(hash).to.not.equal(ethers.ZeroHash);
        });

        it("Should reject intent with invalid chain ID", async function () {
            const intent = {
                target: user.address,
                value: 0,
                data: "0x",
                nonce: 0,
                expiry: Math.floor(Date.now() / 1000) + 3600,
                chainId: 999, // Wrong chain ID
            };

            const mockProof = {
                a: [0, 0],
                b: [[0, 0], [0, 0]],
                c: [0, 0],
                publicSignals: [0, 0],
            };

            await expect(
                avatar.executeIntent(
                    intent,
                    mockProof.a,
                    mockProof.b,
                    mockProof.c,
                    mockProof.publicSignals
                )
            ).to.be.revertedWithCustomError(avatar, "InvalidChainId");
        });

        it("Should reject expired intent", async function () {
            const intent = {
                target: user.address,
                value: 0,
                data: "0x",
                nonce: 0,
                expiry: Math.floor(Date.now() / 1000) - 3600, // Expired
                chainId: 31337,
            };

            const mockProof = {
                a: [0, 0],
                b: [[0, 0], [0, 0]],
                c: [0, 0],
                publicSignals: [0, 0],
            };

            await expect(
                avatar.executeIntent(
                    intent,
                    mockProof.a,
                    mockProof.b,
                    mockProof.c,
                    mockProof.publicSignals
                )
            ).to.be.revertedWithCustomError(avatar, "IntentExpired");
        });

        it("Should reject intent with invalid nonce", async function () {
            const intent = {
                target: user.address,
                value: 0,
                data: "0x",
                nonce: 5, // Wrong nonce
                expiry: Math.floor(Date.now() / 1000) + 3600,
                chainId: 31337,
            };

            const mockProof = {
                a: [0, 0],
                b: [[0, 0], [0, 0]],
                c: [0, 0],
                publicSignals: [0, 0],
            };

            await expect(
                avatar.executeIntent(
                    intent,
                    mockProof.a,
                    mockProof.b,
                    mockProof.c,
                    mockProof.publicSignals
                )
            ).to.be.revertedWithCustomError(avatar, "InvalidNonce");
        });
    });

    describe("Pause Functionality", function () {
        it("Should allow owner to pause", async function () {
            await avatar.pause();
            expect(await avatar.paused()).to.equal(true);
        });

        it("Should allow owner to unpause", async function () {
            await avatar.pause();
            await avatar.unpause();
            expect(await avatar.paused()).to.equal(false);
        });

        it("Should reject non-owner pause", async function () {
            await expect(
                avatar.connect(user).pause()
            ).to.be.revertedWithCustomError(avatar, "OwnableUnauthorizedAccount");
        });

        it("Should reject intent execution when paused", async function () {
            await avatar.pause();

            const intent = {
                target: user.address,
                value: 0,
                data: "0x",
                nonce: 0,
                expiry: Math.floor(Date.now() / 1000) + 3600,
                chainId: 31337,
            };

            const mockProof = {
                a: [0, 0],
                b: [[0, 0], [0, 0]],
                c: [0, 0],
                publicSignals: [0, 0],
            };

            await expect(
                avatar.executeIntent(
                    intent,
                    mockProof.a,
                    mockProof.b,
                    mockProof.c,
                    mockProof.publicSignals
                )
            ).to.be.revertedWithCustomError(avatar, "ContractPaused");
        });
    });

    describe("Controller Management", function () {
        it("Should allow owner to update controller", async function () {
            const newHash = ethers.keccak256(ethers.toUtf8Bytes("new_controller"));

            await expect(avatar.updateController(newHash))
                .to.emit(avatar, "ControllerUpdated")
                .withArgs(controllerPublicKeyHash, newHash);

            expect(await avatar.controllerPublicKeyHash()).to.equal(newHash);
        });

        it("Should reject non-owner controller update", async function () {
            const newHash = ethers.keccak256(ethers.toUtf8Bytes("new_controller"));

            await expect(
                avatar.connect(user).updateController(newHash)
            ).to.be.revertedWithCustomError(avatar, "OwnableUnauthorizedAccount");
        });

        it("Should reject zero hash controller", async function () {
            await expect(
                avatar.updateController(ethers.ZeroHash)
            ).to.be.revertedWith("Invalid controller hash");
        });
    });

    describe("Emergency Withdrawal", function () {
        beforeEach(async function () {
            // Fund the avatar
            await owner.sendTransaction({
                to: await avatar.getAddress(),
                value: ethers.parseEther("10"),
            });
        });

        it("Should allow owner to withdraw funds", async function () {
            const amount = ethers.parseEther("5");
            const balanceBefore = await ethers.provider.getBalance(user.address);

            await avatar.emergencyWithdraw(user.address, amount);

            const balanceAfter = await ethers.provider.getBalance(user.address);
            expect(balanceAfter - balanceBefore).to.equal(amount);
        });

        it("Should reject non-owner withdrawal", async function () {
            await expect(
                avatar.connect(user).emergencyWithdraw(user.address, ethers.parseEther("1"))
            ).to.be.revertedWithCustomError(avatar, "OwnableUnauthorizedAccount");
        });

        it("Should reject withdrawal to zero address", async function () {
            await expect(
                avatar.emergencyWithdraw(ethers.ZeroAddress, ethers.parseEther("1"))
            ).to.be.revertedWith("Invalid recipient");
        });
    });

    describe("Receive ETH", function () {
        it("Should receive ETH and emit event", async function () {
            const amount = ethers.parseEther("1");

            await expect(
                owner.sendTransaction({
                    to: await avatar.getAddress(),
                    value: amount,
                })
            ).to.emit(avatar, "FundsReceived")
                .withArgs(owner.address, amount);

            expect(await ethers.provider.getBalance(await avatar.getAddress())).to.equal(amount);
        });
    });
});
