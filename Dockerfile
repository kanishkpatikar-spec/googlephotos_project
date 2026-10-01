# ---- Build stage ----
FROM node:20-slim AS builder

WORKDIR /app

# The APP_NAME arg determines which workspace to build.
# Default to web-mvp, but Railway can override it using build args.
ARG APP_NAME=web-mvp

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

# Build the specified app
RUN npm run build --workspace=apps/${APP_NAME}

# ---- Production stage ----
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Re-declare ARG in this stage so we can use it
ARG APP_NAME=web-mvp
ENV APP_NAME=${APP_NAME}

# Copy everything from builder (node_modules, built app, configs)
COPY --from=builder /app ./

EXPOSE 3000

# Start the dynamically chosen app
CMD npm run start --workspace=apps/${APP_NAME}
