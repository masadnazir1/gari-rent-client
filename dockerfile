# Stage 1: Build Angular app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Stage 2: Serve app with Nginx
FROM nginx:alpine

# Copy Angular build output to Nginx html folder
COPY --from=builder /app/dist/garirent /usr/share/nginx/html

# Copy custom Nginx config
COPY ./nginx/dealer-tapride.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
