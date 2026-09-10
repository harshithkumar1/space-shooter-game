# Space Shooter Game Setup - Windows PowerShell Script

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Space Shooter Game Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Initialize git
Write-Host ""
Write-Host "Initializing git repository..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit: Space Shooter game"

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Create an Expo account at https://expo.dev/signup" -ForegroundColor White
Write-Host "2. Run: npx expo login" -ForegroundColor White
Write-Host "3. Run: eas login" -ForegroundColor White
Write-Host "4. Run: eas init" -ForegroundColor White
Write-Host "5. Create a GitHub repository" -ForegroundColor White
Write-Host "6. Run: git remote add origin <your-repo-url>" -ForegroundColor White
Write-Host "7. Run: git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "To test locally:" -ForegroundColor Yellow
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "To build for iOS/Android:" -ForegroundColor Yellow
Write-Host "  Push to GitHub and check the Actions tab" -ForegroundColor White
