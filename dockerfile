# Stage 1: Build Angular
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Nginx
FROM nginx:alpine

# Copy Angular build output
COPY --from=builder /app/dist/your-app-name /usr/share/nginx/html

# Copy Nginx config from project folder
COPY ./nginx/dealer-tapride.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
