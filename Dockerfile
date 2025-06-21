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
# Install dependencies without running postinstall scripts to avoid security audit failure
RUN npm install --ignore-scripts
COPY . .

# Set environment variables for build time
ENV VITE_APP_API_SERVER=apollo.raintech.it:3000
ENV VITE_APP_AUTHENTICATION_API_SERVER=apollo.raintech.it:3000
ENV VITE_APP_FILE_SERVER=apollo.raintech.it:3000
ENV VITE_APP_STATIC_SERVER=apollo.raintech.it:3000
ENV VITE_APP_SSL=false

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