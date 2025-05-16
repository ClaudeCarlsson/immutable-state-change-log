import type { NextApiRequest, NextApiResponse } from 'next';
import { generateProof } from 'zk-engine';
import { commitState, getArbiscanTxLink } from 'chain-adapter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { text } = req.body;
  const { proof, publicSignals } = await generateProof({ preimage: text });
  const stateHash = publicSignals[0];
  const tx = await commitState(stateHash);
  res.status(200).json({ link: getArbiscanTxLink(tx.hash) });
}
