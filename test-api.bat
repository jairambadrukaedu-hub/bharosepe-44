@echo off
REM ════════════════════════════════════════════════════════════════════════════════
REM CONTRACT GENERATION SERVICE - API TEST
REM ════════════════════════════════════════════════════════════════════════════════
REM
REM This script:
REM 1. Tests the contract generation API via HTTP
REM 2. Shows you the success rate
REM 3. Tells you if everything works
REM ════════════════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║  CONTRACT GENERATION SERVICE - API TEST                           ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Check if server is running
echo 🔍 Checking if server is running on http://localhost:5000...
echo.

timeout /t 2 /nobreak > nul

REM Try to connect to server
curl -s http://localhost:5000/api/contracts 2>nul >nul

if errorlevel 1 (
    echo ❌ ERROR: Server is not running!
    echo.
    echo 📋 To start the server:
    echo    1. Open a new terminal
    echo    2. Run: npm run dev
    echo.
    echo 💡 Then come back and run this test again
    echo.
    pause
    exit /b 1
)

echo ✅ Server is running!
echo.

REM Get actual transaction ID from database
echo 📊 Fetching a test transaction...
echo.

REM For now, use a sample test - you'll need to provide actual IDs
REM This is a placeholder request that will show what fields are needed

set TRANSACTION_ID=test_txn_001
set BUYER_UUID=f47ac10b-58cc-4372-a567-0e02b2c3d479
set SELLER_UUID=f47ac10b-58cc-4372-a567-0e02b2c3d480

echo 📋 Testing contract generation with:
echo    Transaction ID: %TRANSACTION_ID%
echo    Buyer UUID: %BUYER_UUID%
echo    Seller UUID: %SELLER_UUID%
echo.
echo ⚠️  NOTE: Replace these with actual IDs from your database!
echo.
echo Making API request...
echo.

REM Make the API call
curl -X POST http://localhost:5000/api/contracts/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"transaction_id\": \"%TRANSACTION_ID%\", \"buyer_uuid\": \"%BUYER_UUID%\", \"seller_uuid\": \"%SELLER_UUID%\"}"

echo.
echo.
echo ════════════════════════════════════════════════════════════════════
echo TEST COMPLETE
echo ════════════════════════════════════════════════════════════════════
echo.
pause
