#!/bin/bash

echo "🚀 SignFlow Migration to Static Deployment"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the SignFlow root directory"
    exit 1
fi

echo "📋 Starting migration process..."

# Step 1: Remove backend dependencies
echo "🗑️  Removing backend dependencies..."
npm uninstall express express-session connect-pg-simple drizzle-orm drizzle-kit @neondatabase/serverless passport passport-local memorystore ws socket.io-client dotenv

# Step 2: Remove backend directories
echo "🗂️  Removing backend directories..."
rm -rf server/
rm -rf shared/
rm -f drizzle.config.ts
rm -f supabase-schema.sql

# Step 3: Update package.json scripts
echo "📝 Updating package.json scripts..."
sed -i 's/"dev": "cross-env NODE_ENV=development tsx server\/index.ts"/"dev": "cd client && npm run dev"/' package.json
sed -i 's/"build": "vite build && esbuild server\/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"/"build": "cd client && npm run build"/' package.json
sed -i 's/"start": "cross-env NODE_ENV=production node dist\/index.js"/"start": "cd client && npm run preview"/' package.json

# Step 4: Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install

# Step 5: Test build
echo "🧪 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Migration completed successfully!"
    echo ""
    echo "📁 Your project is now ready for static deployment:"
    echo "   - Backend dependencies removed"
    echo "   - Static data files created"
    echo "   - Client-only build working"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Test the app: npm run dev"
    echo "   2. Build for production: npm run build"
    echo "   3. Deploy to your preferred platform"
    echo ""
    echo "📖 See STATIC_DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
