#!/bin/bash

echo "================================"
echo "  Space Shooter Game Setup"
echo "================================"
echo ""

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node --version) found"

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✅ npm $(npm --version) found"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Initialize git
echo ""
echo "Initializing git repository..."
git init
git add .
git commit -m "Initial commit: Space Shooter game"

echo ""
echo "================================"
echo "  Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Create an Expo account at https://expo.dev/signup"
echo "2. Run: npx expo login"
echo "3. Run: eas login"
echo "4. Run: eas init"
echo "5. Create a GitHub repository"
echo "6. Run: git remote add origin <your-repo-url>"
echo "7. Run: git push -u origin main"
echo ""
echo "To test locally:"
echo "  npm start"
echo ""
echo "To build for iOS/Android:"
echo "  Push to GitHub and check the Actions tab"
echo ""
