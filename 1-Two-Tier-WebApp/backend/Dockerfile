FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]
