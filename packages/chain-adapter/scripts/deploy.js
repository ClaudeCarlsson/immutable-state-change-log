"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    const StateCommitment = await hardhat_1.ethers.getContractFactory('StateCommitment');
    const contract = await StateCommitment.deploy();
    await contract.deployed();
    console.log('StateCommitment deployed to:', contract.address);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
