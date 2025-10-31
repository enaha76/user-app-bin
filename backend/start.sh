#!/bin/bash

echo "🚀 Starting EcoClean Backend Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env with your Hedera credentials!"
    echo "   Run: nano .env"
    echo ""
    read -p "Press Enter after you've configured .env..."
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check MongoDB
echo ""
echo "🔍 Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB found"
else
    echo "⚠️  MongoDB not found locally"
    echo "   Options:"
    echo "   1. Install MongoDB: https://www.mongodb.com/docs/manual/installation/"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo "   3. Use Docker: docker-compose up -d mongodb"
fi

# Test Hedera connection
echo ""
echo "🔗 Testing Hedera connection..."
node scripts/test-connection.js

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Hedera connection failed!"
    echo "   Check your credentials in .env"
    exit 1
fi

# Ask about token creation
echo ""
read -p "🪙 Do you want to create the ECO token now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    node scripts/create-token.js
    echo ""
    echo "📝 Remember to add ECO_TOKEN_ID to your .env file!"
    read -p "Press Enter after you've updated .env..."
fi

# Start server
echo ""
echo "🚀 Starting backend server..."
npm run dev
