@echo off
REM ════════════════════════════════════════════════════════════════════════════════
REM CONTRACT GENERATION SERVICE - TEST RUNNER
REM ════════════════════════════════════════════════════════════════════════════════
REM
REM This script:
REM 1. Starts the Express server with contract routes
REM 2. Waits for server to be ready
REM 3. Tests the contract generation API
REM ════════════════════════════════════════════════════════════════════════════════

echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║  CONTRACT GENERATION SERVICE - AUTOMATED TEST                     ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Check if node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo   Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ❌ ERROR: .env file not found
    echo   Create a .env file with:
    echo   VITE_SUPABASE_URL=your_url
    echo   VITE_SUPABASE_ANON_KEY=your_key
    pause
    exit /b 1
)

echo ✅ .env file found
echo.

REM Option 1: Run simple test script
echo 📋 Running contract generation test...
echo.

node test-contract-simple.js

if errorlevel 1 (
    echo.
    echo ❌ Test failed
    pause
    exit /b 1
)

echo.
echo ✅ Test completed successfully!
echo.
pause
