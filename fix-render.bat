@echo off
echo 🔧 Fixing Render deployment issues...

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

REM Create _redirects file for SPA routing
echo 🔄 Creating _redirects file for SPA routing...
echo /*    /index.html   200 > public\_redirects
echo ✅ _redirects file created

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
echo 🚀 Next steps to fix your Render deployment:
echo.
echo 1. PUSH CHANGES TO GITHUB:
echo    git add .
echo    git commit -m "Fix Render deployment"
echo    git push origin main
echo.
echo 2. REDEPLOY ON RENDER:
echo    - Go to your Render dashboard
echo    - Click on your frontend service
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo.
echo 3. CHECK THE LOGS:
echo    - Go to "Logs" tab in your Render service
echo    - Look for any error messages
echo    - The build should now succeed
echo.
echo 4. VERIFY ENVIRONMENT VARIABLES:
echo    - Go to "Environment" tab
echo    - Ensure these are set:
echo      * VITE_API_URL=https://your-backend.onrender.com/api
echo      * VITE_SOCKET_URL=https://your-backend.onrender.com
echo.
echo 5. TEST YOUR SITE:
echo    - Visit your frontend URL
echo    - Try navigating to different pages
echo    - Check browser console for errors
echo.
echo 🔍 Common issues fixed:
echo ✅ SPA routing (_redirects file)
echo ✅ Build configuration
echo ✅ Dependencies installed
echo ✅ Production build created
echo.
echo 📖 See RENDER_TROUBLESHOOTING.md for more help
echo.
pause
