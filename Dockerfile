# Use Node.js 20 LTS as base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --omit=dev

# Build stage
FROM base AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source files and tsconfig
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npx tsc --build

# Production stage
FROM base AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 mcpserver

# Copy necessary files from deps and builder
COPY --from=deps --chown=mcpserver:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=mcpserver:nodejs /app/dist ./dist
COPY --chown=mcpserver:nodejs package.json ./

# Copy data directory
COPY --chown=mcpserver:nodejs data ./data

# Switch to non-root user
USER mcpserver

# Expose the default port
EXPOSE 3000

# Set the entrypoint
CMD ["node", "dist/index.js"]
