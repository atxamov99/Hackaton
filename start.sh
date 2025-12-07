#!/bin/bash

echo "Starting Pet Tashkent Application..."
echo ""

echo "[1/2] Starting JSON Server on port 3001..."
npm run server &

echo "[2/2] Starting React App on port 5173..."
sleep 2
npm run dev

echo ""
echo "✅ All servers started successfully!"
echo ""
echo "📍 Frontend:  http://localhost:5173"
echo "📍 Backend:   http://localhost:3001"
echo ""
echo "📝 Demo credentials:"
echo "User: aziz@example.com / \$2a\$10\$YjNpbHNjcGlkbg=="
echo "Admin: admin@example.com / \$2a\$10\$YWRtaW5wYXNz"
echo ""
