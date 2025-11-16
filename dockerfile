# Stage 1: Build Angular app
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the production app
RUN npm run build --prod

# Stage 2: Serve built app
FROM node:22-alpine
WORKDIR /app

# Install a simple static server
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist/garirent/browser ./dist/browser

# Expose port 4200
EXPOSE 4200

# Serve the Angular production build
CMD ["serve", "-s", "dist/browser", "-l", "4200"]
