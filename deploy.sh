#!/bin/sh

echo "Deploying.."
pm2 stop api
echo "Fetching Git.."
git fetch
git reset --hard origin/main
echo "Installing dependencies.."
npm install
echo "Running build.."
npm run build
echo "Restarting server.."
pm2 restart api
service nginx restart
echo "Success!"
