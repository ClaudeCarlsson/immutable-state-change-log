'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateProof = generateProof;
const path_1 = __importDefault(require('path'));
const snarkjs_1 = __importDefault(require('snarkjs'));
async function generateProof(input) {
  const wasmPath = path_1.default.join(
    __dirname,
    '..',
    'circuits',
    'build',
    'Hash_js',
    'Hash.wasm',
  );
  const zkeyPath = path_1.default.join(
    __dirname,
    '..',
    'circuits',
    'build',
    'Hash_final.zkey',
  );
  const inputBigInt = `0x${Buffer.from(input.preimage, 'utf8').toString('hex')}`;
  const circuitInput = { preimage: inputBigInt };
  const { proof, publicSignals } = await snarkjs_1.default.groth16.fullProve(
    circuitInput,
    wasmPath,
    zkeyPath,
  );
  return { proof, publicSignals };
}
