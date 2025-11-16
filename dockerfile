FROM node:22-alpine
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Expose port 4200
EXPOSE 4200

# Start Angular dev server on 0.0.0.0 so Docker can forward it
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
