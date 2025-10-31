#!/bin/bash

echo "🚀 Starting EcoClean Full Stack Application"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local"
fi

# Check if backend .env exists
if [ ! -f backend/.env ]; then
    echo "⚠️  Backend .env not found!"
    echo "Please configure backend/.env with your Hedera credentials"
    echo "See backend/SETUP.md for instructions"
    exit 1
fi

echo "🔍 Checking backend..."
cd backend
if [ ! -d node_modules ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

echo ""
echo "🔍 Checking frontend..."
cd ..
if [ ! -d node_modules ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo ""
echo "🎬 Starting servers..."
echo ""
echo "📡 Backend will run on: http://localhost:3001"
echo "🌐 Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
npm run dev &
FRONTEND_PID=$!

# Trap Ctrl+C to kill both processes
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait for both processes
wait
