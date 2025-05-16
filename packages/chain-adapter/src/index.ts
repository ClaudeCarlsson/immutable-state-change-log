import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const { ARBITRUM_GOERLI_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

if (!ARBITRUM_GOERLI_RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
  throw new Error(
    'Please set ARBITRUM_GOERLI_RPC_URL, PRIVATE_KEY, and CONTRACT_ADDRESS in .env',
  );
}

const provider = new ethers.providers.JsonRpcProvider(ARBITRUM_GOERLI_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  [
    'event StateCommitted(bytes32 indexed stateHash)',
    'function commitState(bytes32 stateHash) external',
  ],
  wallet,
);

/**
 * Commits a state hash to the blockchain.
 * @param stateHash The hash of the state to commit.
 * @returns Transaction response.
 */
export async function commitState(
  stateHash: string,
): Promise<ethers.providers.TransactionResponse> {
  return contract.commitState(stateHash);
}

/**
 * Generates an Arbiscan link for a transaction.
 * @param txHash Transaction hash.
 * @returns URL to view the transaction on Arbiscan.
 */
export function getArbiscanTxLink(txHash: string): string {
  return `https://goerli.arbiscan.io/tx/${txHash}`;
}
