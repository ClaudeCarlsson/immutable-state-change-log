import path from 'path';
import snarkjs from 'snarkjs';

export interface ProofResult {
  proof: any;
  publicSignals: string[];
}

export async function generateProof(input: {
  preimage: string;
}): Promise<ProofResult> {
  const wasmPath = path.join(
    __dirname,
    '..',
    'circuits',
    'build',
    'Hash_js',
    'Hash.wasm',
  );
  const zkeyPath = path.join(
    __dirname,
    '..',
    'circuits',
    'build',
    'Hash_final.zkey',
  );

  const inputBigInt = `0x${Buffer.from(input.preimage, 'utf8').toString(
    'hex',
  )}`;
  const circuitInput = { preimage: inputBigInt };

  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    circuitInput,
    wasmPath,
    zkeyPath,
  );

  return { proof, publicSignals };
}
