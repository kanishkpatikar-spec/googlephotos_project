# ---- Build stage ----
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json ./

# Copy ALL workspace package.json files so npm can resolve the workspace graph
COPY apps/web-mvp/package.json ./apps/web-mvp/
COPY apps/web-discovery/package.json ./apps/web-discovery/
COPY packages/core/package.json ./packages/core/
COPY packages/db/package.json ./packages/db/

# Fresh npm install on Linux 
RUN npm install

# Copy the full source code
COPY . .

# Build BOTH apps to guarantee the .next directory exists for whichever one Railway tries to start
RUN npm run build --workspace=apps/web-mvp
RUN npm run build --workspace=apps/web-discovery

# ---- Production stage ----
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy everything from builder (node_modules, built app, configs)
COPY --from=builder /app ./

EXPOSE 3000

# The CMD doesn't matter much because Railway's "Custom Start Command" overrides it.
# We'll default to web-mvp if no custom start command is provided.
CMD ["npm", "run", "start", "--workspace=apps/web-mvp"]
