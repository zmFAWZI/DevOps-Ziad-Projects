FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

# Create non-root user first
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Give ownership to appuser
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5000

CMD ["node", "server.js"]