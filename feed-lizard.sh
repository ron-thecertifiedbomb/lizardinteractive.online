#!/bin/bash

# Configuration
BASE_URL="http://localhost:3000"
SECRET="ef962b5c5578c4e5f4948e23599366d6"

echo "🦎 Waking up Lizard Engine..."
echo "----------------------------------------"

# 1. Trigger Research (Feed the Lizard)
echo "🔍 Starting Research Phase..."
curl -s -L -X POST "$BASE_URL/api/research" \
  -H "X-Lizard-Secret: $SECRET" \
  -H "Content-Type: application/json"
echo -e "\n----------------------------------------"

# 2. Trigger Outbound (Strike)
echo "📧 Starting Outbound Phase..."
curl -s -L -X POST "$BASE_URL/api/outbound" \
  -H "X-Lizard-Secret: $SECRET" \
  -H "Content-Type: application/json"
echo -e "\n----------------------------------------"
echo "✅ Lizard tasks complete."
