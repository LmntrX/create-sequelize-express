# Template Name: NodeJs Deployment with pm2

# Configuration
PROJECT_NAME="PROJECT_NAME_HERE"
SERVER="SERVER_NAME_HERE"
USER="SERVER_USER"
STARTER="www"

# Setup environment
echo "Setting up environment..."
ssh $USER"@"$SERVER "cd ~/ && mkdir apps/"$PROJECT_NAME" && mkdir apps/"$PROJECT_NAME"/backend"

# Trasfer Files
echo "Transferring Files..."
rsync -av -e ssh --exclude='node_modules' --exclude='.git' --exclude='.env' --exclude='uploads' ./* $USER"@"$SERVER":/home/"$USER"/apps/"$PROJECT_NAME"/backend/"

# Spin up server
echo "Spinning up server..."
ssh $USER"@"$SERVER "cd apps/"$PROJECT_NAME"/backend && npm install && pm2 stop "$STARTER" && pm2 start bin/"$STARTER" && pm2 logs"
