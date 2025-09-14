#!/bin/bash

echo "🚀 Starting SkillForge deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "🔨 Building frontend for production..."
npm run build:render

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🔨 Building backend..."
npm run build

echo "✅ Build completed successfully!"
echo "🚀 Ready for deployment on Render!"

cd ..