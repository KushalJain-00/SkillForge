#!/bin/bash

# SkillForge Deployment Script
# This script deploys both frontend and backend to production

set -e

echo "🚀 Starting SkillForge deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_error ".env file not found! Please create one from env.example"
    exit 1
fi

# Load environment variables
source .env

# Check required environment variables
required_vars=("JWT_SECRET" "CLOUDINARY_CLOUD_NAME" "CLOUDINARY_API_KEY" "CLOUDINARY_API_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        print_error "Required environment variable $var is not set"
        exit 1
    fi
done

print_status "Environment variables validated ✓"

# Build frontend
print_status "Building frontend..."
cd frontend || { print_error "Frontend directory not found"; exit 1; }
npm install
npm run build
print_status "Frontend built successfully ✓"

# Build backend
print_status "Building backend..."
cd ../backend || { print_error "Backend directory not found"; exit 1; }
npm install
npm run build
print_status "Backend built successfully ✓"

# Go back to root
cd ..

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Build and start production containers
print_status "Building and starting production containers..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check if services are running
print_status "Checking service health..."

# Check backend health
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    print_status "Backend is healthy ✓"
else
    print_error "Backend health check failed"
    docker-compose -f docker-compose.prod.yml logs backend
    exit 1
fi

# Check frontend
if curl -f http://localhost:80 > /dev/null 2>&1; then
    print_status "Frontend is healthy ✓"
else
    print_error "Frontend health check failed"
    docker-compose -f docker-compose.prod.yml logs frontend
    exit 1
fi

# Run database migrations
print_status "Running database migrations..."
docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy

print_status "🎉 Deployment completed successfully!"
print_status "Frontend: http://localhost:80"
print_status "Backend API: http://localhost:3001"
print_status "Health Check: http://localhost:3001/health"

# Show running containers
print_status "Running containers:"
docker-compose -f docker-compose.prod.yml ps
