# Start Bharose PE on port 8080
Write-Host "🚀 Starting Bharose PE Application..." -ForegroundColor Green
Write-Host "=" * 50

# Clear old console
Clear-Host

# Change to app directory
Set-Location "c:\Users\Abhi\Desktop\Application\bharosepe-44"

# Install if needed
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

# Build if dist doesn't exist
if (!(Test-Path "dist")) {
    Write-Host "🔨 Building application..." -ForegroundColor Yellow
    npm run build
}

# Start server
Write-Host "🌐 Starting server on http://localhost:8080" -ForegroundColor Green
Write-Host "=" * 50
Write-Host ""

npx serve -s dist -l 8080

Write-Host "✅ Application is running!" -ForegroundColor Green
Read-Host "Press Enter to stop the server..."
