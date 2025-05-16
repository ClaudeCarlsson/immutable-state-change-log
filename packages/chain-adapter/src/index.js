'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.commitState = commitState;
exports.getArbiscanTxLink = getArbiscanTxLink;
const ethers_1 = require('ethers');
const dotenv = __importStar(require('dotenv'));
dotenv.config();
const { ARBITRUM_GOERLI_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;
if (!ARBITRUM_GOERLI_RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
  throw new Error(
    'Please set ARBITRUM_GOERLI_RPC_URL, PRIVATE_KEY, and CONTRACT_ADDRESS in .env',
  );
}
const provider = new ethers_1.ethers.providers.JsonRpcProvider(
  ARBITRUM_GOERLI_RPC_URL,
);
const wallet = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers_1.ethers.Contract(
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
async function commitState(stateHash) {
  return contract.commitState(stateHash);
}
/**
 * Generates an Arbiscan link for a transaction.
 * @param txHash Transaction hash.
 * @returns URL to view the transaction on Arbiscan.
 */
function getArbiscanTxLink(txHash) {
  return `https://goerli.arbiscan.io/tx/${txHash}`;
}
