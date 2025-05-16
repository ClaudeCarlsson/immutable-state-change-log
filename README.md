 # immutable-state-change-log Monorepo

 This repository is a monorepo that includes the following packages:

 - **zk-engine**
 - **chain-adapter**
 - **indexer**
 - **web-ui**

 ## Setup

 ```bash
 npm install
 npm run prepare   # setup Husky git hooks
 npm run build     # build all packages
 ```

 ## Available Scripts

 - `npm run lint`       – Run ESLint across the monorepo.
 - `npm run lint:fix`   – Auto-fix lint errors.
 - `npm run format`     – Format code with Prettier.
 - `npm run build`      – Build all packages.
 - `npm run test`       – Run tests (placeholder).

## Docker

You can build and run the project in a containerized development environment using Docker Compose:

```bash
# Build the development image
docker-compose build

# Start a shell in the development container
docker-compose run dev

# Or bring up the containerized environment
docker-compose up
```

Inside the container, you can run any npm scripts, for example:
- `npm run lint`
- `npm run build`
- `npm run test`

## Husky Hooks

 > If the Husky hooks are not installed after `npm install`, run:

 ```bash
 git config core.hooksPath .husky
 ```