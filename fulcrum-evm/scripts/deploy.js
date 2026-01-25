const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying Fulcrum Avatar Contracts...\n");

    // Get deployer
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());
    console.log("");

    // Step 1: Deploy Groth16Verifier
    console.log("📝 Step 1: Deploying Groth16Verifier...");
    const Groth16Verifier = await hre.ethers.getContractFactory("Groth16Verifier");
    const verifier = await Groth16Verifier.deploy();
    await verifier.waitForDeployment();
    const verifierAddress = await verifier.getAddress();
    console.log("✅ Groth16Verifier deployed to:", verifierAddress);
    console.log("");

    // Step 2: Deploy FulcrumAvatar
    console.log("📝 Step 2: Deploying FulcrumAvatar...");

    // Example controller public key hash (replace with actual hash from Casper)
    // This should be the keccak256 hash of the Casper controller's public key
    const controllerPublicKeyHash = hre.ethers.keccak256(
        hre.ethers.toUtf8Bytes("example_casper_public_key")
    );

    console.log("Controller Public Key Hash:", controllerPublicKeyHash);

    const FulcrumAvatar = await hre.ethers.getContractFactory("FulcrumAvatar");
    const avatar = await FulcrumAvatar.deploy(verifierAddress, controllerPublicKeyHash);
    await avatar.waitForDeployment();
    const avatarAddress = await avatar.getAddress();
    console.log("✅ FulcrumAvatar deployed to:", avatarAddress);
    console.log("");

    // Summary
    console.log("📋 Deployment Summary:");
    console.log("═══════════════════════════════════════════");
    console.log("Network:", hre.network.name);
    console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);
    console.log("Deployer:", deployer.address);
    console.log("");
    console.log("Groth16Verifier:", verifierAddress);
    console.log("FulcrumAvatar:", avatarAddress);
    console.log("Controller Hash:", controllerPublicKeyHash);
    console.log("═══════════════════════════════════════════");
    console.log("");

    // Save deployment info
    const deploymentInfo = {
        network: hre.network.name,
        chainId: Number((await hre.ethers.provider.getNetwork()).chainId),
        deployer: deployer.address,
        contracts: {
            Groth16Verifier: verifierAddress,
            FulcrumAvatar: avatarAddress,
        },
        controllerPublicKeyHash: controllerPublicKeyHash,
        timestamp: new Date().toISOString(),
    };

    const fs = require("fs");
    const path = require("path");
    const deploymentsDir = path.join(__dirname, "../deployments");

    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir);
    }

    const filename = `${hre.network.name}-${Date.now()}.json`;
    fs.writeFileSync(
        path.join(deploymentsDir, filename),
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("💾 Deployment info saved to:", `deployments/${filename}`);
    console.log("");

    // Verification instructions
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("🔍 To verify contracts on Etherscan:");
        console.log(`npx hardhat verify --network ${hre.network.name} ${verifierAddress}`);
        console.log(`npx hardhat verify --network ${hre.network.name} ${avatarAddress} "${verifierAddress}" "${controllerPublicKeyHash}"`);
    }

    console.log("\n✅ Deployment complete!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
