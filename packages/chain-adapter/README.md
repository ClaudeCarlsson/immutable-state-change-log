# chain-adapter

Provides functionality to interact with the StateCommitment contract on Arbitrum Goerli.

Copy `.env.example` to `.env` and configure your keys and RPC URL.

## Setup and Deployment

Install dependencies and compile TypeScript files:

```bash
npm install
npm run build
```

Deploy the StateCommitment contract:

```bash
npm run deploy
```

The deployed contract address will be printed to the console. Update `.env` with the CONTRACT_ADDRESS.

## Usage

Import and use the commitState function to record a state hash on-chain:

```ts
import { commitState, getArbiscanTxLink } from 'chain-adapter';

async function record(hash: string) {
  const tx = await commitState(hash);
  console.log('Transaction sent:', getArbiscanTxLink(tx.hash));
}
```
