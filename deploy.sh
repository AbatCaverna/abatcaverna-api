#!/bin/sh

echo "Deploying.."
sudo pm2 stop api
echo "Fetching Git.."
sudo git fetch
sudo git reset --hard origin/main
echo "Installing dependencies.."
npm install
echo "Running build.."
npm run build
echo "Restarting server.."
sudo pm2 restart api
sudo service nginx restart
echo "Success!"
