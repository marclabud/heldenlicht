# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Install build dependencies
COPY package.json ./
RUN pnpm install

# Copy application source code and build Nuxt application
COPY . .
RUN pnpm build

# Production runtime stage
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=80 \
    NITRO_PORT=80 \
    NITRO_HOST=0.0.0.0

# Copy output bundle from builder
COPY --from=builder /app/.output /app/.output

EXPOSE 80

CMD ["node", ".output/server/index.mjs"]
