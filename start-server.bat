@echo off
cd /d "c:\Users\Abhi\Desktop\Application\bharosepe-44"
echo.
echo ========================================
echo  BHAROSE PE - Starting on Port 8080
echo ========================================
echo.
echo Starting server...
npx serve -s dist -l 8080
pause
