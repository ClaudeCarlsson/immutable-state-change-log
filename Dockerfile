FROM node:20-alpine AS dev
WORKDIR /app

# Copy only the JSON manifests first (for layer caching)
COPY package.json       package-lock.json ./
COPY packages/*/package.json ./packages/*/

# Now install exactly what’s in the lockfile
RUN npm ci

# Finally, copy the rest of your code
COPY . .

# Build all TypeScript packages
RUN npm run build

# Default to shell; override as needed
CMD ["sh"]