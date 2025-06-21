# Multi-stage build for security and optimization
FROM node:20.12.0-alpine3.19 AS deps
# Install dependencies for security scanning
RUN apk add --no-cache curl

# Install security scanning tools
RUN npm install -g audit-ci

# Build stage
FROM node:20.12.0-alpine3.19 AS buildenv
RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN chmod 777 /app
USER app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.25.2-alpine-slim
# Install security updates
RUN apk update && apk upgrade && \
    rm -rf /var/cache/apk/*

# Copy built application
COPY --from=buildenv /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: Hide nginx version
RUN echo "server_tokens off;" >> /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]