#!/bin/bash

# Fix Docker Permissions Script
# Run this once on your server to allow your user to run Docker without sudo

echo "🔧 Fixing Docker permissions for user: $USER"

# Add user to docker group
sudo usermod -aG docker $USER

# Apply group changes immediately
newgrp docker << 'EOF'
echo "✅ Docker group membership updated"
echo "Testing docker access..."
if docker info > /dev/null 2>&1; then
    echo "✅ Docker is now accessible without sudo!"
else
    echo "❌ Docker still requires sudo. You may need to log out and log back in."
fi
EOF

echo "🎉 Docker permissions fix completed!"
echo "If docker still requires sudo after this, please log out and log back in to your server." 