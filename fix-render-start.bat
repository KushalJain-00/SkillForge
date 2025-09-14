@echo off
echo 🔧 Fixing Render start script issue...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the project
echo 🔨 Building project...
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
echo 🚀 The issue was: Render was looking for a 'start' script that didn't exist
echo ✅ Fixed by: Adding start script and updating render.yaml configuration
echo.
echo 📋 Next steps:
echo.
echo 1. PUSH CHANGES TO GITHUB:
echo    git add .
echo    git commit -m "Fix Render start script issue"
echo    git push origin main
echo.
echo 2. REDEPLOY ON RENDER:
echo    - Go to your Render dashboard
echo    - Click on your frontend service
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo.
echo 3. ALTERNATIVE - RECREATE SERVICE:
echo    If redeploy doesn't work:
echo    - Delete the current frontend service
echo    - Create new "Static Site" (not Web Service)
echo    - Build Command: npm install && npm run build:render
echo    - Publish Directory: dist
echo    - Environment Variables:
echo      * VITE_API_URL=https://skillforge-backend.onrender.com/api
echo      * VITE_SOCKET_URL=https://skillforge-backend.onrender.com
echo.
echo 🔍 What was fixed:
echo ✅ Added start script to package.json
echo ✅ Changed render.yaml from 'web' to 'static' service
echo ✅ Build command uses npm instead of yarn
echo ✅ SPA routing configured with _redirects file
echo.
echo 📖 See RENDER_START_SCRIPT_FIX.md for detailed explanation
echo.
pause
