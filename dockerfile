# Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Serve Angular app on all network interfaces
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
