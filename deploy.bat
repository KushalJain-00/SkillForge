@echo off
REM SkillForge Deployment Script for Windows
REM This script deploys both frontend and backend to production

echo 🚀 Starting SkillForge deployment...

REM Check if .env file exists
if not exist .env (
    echo [ERROR] .env file not found! Please create one from env.example
    exit /b 1
)

echo [INFO] Environment file found ✓

REM Build frontend
echo [INFO] Building frontend...
cd frontend
if not exist package.json (
    echo [ERROR] Frontend directory not found
    exit /b 1
)
call npm install
call npm run build
echo [INFO] Frontend built successfully ✓

REM Build backend
echo [INFO] Building backend...
cd ..\backend
if not exist package.json (
    echo [ERROR] Backend directory not found
    exit /b 1
)
call npm install
call npm run build
echo [INFO] Backend built successfully ✓

REM Go back to root
cd ..

REM Stop existing containers
echo [INFO] Stopping existing containers...
docker-compose -f docker-compose.prod.yml down

REM Build and start production containers
echo [INFO] Building and starting production containers...
docker-compose -f docker-compose.prod.yml up --build -d

REM Wait for services to be ready
echo [INFO] Waiting for services to be ready...
timeout /t 30 /nobreak > nul

REM Check if services are running
echo [INFO] Checking service health...

REM Check backend health
curl -f http://localhost:3001/health > nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Backend is healthy ✓
) else (
    echo [ERROR] Backend health check failed
    docker-compose -f docker-compose.prod.yml logs backend
    exit /b 1
)

REM Check frontend
curl -f http://localhost:80 > nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Frontend is healthy ✓
) else (
    echo [ERROR] Frontend health check failed
    docker-compose -f docker-compose.prod.yml logs frontend
    exit /b 1
)

REM Run database migrations
echo [INFO] Running database migrations...
docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy

echo [INFO] 🎉 Deployment completed successfully!
echo [INFO] Frontend: http://localhost:80
echo [INFO] Backend API: http://localhost:3001
echo [INFO] Health Check: http://localhost:3001/health

REM Show running containers
echo [INFO] Running containers:
docker-compose -f docker-compose.prod.yml ps

pause
