# web-ui

Next.js application with Tailwind CSS for publishing and browsing state commitments.

Copy `.env.example` to `.env.local` and set the indexer GraphQL endpoint:

```bash
NEXT_PUBLIC_INDEXER_URL=http://localhost:4000/
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Available pages:

- `/publish` : input text, generate proof, and commit state on-chain.
- `/browse` : list committed states from the indexer, view block and Arbiscan links, search by transaction hash.
