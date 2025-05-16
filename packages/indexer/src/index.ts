import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  ARBITRUM_GOERLI_RPC_URL,
  CONTRACT_ADDRESS,
  SQLITE_DB_PATH = './data/indexer.db',
  PORT = '4000',
} = process.env;

if (!ARBITRUM_GOERLI_RPC_URL || !CONTRACT_ADDRESS) {
  throw new Error(
    'Please set ARBITRUM_GOERLI_RPC_URL and CONTRACT_ADDRESS in .env',
  );
}

interface EventRecord {
  id: number;
  stateHash: string;
  blockNumber: number;
  txHash: string;
  timestamp: number;
}

const typeDefs = gql`
  type Event {
    id: ID!
    stateHash: String!
    blockNumber: Int!
    txHash: String!
    timestamp: Int!
  }
  type Query {
    events: [Event!]!
    event(txHash: String!): Event
  }
`;

const resolvers = {
  Query: {
    events: async (
      _: unknown,
      __: unknown,
      context: any,
    ): Promise<EventRecord[]> => {
      return context.db.all<EventRecord[]>(
        'SELECT * FROM events ORDER BY id DESC',
      );
    },
    event: async (
      _: unknown,
      args: { txHash: string },
      context: any,
    ): Promise<EventRecord | undefined> => {
      return context.db.get<EventRecord>(
        'SELECT * FROM events WHERE txHash = ?',
        args.txHash,
      );
    },
  },
};

async function main() {
  const db = await open({
    filename: SQLITE_DB_PATH,
    driver: sqlite3.Database,
  });
  await db.run(
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stateHash TEXT NOT NULL,
      blockNumber INTEGER NOT NULL,
      txHash TEXT NOT NULL UNIQUE,
      timestamp INTEGER NOT NULL
    );`,
  );

  const provider = new ethers.providers.JsonRpcProvider(
    ARBITRUM_GOERLI_RPC_URL,
  );
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ['event StateCommitted(bytes32 indexed stateHash)'],
    provider,
  );

  contract.on(
    'StateCommitted',
    async (stateHash: string, event: ethers.Event) => {
      const block = await event.getBlock();
      try {
        await db.run(
          'INSERT OR IGNORE INTO events (stateHash, blockNumber, txHash, timestamp) VALUES (?, ?, ?, ?)',
          stateHash,
          event.blockNumber,
          event.transactionHash,
          block.timestamp,
        );
        console.log(
          `Indexed event tx=${event.transactionHash} hash=${stateHash}`,
        );
      } catch (error) {
        console.error('Failed to index event', error);
      }
    },
  );

  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ db }),
    listen: { port: parseInt(PORT, 10) },
  });
  console.log(`🚀 Indexer GraphQL server ready at ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
