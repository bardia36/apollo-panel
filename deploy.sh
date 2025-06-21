#!/bin/bash

# Apollo Panel Secure Deployment Script
# This script includes security checks and safe deployment procedures

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root for security reasons"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker and try again."
fi

# Check if required files exist
if [[ ! -f "Dockerfile" ]]; then
    error "Dockerfile not found in current directory"
fi

if [[ ! -f "docker-compose.yml" ]]; then
    error "docker-compose.yml not found in current directory"
fi

log "Starting secure deployment process..."

# Step 1: Pull latest changes
log "1/7 - Pulling latest changes from repository..."
if ! git pull origin review; then
    error "Failed to pull changes from repository"
fi

# Step 2: Security audit
log "2/7 - Running security audit..."
if ! npm audit --audit-level=moderate; then
    warn "Security vulnerabilities found. Please review and fix before deployment."
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "Deployment cancelled due to security concerns"
    fi
fi

# Step 3: Create backup
log "3/7 - Creating backup of current deployment..."
if docker ps -q -f name=frontend-apollo | grep -q .; then
    docker tag apollo-panel:latest apollo-panel:backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
    log "Backup created: apollo-panel:backup-$(date +%Y%m%d-%H%M%S)"
fi

# Step 4: Build new image with security checks
log "4/7 - Building new Docker image with security checks..."
if ! docker build . -t apollo-panel:latest --no-cache; then
    error "Failed to build Docker image"
fi

# Step 5: Security scan of the image
log "5/7 - Running security scan on Docker image..."
# Note: In production, you might want to use tools like Trivy or Snyk
if command -v trivy &> /dev/null; then
    if ! trivy image --severity HIGH,CRITICAL apollo-panel:latest; then
        warn "Security vulnerabilities detected in Docker image"
        read -p "Continue with deployment? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Deployment cancelled due to security vulnerabilities"
        fi
    fi
else
    warn "Trivy not installed. Skipping image security scan."
fi

# Step 6: Stop and remove old container
log "6/7 - Stopping and removing old container..."
docker stop frontend-apollo 2>/dev/null || true
docker rm frontend-apollo 2>/dev/null || true

# Step 7: Deploy new version
log "7/7 - Deploying new version..."
if ! docker compose down -v; then
    error "Failed to stop existing containers"
fi

if ! docker compose up --build -d; then
    error "Failed to start new containers"
fi

# Wait for container to start
log "Waiting for container to start..."
sleep 10

# Final verification
log "Performing final verification..."
if docker ps -q -f name=frontend-apollo | grep -q .; then
    log "✅ Deployment completed successfully!"
    log "Application is running at: http://localhost:3000"
else
    error "❌ Deployment verification failed"
fi

# Cleanup old backups (keep last 5)
log "Cleaning up old backups..."
docker images apollo-panel:backup-* --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | \
    tail -n +6 | awk '{print $1}' | xargs -r docker rmi 2>/dev/null || true

log "🎉 Secure deployment completed successfully!"
