@echo off
echo 🚀 Starting SkillForge Render deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the project
echo 🔨 Building project for production...
call npm run build:render
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Check if dist folder exists
if not exist "dist" (
    echo ❌ dist folder not found. Build may have failed.
    pause
    exit /b 1
)

echo 📁 Build files are ready in the 'dist' folder
echo.
echo 🌐 Next steps for Render deployment:
echo.
echo 1. BACKEND DEPLOYMENT:
echo    - Go to https://render.com
echo    - Sign in to your account
echo    - Click "New +" → "Web Service"
echo    - Connect your GitHub repository
echo    - Configure:
echo      * Name: skillforge-backend
echo      * Environment: Node
echo      * Build Command: cd backend && npm install && npm run build
echo      * Start Command: cd backend && npm start
echo    - Add PostgreSQL database
echo    - Add Redis cache (optional)
echo    - Set environment variables
echo.
echo 2. FRONTEND DEPLOYMENT:
echo    - Click "New +" → "Static Site"
echo    - Connect your GitHub repository
echo    - Configure:
echo      * Name: skillforge-frontend
echo      * Build Command: npm install && npm run build:render
echo      * Publish Directory: dist
echo    - Set environment variables:
echo      * VITE_API_URL=https://skillforge-backend.onrender.com/api
echo      * VITE_SOCKET_URL=https://skillforge-backend.onrender.com
echo.
echo 3. ALTERNATIVE - Use render.yaml:
echo    - Push your code to GitHub
echo    - Go to Render dashboard
echo    - Click "New +" → "Blueprint"
echo    - Connect your repository
echo    - Render will automatically detect render.yaml
echo    - Deploy all services at once
echo.
echo 📋 Required Environment Variables:
echo.
echo BACKEND:
echo - NODE_ENV=production
echo - PORT=10000
echo - JWT_SECRET=your-secret-key
echo - DATABASE_URL=postgresql://...
echo - REDIS_URL=redis://... (optional)
echo - FRONTEND_URL=https://skillforge-frontend.onrender.com
echo - CLOUDINARY_CLOUD_NAME=your-cloudinary-name
echo - CLOUDINARY_API_KEY=your-cloudinary-key
echo - CLOUDINARY_API_SECRET=your-cloudinary-secret
echo - SMTP_HOST=smtp.gmail.com
echo - SMTP_PORT=587
echo - SMTP_USER=your-email@gmail.com
echo - SMTP_PASS=your-app-password
echo.
echo FRONTEND:
echo - VITE_API_URL=https://skillforge-backend.onrender.com/api
echo - VITE_SOCKET_URL=https://skillforge-backend.onrender.com
echo.
echo 📖 See RENDER_DEPLOYMENT.md for detailed instructions
echo.
pause
