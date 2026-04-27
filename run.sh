#!/bin/bash

echo "==============================="
echo " Starting Sports Booking App "
echo "==============================="

PROJECT_ROOT=$(pwd)

# ---------- BACKEND ----------
echo ""
echo "🔧 Starting Backend..."

cd backend || { echo "❌ backend folder not found"; exit 1; }

mvn clean
mvn compile
mvn spring-boot:run &
BACKEND_PID=$!

echo "✅ Backend running (PID $BACKEND_PID)"

cd "$PROJECT_ROOT" || exit 1

# ---------- FRONTEND ----------
echo ""
echo "🎨 Starting Frontend..."

cd frontend || { echo "❌ frontend folder not found"; exit 1; }

rm -rf node_modules
npm install
npm start &
FRONTEND_PID=$!

echo "✅ Frontend running (PID $FRONTEND_PID)"

cd "$PROJECT_ROOT" || exit 1

# ---------- STATUS ----------
echo ""
echo "🌐 Backend  → http://localhost:8080"
echo "🌐 Frontend → http://localhost:3000"
echo ""
echo "🛑 Press Ctrl+C to stop both servers"

# ---------- CLEAN SHUTDOWN ----------
trap "echo ''; echo '🧹 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit 0" INT

wait