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

# Copy package files first
COPY package*.json ./
RUN chown -R app:app /app

# Switch to app user and install dependencies
USER app
RUN npm ci --ignore-scripts

# Copy source code and build
COPY --chown=app:app . .
RUN npm run build

# Production stage
FROM nginx:1.25.2-alpine-slim
# Install security updates
RUN apk update && apk upgrade && \
    rm -rf /var/cache/apk/*

# Copy built application
COPY --from=buildenv /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]