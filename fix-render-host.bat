@echo off
echo 🔧 Fixing Render host blocking issue...

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
echo 🚀 The issue was: Vite was blocking requests to 'skillforge-txns.onrender.com'
echo ✅ Fixed by: Adding allowedHosts: "all" to vite.config.ts
echo.
echo 📋 Next steps:
echo.
echo 1. PUSH CHANGES TO GITHUB:
echo    git add .
echo    git commit -m "Fix Render host blocking issue"
echo    git push origin main
echo.
echo 2. REDEPLOY BOTH SERVICES ON RENDER:
echo    - Go to your Render dashboard
echo    - Click on your FRONTEND service
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo    - Click on your BACKEND service
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo.
echo 3. VERIFY ENVIRONMENT VARIABLES:
echo    Frontend should have:
echo    - VITE_API_URL=https://skillforge-txns.onrender.com/api
echo    - VITE_SOCKET_URL=https://skillforge-txns.onrender.com
echo.
echo    Backend should have:
echo    - FRONTEND_URL=https://your-frontend-url.onrender.com
echo.
echo 🔍 What was fixed:
echo ✅ Added allowedHosts: "all" to vite.config.ts
echo ✅ Updated API URLs to use correct backend URL
echo ✅ Updated CORS configuration to allow backend domain
echo ✅ Build configuration optimized for Render
echo.
echo 📖 See RENDER_HOST_FIX.md for detailed explanation
echo.
echo 🎉 Your app should now work without host blocking errors!
echo.
pause
