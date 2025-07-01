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

# Check Docker permissions and try to fix if needed
if ! docker info > /dev/null 2>&1; then
    warn "Docker permission denied. Attempting to fix..."
    
    # Try to add current user to docker group if not already
    if ! groups $USER | grep -q docker; then
        warn "User $USER is not in docker group. This might require server setup."
        log "Run this on the server: sudo usermod -aG docker $USER && newgrp docker"
    fi
    
    # Try with sudo as fallback for this one command
    if sudo docker info > /dev/null 2>&1; then
        warn "Docker works with sudo. Using sudo for docker commands..."
        DOCKER_CMD="sudo docker"
        DOCKER_COMPOSE_CMD="sudo docker-compose"
    else
        error "Docker service is not running or permission denied."
    fi
else
    DOCKER_CMD="docker"
    DOCKER_COMPOSE_CMD="docker-compose"
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    error "Docker Compose is not available."
fi

# Use docker compose if docker-compose not available
if ! command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="$DOCKER_CMD compose"
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
if $DOCKER_CMD ps -q -f name=frontend-apollo | grep -q .; then
    $DOCKER_CMD tag apollo-panel:latest apollo-panel:backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
    log "Backup created successfully"
fi

# Step 4: Stop existing containers and cleanup
log "4/6 - Stopping existing containers and cleaning up..."
$DOCKER_COMPOSE_CMD down -v 2>/dev/null || $DOCKER_CMD compose down -v 2>/dev/null || true
$DOCKER_CMD stop frontend-apollo 2>/dev/null || true
$DOCKER_CMD rm frontend-apollo 2>/dev/null || true

# Remove old images to force fresh build
log "Removing old images to ensure fresh build..."
$DOCKER_CMD rmi apollo-panel:latest 2>/dev/null || true
$DOCKER_CMD rmi apollo-panel_frontend-apollo 2>/dev/null || true
$DOCKER_CMD system prune -f || true

# Step 5: Build and deploy
log "5/6 - Building and deploying new version..."

# Set build arguments for cache busting
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_COMMIT=$(git rev-parse HEAD)
export BUILD_DATE
export GIT_COMMIT

# Export environment variables for build args
export VITE_APP_SSL=${VITE_APP_SSL:-false}
export VITE_APP_PORT=${VITE_APP_PORT:-9000}
export VITE_APP_API_SERVER=${VITE_APP_API_SERVER:-91.107.181.185:8090}
export VITE_APP_AUTHENTICATION_API_SERVER=${VITE_APP_AUTHENTICATION_API_SERVER:-91.107.181.185:8080}
export VITE_APP_FILE_SERVER=${VITE_APP_FILE_SERVER:-91.107.181.185:8007}
export VITE_APP_STATIC_SERVER=${VITE_APP_STATIC_SERVER:-91.107.181.185:8090}

# Force rebuild without cache
log "Building with no cache to ensure fresh deployment..."
if ! BUILD_DATE="$BUILD_DATE" GIT_COMMIT="$GIT_COMMIT" $DOCKER_COMPOSE_CMD build --no-cache 2>/dev/null; then
    if ! BUILD_DATE="$BUILD_DATE" GIT_COMMIT="$GIT_COMMIT" $DOCKER_CMD compose build --no-cache; then
        error "Failed to build containers"
    fi
fi

# Start the containers
if ! $DOCKER_COMPOSE_CMD up -d 2>/dev/null; then
    if ! $DOCKER_CMD compose up -d; then
        error "Failed to start new containers"
    fi
fi

# Step 6: Verify deployment
log "6/6 - Verifying deployment..."
sleep 30  # Wait longer for container to fully start

# Check if container is running
if $DOCKER_CMD ps -q -f name=frontend-apollo | grep -q .; then
    log "✅ Container is running"
    
    # Check if service is responding
    for i in {1..10}; do
        if curl -s -f http://localhost:3000 >/dev/null 2>&1; then
            log "✅ Service is responding correctly"
            break
        elif [[ $i -eq 10 ]]; then
            warn "Service may not be responding correctly"
            $DOCKER_CMD logs frontend-apollo --tail=20
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
$DOCKER_CMD image prune -f || true
$DOCKER_CMD container prune -f || true

# Cleanup old backups (keep last 3)
$DOCKER_CMD images apollo-panel:backup-* --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | \
    tail -n +4 | awk '{print $1}' | xargs -r $DOCKER_CMD rmi 2>/dev/null || true

log "🎉 CI/CD deployment completed successfully!"
log "Application is available at: http://$(hostname -I | awk '{print $1}'):3000"

# Show final status
log "Final container status:"
$DOCKER_CMD ps --filter name=frontend-apollo --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 