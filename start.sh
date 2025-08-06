#!/bin/bash

echo "========================================"
echo "   Taskify Pro - Quick Start"
echo "========================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version: $(node --version)"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "WARNING: MongoDB is not installed or not in PATH"
    echo "Please install MongoDB or use MongoDB Atlas"
    echo
fi

echo "Installing dependencies..."
npm run install-all

echo
echo "Creating environment files..."

# Create server .env if it doesn't exist
if [ ! -f "server/.env" ]; then
    cat > server/.env << EOF
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskify
JWT_SECRET=taskify-pro-secret-key-change-in-production
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
EOF
    echo "Created server/.env"
fi

# Create client .env if it doesn't exist
if [ ! -f "client/.env" ]; then
    cat > client/.env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
    echo "Created client/.env"
fi

echo
echo "Starting the application..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:5000/api"
echo
echo "Press Ctrl+C to stop both servers"
echo

npm run dev 