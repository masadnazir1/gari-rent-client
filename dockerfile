FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist/garirent ./dist/garirent
RUN npm install express
EXPOSE 4200
CMD ["node", "dist/garirent/server/server.mjs"]
