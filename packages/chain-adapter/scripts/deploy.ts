import { ethers } from 'hardhat';

async function main() {
  const StateCommitment = await ethers.getContractFactory('StateCommitment');
  const contract = await StateCommitment.deploy();
  await contract.deployed();
  console.log('StateCommitment deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
