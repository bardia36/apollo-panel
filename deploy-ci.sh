#!/bin/bash

# Apollo Panel CI/CD Deployment Script
# Optimized for non-interactive CI/CD environments

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
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

log "🚀 Starting CI/CD Apollo Panel deployment..."

# Set environment variables for CI/CD
export CI=true
export DEBIAN_FRONTEND=noninteractive

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    error "Docker is not installed. Please install Docker first."
fi

if ! docker info > /dev/null 2>&1; then
    error "Docker service is not running or permission denied."
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    error "Docker Compose is not available."
fi

# Check if required files exist
if [[ ! -f "Dockerfile" ]]; then
    error "Dockerfile not found in current directory"
fi

if [[ ! -f "docker-compose.yml" ]]; then
    error "docker-compose.yml not found in current directory"
fi

# Step 1: Pull latest changes
log "1/6 - Pulling latest changes from repository..."
git pull origin review || {
    warn "Failed to pull changes, continuing with current code..."
}

# Step 2: Setup environment file
log "2/6 - Setting up environment file..."
if [[ ! -f ".env" ]]; then
    if [[ -f "env.example" ]]; then
        log "Creating .env file from env.example template"
        cp env.example .env
    else
        log "Creating basic .env file"
        cat > .env << 'EOF'
VITE_APP_API_SERVER=91.107.181.185:8090
VITE_APP_AUTHENTICATION_API_SERVER=91.107.181.185:8080
VITE_APP_FILE_SERVER=91.107.181.185:8007
VITE_APP_STATIC_SERVER=91.107.181.185:8090
VITE_APP_SSL=false
VITE_APP_PORT=9000
EOF
    fi
fi

# Step 3: Create backup
log "3/6 - Creating backup of current deployment..."
if docker ps -q -f name=frontend-apollo | grep -q .; then
    docker tag apollo-panel:latest apollo-panel:backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
    log "Backup created successfully"
fi

# Step 4: Stop existing containers
log "4/6 - Stopping existing containers..."
docker-compose down -v 2>/dev/null || docker compose down -v 2>/dev/null || true
docker stop frontend-apollo 2>/dev/null || true
docker rm frontend-apollo 2>/dev/null || true

# Step 5: Build and deploy
log "5/6 - Building and deploying new version..."
if ! docker-compose up --build -d 2>/dev/null; then
    if ! docker compose up --build -d; then
        error "Failed to start new containers"
    fi
fi

# Step 6: Verify deployment
log "6/6 - Verifying deployment..."
sleep 30  # Wait longer for container to fully start

# Check if container is running
if docker ps -q -f name=frontend-apollo | grep -q .; then
    log "✅ Container is running"
    
    # Check if service is responding
    for i in {1..10}; do
        if curl -s -f http://localhost:3000 >/dev/null 2>&1; then
            log "✅ Service is responding correctly"
            break
        elif [[ $i -eq 10 ]]; then
            warn "Service may not be responding correctly"
            docker logs frontend-apollo --tail=20
        else
            log "Waiting for service to respond... (attempt $i/10)"
            sleep 10
        fi
    done
else
    error "❌ Container failed to start"
fi

# Cleanup old images
log "Cleaning up old images..."
docker image prune -f || true
docker container prune -f || true

# Cleanup old backups (keep last 3)
docker images apollo-panel:backup-* --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | \
    tail -n +4 | awk '{print $1}' | xargs -r docker rmi 2>/dev/null || true

log "🎉 CI/CD deployment completed successfully!"
log "Application is available at: http://$(hostname -I | awk '{print $1}'):3000"

# Show final status
log "Final container status:"
docker ps --filter name=frontend-apollo --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 