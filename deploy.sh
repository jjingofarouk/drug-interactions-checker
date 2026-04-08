#!/bin/bash

# Quick deploy script for Vercel
# Run this script to deploy your API to Vercel

set -e

echo "🚀 Drug Interaction Checker - Vercel Deployment"
echo "================================================"
echo ""

# Check if Git is on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $BRANCH"

if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
    echo "⚠️  You are not on main/master branch. Deployment may not work as expected."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "📝 Ensure your changes are committed:"
git status

echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo "🔄 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Update openapi.yaml with your deployment URL"
echo "2. Update API.md with your deployment URL" 
echo "3. Test your endpoints: https://your-deployment.vercel.app/api/health"
echo "4. List on RapidAPI: https://rapidapi.com/developer"
echo ""
echo "For more info, see DEPLOYMENT.md and RAPIDAPI-CHECKLIST.md"
