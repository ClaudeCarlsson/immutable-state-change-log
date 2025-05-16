"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const zk_engine_1 = require("zk-engine");
const chain_adapter_1 = require("chain-adapter");
async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
    const { text } = req.body;
    const { proof, publicSignals } = await (0, zk_engine_1.generateProof)({ preimage: text });
    const stateHash = publicSignals[0];
    const tx = await (0, chain_adapter_1.commitState)(stateHash);
    res.status(200).json({ link: (0, chain_adapter_1.getArbiscanTxLink)(tx.hash) });
}
