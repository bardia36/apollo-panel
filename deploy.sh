#!/bin/bash

# Apollo Panel Ubuntu Server Deployment Script
# Optimized for production Ubuntu server deployment

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

# Check if running as root (recommended for server deployment)
if [[ $EUID -ne 0 ]]; then
   warn "This script is not running as root. Some operations may require sudo."
   
   # In CI/CD environments, try to use sudo for operations that need it
   if [[ -n "$CI" ]] || [[ -n "$GITHUB_ACTIONS" ]]; then
       log "Running in CI/CD environment, will use sudo for privileged operations"
       SUDO_CMD="sudo"
   else
       log "For best results, run with sudo: sudo ./deploy.sh"
       read -p "Continue anyway? (y/N): " -n 1 -r
       echo
       if [[ ! $REPLY =~ ^[Yy]$ ]]; then
           error "Please run as root or with sudo"
       fi
       SUDO_CMD="sudo"
   fi
else
   SUDO_CMD=""
fi

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    error "Docker is not installed. Please install Docker first."
fi

if ! docker info > /dev/null 2>&1; then
    if [[ $EUID -ne 0 ]]; then
        error "Docker service is not running or you don't have permission. Try: sudo systemctl start docker && sudo usermod -aG docker $USER"
    else
        error "Docker service is not running. Please start Docker: sudo systemctl start docker"
    fi
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    error "Docker Compose is not available. Please install Docker Compose."
fi

# Check if required files exist
if [[ ! -f "Dockerfile" ]]; then
    error "Dockerfile not found in current directory"
fi

if [[ ! -f "docker-compose.yml" ]]; then
    error "docker-compose.yml not found in current directory"
fi

log "Starting Ubuntu server deployment process..."

# Step 1: Update system packages (if running as root)
if [[ $EUID -eq 0 ]] || [[ -n "$SUDO_CMD" ]]; then
    log "1/9 - Updating system packages..."
    $SUDO_CMD apt update -qq
    $SUDO_CMD apt upgrade -y -qq
else
    log "1/9 - Skipping system package updates (no root privileges)"
fi

# Step 2: Pull latest changes
log "2/9 - Pulling latest changes from repository..."
if ! git pull origin review; then
    error "Failed to pull changes from repository"
fi

# Step 3: Security audit
log "3/9 - Running security audit..."
if command -v npm &> /dev/null; then
    # Non-interactive audit for CI/CD environments
    if [[ -n "$CI" ]] || [[ -n "$GITHUB_ACTIONS" ]]; then
        log "Running non-interactive security audit..."
        npm audit --audit-level=moderate --progress=false || {
            warn "Security vulnerabilities found in CI environment. Continuing deployment..."
        }
    else
        if ! npm audit --audit-level=moderate; then
            warn "Security vulnerabilities found. Please review and fix before deployment."
            read -p "Continue with deployment? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                error "Deployment cancelled due to security concerns"
            fi
        fi
    fi
else
    warn "npm not found. Skipping security audit."
    log "To enable security audits, install Node.js and npm first."
fi

# Step 3.5: Setup environment file
log "3.5/8 - Setting up environment file..."
if [[ ! -f ".env" ]]; then
    if [[ -f "env.example" ]]; then
        log "Creating .env file from env.example template"
        cp env.example .env
    else
        warn "No .env or env.example file found. Creating basic .env file"
        cat > .env << 'EOF'
VITE_APP_API_SERVER=91.107.181.185:8090
VITE_APP_AUTHENTICATION_API_SERVER=91.107.181.185:8080
VITE_APP_FILE_SERVER=91.107.181.185:8007
VITE_APP_STATIC_SERVER=91.107.181.185:8090
VITE_APP_SSL=false
VITE_APP_PORT=9000
EOF
    fi
else
    log ".env file already exists, using existing configuration"
fi

# Step 4: Create backup
log "4/9 - Creating backup of current deployment..."
if docker ps -q -f name=frontend-apollo | grep -q .; then
    docker tag apollo-panel:latest apollo-panel:backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
    log "Backup created: apollo-panel:backup-$(date +%Y%m%d-%H%M%S)"
fi

# Step 5: Build new image
log "5/9 - Building new Docker image..."
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_COMMIT=$(git rev-parse HEAD)
export BUILD_DATE
export GIT_COMMIT

if ! docker build . -t apollo-panel:latest --no-cache --build-arg BUILD_DATE="$BUILD_DATE" --build-arg GIT_COMMIT="$GIT_COMMIT"; then
    error "Failed to build Docker image"
fi

# Step 6: Stop and remove old container
log "6/9 - Stopping and removing old container..."
docker stop frontend-apollo 2>/dev/null || true
docker rm frontend-apollo 2>/dev/null || true

# Step 7: Clean up old images and containers
log "7/9 - Cleaning up old images and containers..."
docker container prune -f
docker image prune -f

# Step 8: Deploy new version
log "8/9 - Deploying new version..."
if ! docker-compose down -v 2>/dev/null; then
    docker compose down -v 2>/dev/null || true
fi

# Force rebuild without cache using docker-compose
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_COMMIT=$(git rev-parse HEAD)
export BUILD_DATE
export GIT_COMMIT

if ! BUILD_DATE="$BUILD_DATE" GIT_COMMIT="$GIT_COMMIT" docker-compose build --no-cache 2>/dev/null; then
    if ! BUILD_DATE="$BUILD_DATE" GIT_COMMIT="$GIT_COMMIT" docker compose build --no-cache; then
        error "Failed to build containers"
    fi
fi

if ! docker-compose up -d 2>/dev/null; then
    if ! docker compose up -d; then
        error "Failed to start new containers"
    fi
fi

# Wait for container to start
log "Waiting for container to start..."
sleep 20

# Final verification
log "9/9 - Performing final verification..."
if docker ps -q -f name=frontend-apollo | grep -q .; then
    log "✅ Deployment completed successfully!"
    log "Application is running at: http://$(hostname -I | awk '{print $1}'):3000"
    
    # Check if nginx is responding
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|404"; then
        log "✅ Nginx is responding correctly"
    else
        warn "⚠️  Nginx may not be responding correctly. Check logs with: docker logs frontend-apollo"
    fi
else
    error "❌ Deployment verification failed"
fi

# Cleanup old backups (keep last 5)
log "Cleaning up old backups..."
docker images apollo-panel:backup-* --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | \
    tail -n +6 | awk '{print $1}' | xargs -r docker rmi 2>/dev/null || true

# Show container status
log "Container status:"
docker ps --filter name=frontend-apollo

log "🎉 Ubuntu server deployment completed successfully!"
log "📋 Next steps:"
log "   - Check logs: docker logs frontend-apollo"
log "   - Monitor resources: docker stats"
log "   - Set up reverse proxy (nginx/apache) if needed"
log "   - Configure firewall rules"
