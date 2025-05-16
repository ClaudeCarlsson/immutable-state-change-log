# zk-engine

Provides functionality to generate zero-knowledge proofs for state commitment using Circom and snarkjs.

Prerequisites

Install Circom and snarkjs globally:

```bash
npm install -g circom snarkjs
```

Setup and Build

```bash
npm install
npm run setup
npm run build:circuit
npm run generate-zkey
npm run build
```

Usage

```ts
import { generateProof } from 'zk-engine';

async function makeProof() {
  const { proof, publicSignals } = await generateProof({ preimage: '42' });
  console.log('Proof:', proof);
  console.log('Public signals (hash):', publicSignals[0]);
}
```
