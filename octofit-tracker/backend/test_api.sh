#!/bin/bash
# API Testing Script for OctoFit Tracker

# Get CODESPACE_NAME from environment or use localhost
CODESPACE_NAME=${CODESPACE_NAME:-localhost}
BASE_URL="http://${CODESPACE_NAME}:8000/api"

echo "=== OctoFit Tracker API Testing ==="
echo
echo "Testing endpoints with base URL: $BASE_URL"
echo

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Test: $description"
    echo "Endpoint: $method $endpoint"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if [ "$method" = "POST" ]; then
        curl -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint" \
            -w "\nStatus: %{http_code}\n"
    else
        curl -X $method \
            -H "Accept: application/json" \
            "$BASE_URL$endpoint" \
            -w "\nStatus: %{http_code}\n"
    fi
    
    echo
}

# Test Team endpoints
echo "===================="
echo "TEAM ENDPOINTS"
echo "===================="
echo
test_endpoint "GET" "/teams/" "" "Get all teams"

# Test User endpoints
echo "===================="
echo "USER ENDPOINTS"
echo "===================="
echo
test_endpoint "GET" "/users/" "" "Get all users"

# Test Activity endpoints
echo "===================="
echo "ACTIVITY ENDPOINTS"
echo "===================="
echo
test_endpoint "GET" "/activities/" "" "Get all activities"

# Test Workout endpoints
echo "===================="
echo "WORKOUT ENDPOINTS"
echo "===================="
echo
test_endpoint "GET" "/workouts/" "" "Get all workouts"

# Test Leaderboard endpoints
echo "===================="
echo "LEADERBOARD ENDPOINTS"
echo "===================="
echo
test_endpoint "GET" "/leaderboards/" "" "Get all leaderboards"

echo
echo "=== Testing Complete ==="
