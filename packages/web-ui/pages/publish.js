"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Publish;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
function Publish() {
    const [input, setInput] = (0, react_1.useState)('');
    const [txLink, setTxLink] = (0, react_1.useState)('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios_1.default.post('/api/publish', { text: input });
        setTxLink(response.data.link);
    };
    return (<main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Publish State</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input className="flex-1 p-2 border rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Publish
        </button>
      </form>
      {txLink && (<p className="mt-4">
          View on Arbiscan:{' '}
          <a href={txLink} target="_blank" rel="noreferrer">
            {txLink}
          </a>
        </p>)}
    </main>);
}
