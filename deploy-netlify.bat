@echo off
echo 🚀 Starting SkillForge Netlify deployment...

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
call npm run build:netlify
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
echo 🌐 Next steps:
echo 1. Go to https://netlify.com
echo 2. Sign in to your account
echo 3. Drag and drop the 'dist' folder to deploy
echo 4. Or connect your GitHub repository for continuous deployment
echo.
echo 📋 Don't forget to:
echo - Set environment variables in Netlify dashboard
echo - Deploy your backend to Railway/Render/Heroku
echo - Update VITE_API_URL and VITE_SOCKET_URL with your backend URL
echo.
echo 📖 See NETLIFY_DEPLOYMENT.md for detailed instructions
echo.
pause
