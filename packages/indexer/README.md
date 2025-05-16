# indexer

Listens to `StateCommitted` events on Arbitrum Goerli, stores them in SQLite, and exposes a GraphQL API.

Copy `.env.example` to `.env` and configure the RPC URL, contract address, database path, and port.

## Setup

Install dependencies and compile the TypeScript files:

```bash
npm install
npm run build
```

Start the indexer service:

```bash
npm start
```

The indexer will listen for on-chain events and serve a GraphQL endpoint at `http://localhost:<PORT>/`.

## GraphQL API

Example queries:

```graphql
query {
  events {
    id
    stateHash
    blockNumber
    txHash
    timestamp
  }
}

query {
  event(txHash: "0x...") {
    id
    stateHash
    blockNumber
    txHash
    timestamp
  }
}
```
