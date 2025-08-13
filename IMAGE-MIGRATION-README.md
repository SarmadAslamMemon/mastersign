# Image Migration to Supabase - Complete Guide

This guide will help you migrate all local image references in your React project to Supabase Storage URLs.

## 🚀 Quick Start

### 1. Install Required Dependencies
```bash
npm install glob
```

### 2. Update Your Supabase Configuration
Edit `supabase-image-mapping.json` with your actual Supabase URLs:
- Replace `your-project` with your Supabase project ID
- Replace `your-bucket` with your storage bucket name

### 3. Run the Migration Script
```bash
npm run replace-images
```

## 📋 Prerequisites

### Supabase Setup
1. **Create Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project
2. **Enable Storage**: In your project dashboard, go to Storage and create a bucket
3. **Upload Images**: Upload all your images to Supabase Storage, maintaining the same folder structure
4. **Get URLs**: Copy the public URLs for each image

### Project Structure
Your images should be organized in Supabase Storage with the same structure as your local `assets` folder:
```
your-bucket/
├── Banners/
│   ├── MAIN - Banner.jpg
│   └── Banner (1).jpg
├── Business Signage/
│   ├── Performance.jpg
│   └── Hectors_Building.jpg
└── ...
```

## 🔧 Configuration

### Environment Variables
Copy `env.example` to `.env.local` and update with your values:
```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_STORAGE_BUCKET=your-bucket-name
VITE_IMAGE_BASE_URL_DEV=https://your-project.supabase.co/storage/v1/object/public/your-bucket
VITE_IMAGE_BASE_URL_PROD=https://your-project.supabase.co/storage/v1/object/public/your-bucket
```

### Image Mapping
Update `supabase-image-mapping.json` with your actual image URLs:
```json
{
  "Banners/MAIN - Banner.jpg": "https://your-project.supabase.co/storage/v1/object/public/your-bucket/Banners/MAIN%20-%20Banner.jpg",
  "Business Signage/Performance.jpg": "https://your-project.supabase.co/storage/v1/object/public/your-bucket/Business%20Signage/Performance.jpg"
}
```

## 📁 What Gets Processed

The script will scan and update these directories:
- `client/src/assets/` - Image files and imports
- `client/src/components/` - React components using images
- `client/src/pages/` - Page components with images
- `client/src/templates/` - Template files with images

### File Types Processed
- `.tsx` - React TypeScript components
- `.ts` - TypeScript files
- `.jsx` - React JavaScript components
- `.js` - JavaScript files
- `.css` - CSS files with background images
- `.html` - HTML files

## 🔍 How It Works

### 1. Pattern Recognition
The script identifies these image reference patterns:

```typescript
// Pattern 1: Import statements
import heroBanner from "@/assets/Banners/MAIN - Banner.jpg";

// Pattern 2: Require statements
src={require("@/assets/logo.png")}

// Pattern 3: CSS background images
background-image: url('@/assets/bg.jpg');

// Pattern 4: Inline styles (logged for manual review)
backgroundImage: `url(${heroBanner})`
```

### 2. URL Matching
For each local path, the script:
1. Looks for exact matches in the mapping
2. Tries filename-based matching (case-insensitive)
3. Attempts partial path matching
4. Logs unmatched images for manual review

### 3. File Updates
- Creates automatic backups before any changes
- Updates import statements to use Supabase URLs
- Replaces CSS background image references
- Generates detailed reports of all changes

## 🛡️ Safety Features

### Automatic Backup
- Creates `backup-before-image-replacement/` directory
- Backs up all source files before modification
- Easy rollback if needed

### Change Reporting
- Detailed JSON report: `image-replacement-report.json`
- Console output with progress indicators
- Error logging for failed operations

### Dry Run Option
Add `--dry-run` flag to test without making changes:
```bash
node scripts/replace-images.js --dry-run
```

## 📊 After Migration

### 1. Verify Changes
Check the generated report:
```bash
cat image-replacement-report.json
```

### 2. Test Your Application
```bash
npm run dev
```

### 3. Review Modified Files
The script will show which files were updated and how many changes were made.

## 🔧 Manual Updates Required

Some patterns require manual review:

### Inline Styles with Variables
```typescript
// Before: This needs manual review
backgroundImage: `url(${heroBanner})`

// After: Update to use utility function
import { getSupabaseImageUrl } from '@/lib/image-utils';
backgroundImage: `url(${getSupabaseImageUrl('Banners/MAIN - Banner.jpg')})`
```

### Dynamic Image Loading
```typescript
// Before: Direct asset import
import image from "@/assets/dynamic.jpg";

// After: Use utility function
import { getSupabaseImageUrl } from '@/lib/image-utils';
const imageUrl = getSupabaseImageUrl('dynamic.jpg');
```

## 🚀 Future-Proofing

### Use Utility Functions
Import and use the provided utility functions:

```typescript
import { 
  getSupabaseImageUrl, 
  getOptimizedImageUrl, 
  preloadImage 
} from '@/lib/image-utils';

// Get basic URL
const imageUrl = getSupabaseImageUrl('Banners/banner.jpg');

// Get optimized URL
const optimizedUrl = getOptimizedImageUrl('Banners/banner.jpg', {
  width: 800,
  height: 600,
  quality: 80,
  format: 'webp'
});

// Preload for performance
await preloadImage('Banners/banner.jpg');
```

### Environment-Specific URLs
The utility functions automatically handle:
- Development vs production URLs
- Different Supabase projects per environment
- URL encoding and safety

## 🐛 Troubleshooting

### Common Issues

#### 1. "No Supabase URL found" Errors
- Check your `supabase-image-mapping.json` file
- Ensure image paths match exactly (including case)
- Verify all images are uploaded to Supabase

#### 2. Import Errors After Migration
- Check that Supabase URLs are accessible
- Verify CORS settings in Supabase
- Test URLs in browser

#### 3. Missing Images
- Check the backup directory for original files
- Review the error log in the report
- Manually update any missed references

### Rollback Process
If you need to restore original files:
```bash
# Restore from backup
cp -r backup-before-image-replacement/client/src/* client/src/

# Or restore specific files
cp backup-before-image-replacement/client/src/components/hero-section.tsx client/src/components/
```

## 📈 Performance Benefits

### After Migration
- **Faster Builds**: No local image processing
- **Better Caching**: CDN-level image caching
- **Reduced Bundle Size**: Images loaded on-demand
- **Global Delivery**: Images served from Supabase's global network

### Optimization Features
- **Image Transformations**: Resize, compress, convert formats
- **Lazy Loading**: Load images only when needed
- **Preloading**: Critical images loaded early
- **Format Optimization**: Automatic WebP conversion

## 🔒 Security Considerations

### Public vs Private Images
- **Public Images**: Accessible to anyone (good for marketing content)
- **Private Images**: Require authentication (good for user uploads)

### CORS Configuration
Configure CORS in Supabase Storage:
```sql
-- Allow your domain
INSERT INTO storage.cors (origin, method, headers, max_age_seconds)
VALUES ('https://yourdomain.com', 'GET', '*', 3600);
```

## 📞 Support

If you encounter issues:
1. Check the error log in the generated report
2. Verify your Supabase configuration
3. Ensure all images are properly uploaded
4. Review the backup files for comparison

## 🎯 Next Steps

After successful migration:
1. **Test thoroughly** in development and staging
2. **Monitor performance** improvements
3. **Implement lazy loading** for better UX
4. **Set up image optimization** pipelines
5. **Configure CDN** for global delivery

---

**Happy migrating! 🚀**
