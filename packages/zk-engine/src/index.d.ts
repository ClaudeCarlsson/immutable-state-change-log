export interface ProofResult {
  proof: any;
  publicSignals: string[];
}
export declare function generateProof(input: {
  preimage: string;
}): Promise<ProofResult>;
