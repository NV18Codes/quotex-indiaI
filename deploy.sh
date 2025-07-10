#!/bin/bash

echo "🧹 Cleaning previous build..."
rm -rf dist

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. If using Vercel: git push to trigger deployment"
echo "2. If using Netlify: drag and drop the 'dist' folder"
echo "3. If using other platforms: upload the 'dist' folder"
echo ""
echo "🔧 The following files have been configured for proper MIME types:"
echo "   - vercel.json (for Vercel)"
echo "   - netlify.toml (for Netlify)"
echo "   - public/_headers (for Netlify)"
echo "   - vite.config.ts (build optimization)" 