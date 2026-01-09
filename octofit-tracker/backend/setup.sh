#!/bin/bash
# Setup script for OctoFit Tracker Backend

set -e

cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend

echo "=== OctoFit Tracker Backend Setup ==="
echo

# Activate virtual environment
echo "1. Activating virtual environment..."
if [ -d "venv" ]; then
    source venv/bin/activate
    echo "   ✓ Virtual environment activated"
else
    echo "   ✗ Virtual environment not found. Creating..."
    python3 -m venv venv
    source venv/bin/activate
    echo "   ✓ Virtual environment created and activated"
fi

echo

# Install requirements
echo "2. Installing Python requirements..."
if [ -f "requirements.txt" ]; then
    pip install -q -r requirements.txt
    echo "   ✓ Requirements installed"
else
    echo "   ✗ requirements.txt not found"
    exit 1
fi

echo

# Run migrations
echo "3. Running Django migrations..."
python manage.py migrate
echo "   ✓ Migrations completed"

echo

echo "=== Setup Complete ==="
echo
echo "To start the Django server:"
echo "  cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver 0.0.0.0:8000"
echo
echo "Or use VS Code's launch configuration: 'Launch Django Backend'"
