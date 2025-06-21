#!/bin/bash

# Apollo Panel Ubuntu Server Setup Script
# Initial server configuration and Docker installation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   error "This script must be run as root (use sudo)"
fi

log "🚀 Starting Apollo Panel Ubuntu Server Setup..."

# Step 1: Update system
log "1/8 - Updating system packages..."
apt update -qq
apt upgrade -y -qq

# Step 2: Install essential packages
log "2/8 - Installing essential packages..."
apt install -y -qq \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    htop \
    nginx \
    ufw

# Step 3: Install Node.js and npm
log "3/8 - Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y -qq nodejs

# Verify Node.js installation
if ! command -v node &> /dev/null; then
    error "Failed to install Node.js"
fi

log "Node.js version: $(node --version)"
log "npm version: $(npm --version)"

# Step 4: Install Docker
log "4/8 - Installing Docker..."
# Remove old versions
apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update -qq
apt install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Add current user to docker group
if [[ -n "$SUDO_USER" ]]; then
    usermod -aG docker $SUDO_USER
    log "Added user $SUDO_USER to docker group"
fi

# Verify Docker installation
if ! docker --version &> /dev/null; then
    error "Failed to install Docker"
fi

log "Docker version: $(docker --version)"

# Step 5: Install Docker Compose (standalone)
log "5/8 - Installing Docker Compose..."
DOCKER_COMPOSE_VERSION="v2.20.3"
curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
if ! docker-compose --version &> /dev/null; then
    error "Failed to install Docker Compose"
fi

log "Docker Compose version: $(docker-compose --version)"

# Step 6: Configure firewall
log "6/8 - Configuring firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp  # Apollo Panel port
ufw reload

log "Firewall configured and enabled"

# Step 7: Configure nginx as reverse proxy (optional)
log "7/8 - Configuring nginx reverse proxy..."
cat > /etc/nginx/sites-available/apollo-panel << 'EOF'
server {
    listen 80;
    server_name _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/apollo-panel /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Test nginx configuration
if nginx -t; then
    systemctl restart nginx
    systemctl enable nginx
    log "Nginx configured and enabled"
else
    warn "Nginx configuration test failed"
fi

# Step 8: Create deployment directory and clone repository
log "8/8 - Setting up deployment directory..."
DEPLOY_DIR="/opt/apollo-panel"
mkdir -p $DEPLOY_DIR
cd $DEPLOY_DIR

# Clone repository if not exists
if [[ ! -d ".git" ]]; then
    log "Cloning repository..."
    # Note: You'll need to update this with your actual repository URL
    # git clone https://github.com/your-username/apollo-panel.git .
    log "Please clone your repository to $DEPLOY_DIR"
fi

# Set proper permissions
chown -R $SUDO_USER:$SUDO_USER $DEPLOY_DIR 2>/dev/null || true

# Create systemd service for auto-restart
cat > /etc/systemd/system/apollo-panel.service << EOF
[Unit]
Description=Apollo Panel Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$DEPLOY_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable apollo-panel.service

log "✅ Ubuntu server setup completed successfully!"
log ""
log "📋 Next steps:"
log "1. Clone your repository to $DEPLOY_DIR"
log "2. Run: cd $DEPLOY_DIR && sudo ./deploy.sh"
log "3. Access your application at: http://$(hostname -I | awk '{print $1}')"
log ""
log "🔧 Useful commands:"
log "- Check status: systemctl status apollo-panel"
log "- View logs: docker logs frontend-apollo"
log "- Restart service: systemctl restart apollo-panel"
log "- Check firewall: ufw status"
log ""
log "⚠️  Important:"
log "- Log out and log back in for docker group changes to take effect"
log "- Update the git clone command with your actual repository URL" 