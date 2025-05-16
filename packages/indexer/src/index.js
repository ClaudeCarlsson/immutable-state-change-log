'use strict';
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var apollo_server_1 = require('apollo-server');
var sqlite_1 = require('sqlite');
var sqlite3_1 = require('sqlite3');
var ethers_1 = require('ethers');
var dotenv = require('dotenv');
dotenv.config();
var _a = process.env,
  ARBITRUM_GOERLI_RPC_URL = _a.ARBITRUM_GOERLI_RPC_URL,
  CONTRACT_ADDRESS = _a.CONTRACT_ADDRESS,
  _b = _a.SQLITE_DB_PATH,
  SQLITE_DB_PATH = _b === void 0 ? './data/indexer.db' : _b,
  _c = _a.PORT,
  PORT = _c === void 0 ? '4000' : _c;
if (!ARBITRUM_GOERLI_RPC_URL || !CONTRACT_ADDRESS) {
  throw new Error(
    'Please set ARBITRUM_GOERLI_RPC_URL and CONTRACT_ADDRESS in .env',
  );
}
var typeDefs = (0, apollo_server_1.gql)(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  type Event {\n    id: ID!\n    stateHash: String!\n    blockNumber: Int!\n    txHash: String!\n    timestamp: Int!\n  }\n  type Query {\n    events: [Event!]!\n    event(txHash: String!): Event\n  }\n',
      ],
      [
        '\n  type Event {\n    id: ID!\n    stateHash: String!\n    blockNumber: Int!\n    txHash: String!\n    timestamp: Int!\n  }\n  type Query {\n    events: [Event!]!\n    event(txHash: String!): Event\n  }\n',
      ],
    )),
);
var resolvers = {
  Query: {
    events: function (_, __, context) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            context.db.all('SELECT * FROM events ORDER BY id DESC'),
          ];
        });
      });
    },
    event: function (_, args, context) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            context.db.get(
              'SELECT * FROM events WHERE txHash = ?',
              args.txHash,
            ),
          ];
        });
      });
    },
  },
};
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var db, provider, contract, server, url;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            (0, sqlite_1.open)({
              filename: SQLITE_DB_PATH,
              driver: sqlite3_1.default.Database,
            }),
          ];
        case 1:
          db = _a.sent();
          return [
            4 /*yield*/,
            db.run(
              'CREATE TABLE IF NOT EXISTS events (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      stateHash TEXT NOT NULL,\n      blockNumber INTEGER NOT NULL,\n      txHash TEXT NOT NULL UNIQUE,\n      timestamp INTEGER NOT NULL\n    );',
            ),
          ];
        case 2:
          _a.sent();
          provider = new ethers_1.ethers.providers.JsonRpcProvider(
            ARBITRUM_GOERLI_RPC_URL,
          );
          contract = new ethers_1.ethers.Contract(
            CONTRACT_ADDRESS,
            ['event StateCommitted(bytes32 indexed stateHash)'],
            provider,
          );
          contract.on('StateCommitted', function (stateHash, event) {
            return __awaiter(_this, void 0, void 0, function () {
              var block, error_1;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/, event.getBlock()];
                  case 1:
                    block = _a.sent();
                    _a.label = 2;
                  case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [
                      4 /*yield*/,
                      db.run(
                        'INSERT OR IGNORE INTO events (stateHash, blockNumber, txHash, timestamp) VALUES (?, ?, ?, ?)',
                        stateHash,
                        event.blockNumber,
                        event.transactionHash,
                        block.timestamp,
                      ),
                    ];
                  case 3:
                    _a.sent();
                    console.log(
                      'Indexed event tx='
                        .concat(event.transactionHash, ' hash=')
                        .concat(stateHash),
                    );
                    return [3 /*break*/, 5];
                  case 4:
                    error_1 = _a.sent();
                    console.error('Failed to index event', error_1);
                    return [3 /*break*/, 5];
                  case 5:
                    return [2 /*return*/];
                }
              });
            });
          });
          server = new apollo_server_1.ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
            context: function () {
              return { db: db };
            },
          });
          return [4 /*yield*/, server.listen({ port: parseInt(PORT, 10) })];
        case 3:
          url = _a.sent().url;
          console.log(
            '\uD83D\uDE80 Indexer GraphQL server ready at '.concat(url),
          );
          return [2 /*return*/];
      }
    });
  });
}
main().catch(function (error) {
  console.error(error);
  process.exit(1);
});
var templateObject_1;
