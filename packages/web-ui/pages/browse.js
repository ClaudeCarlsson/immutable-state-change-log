"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Browse;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
function Browse() {
    const [events, setEvents] = (0, react_1.useState)([]);
    const [filter, setFilter] = (0, react_1.useState)('');
    const [filtered, setFiltered] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        async function fetchEvents() {
            const res = await axios_1.default.post(process.env.NEXT_PUBLIC_INDEXER_URL, {
                query: `query { events { id stateHash blockNumber txHash timestamp } }`,
            });
            setEvents(res.data.data.events);
            setFiltered(res.data.data.events);
        }
        fetchEvents();
    }, []);
    (0, react_1.useEffect)(() => {
        setFiltered(events.filter((e) => filter ? e.txHash.toLowerCase().includes(filter.toLowerCase()) : true));
    }, [filter, events]);
    return (<main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse States</h1>
      <input className="p-2 border rounded mb-4" placeholder="Search by tx hash" value={filter} onChange={(e) => setFilter(e.target.value)}/>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">State Hash</th>
            <th className="border px-2 py-1">Block</th>
            <th className="border px-2 py-1">Tx Hash</th>
            <th className="border px-2 py-1">Arbiscan</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (<tr key={e.id}>
              <td className="border px-2 py-1">{e.id}</td>
              <td className="border px-2 py-1">
                <code>{e.stateHash}</code>
              </td>
              <td className="border px-2 py-1">{e.blockNumber}</td>
              <td className="border px-2 py-1">
                <code>{e.txHash}</code>
              </td>
              <td className="border px-2 py-1">
                <a href={`https://goerli.arbiscan.io/tx/${e.txHash}`} target="_blank" rel="noreferrer" className="text-blue-500">
                  View
                </a>
              </td>
            </tr>))}
        </tbody>
      </table>
    </main>);
}
