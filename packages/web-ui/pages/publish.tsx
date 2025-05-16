import { useState } from 'react';
import axios from 'axios';

export default function Publish() {
  const [input, setInput] = useState('');
  const [txLink, setTxLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/publish', { text: input });
    setTxLink(response.data.link);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Publish State</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Publish
        </button>
      </form>
      {txLink && (
        <p className="mt-4">
          View on Arbiscan:{' '}
          <a href={txLink} target="_blank" rel="noreferrer">
            {txLink}
          </a>
        </p>
      )}
    </main>
  );
}
