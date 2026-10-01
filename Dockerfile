# ---- Build stage ----
FROM node:20-slim AS builder

WORKDIR /app

# Copy the monorepo root package.json (needed for workspace resolution)
COPY package.json ./

# Copy ALL workspace package.json files so npm can resolve the workspace graph
COPY apps/web-mvp/package.json ./apps/web-mvp/
COPY apps/web-discovery/package.json ./apps/web-discovery/
COPY packages/core/package.json ./packages/core/
COPY packages/db/package.json ./packages/db/

# Fresh npm install on Linux — no lockfile from Windows, no cached node_modules
# This ensures lightningcss-linux-x64-gnu is properly resolved and installed
RUN npm install

# Copy the full source code
COPY . .

# Build only the web-mvp app
RUN npm run build --workspace=apps/web-mvp

# ---- Production stage ----
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy everything from builder (node_modules, built app, configs)
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=apps/web-mvp"]
