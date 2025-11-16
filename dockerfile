FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist/garirent/browser ./app
EXPOSE 4200
CMD ["serve", "-s", "app", "-l", "4200"]
