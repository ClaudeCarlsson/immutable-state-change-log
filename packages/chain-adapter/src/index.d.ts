import { ethers } from 'ethers';
/**
 * Commits a state hash to the blockchain.
 * @param stateHash The hash of the state to commit.
 * @returns Transaction response.
 */
export declare function commitState(
  stateHash: string,
): Promise<ethers.providers.TransactionResponse>;
/**
 * Generates an Arbiscan link for a transaction.
 * @param txHash Transaction hash.
 * @returns URL to view the transaction on Arbiscan.
 */
export declare function getArbiscanTxLink(txHash: string): string;
