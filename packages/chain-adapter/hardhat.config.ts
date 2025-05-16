import { HardhatUserConfig } from 'hardhat/types';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';
import * as dotenv from 'dotenv';

dotenv.config();

const { PRIVATE_KEY, ARBITRUM_GOERLI_RPC_URL } = process.env;

if (!PRIVATE_KEY || !ARBITRUM_GOERLI_RPC_URL) {
  throw new Error('Please set PRIVATE_KEY and ARBITRUM_GOERLI_RPC_URL in .env');
}

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    arbitrumGoerli: {
      url: ARBITRUM_GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  paths: {
    sources: 'contracts',
    tests: 'test',
    cache: 'cache',
    artifacts: 'artifacts',
  },
};

export default config;
