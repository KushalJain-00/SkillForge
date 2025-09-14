@echo off
echo 🔧 Fixing Render URL issue - Updated to skillforge-rdnd.onrender.com...

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
echo 🚀 The issue was: Backend URL changed to 'skillforge-rdnd.onrender.com'
echo ✅ Fixed by: Updated render.yaml and CORS configuration
echo.
echo 📋 Next steps:
echo.
echo 1. PUSH CHANGES TO GITHUB:
echo    git add .
echo    git commit -m "Update backend URL to skillforge-rdnd.onrender.com"
echo    git push origin main
echo.
echo 2. REDEPLOY BOTH SERVICES ON RENDER:
echo    - Go to your Render dashboard
echo    - Click on your FRONTEND service
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo    - Click on your BACKEND service
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo.
echo 3. UPDATE ENVIRONMENT VARIABLES IN RENDER DASHBOARD:
echo    Frontend service should have:
echo    - VITE_API_URL=https://skillforge-rdnd.onrender.com/api
echo    - VITE_SOCKET_URL=https://skillforge-rdnd.onrender.com
echo.
echo    Backend service should have:
echo    - FRONTEND_URL=https://your-frontend-url.onrender.com
echo.
echo 🔍 What was updated:
echo ✅ Updated render.yaml with new backend URL
echo ✅ Added new backend domain to CORS allowed origins
echo ✅ Build configuration remains optimized
echo ✅ Vite allowedHosts: "all" already configured
echo.
echo 📖 The backend URL keeps changing - this is normal for Render
echo    Each time you redeploy, Render may assign a new URL
echo.
echo 🎉 Your app should now work with the new backend URL!
echo.
pause
