# Multi-stage build for security and optimization
FROM node:20.12.0-alpine3.19 AS deps
# Install dependencies for security scanning
RUN apk add --no-cache curl

# Install security scanning tools
RUN npm install -g audit-ci

# Build stage
FROM node:20.12.0-alpine3.19 AS buildenv

# Build arguments for cache busting
ARG BUILD_DATE
ARG GIT_COMMIT
ARG BUILDKIT_INLINE_CACHE

RUN addgroup app && adduser -S -G app app
WORKDIR /app

# Add labels for better tracking
LABEL build_date=$BUILD_DATE
LABEL git_commit=$GIT_COMMIT

# Copy package files first
COPY package*.json ./
RUN chown -R app:app /app

# Switch to app user and install dependencies
USER app
RUN npm ci --ignore-scripts

# Copy source code and build
COPY --chown=app:app . .

# Set environment variables for build time (Vite needs these at build time)
# Use build arguments to allow customization
ENV VITE_APP_SSL=false
ENV VITE_APP_PORT=9000
ENV VITE_APP_API_SERVER=91.107.181.185:8090
ENV VITE_APP_AUTHENTICATION_API_SERVER=91.107.181.185:8080
ENV VITE_APP_FILE_SERVER=91.107.181.185:8007
ENV VITE_APP_STATIC_SERVER=91.107.181.185:8090

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