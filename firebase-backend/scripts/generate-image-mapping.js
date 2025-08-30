#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  assetsDir: 'client/src/assets',
  outputFile: 'supabase-image-mapping.json',
  supabaseProjectId: 'qwwptkqqybufsbeeyvcr',
  bucketName: 'Master Sign'
};

/**
 * Generate Supabase URL for an image path
 */
function generateSupabaseUrl(imagePath) {
  // Only encode spaces and special characters, not forward slashes
  const encodedPath = imagePath.replace(/ /g, '%20').replace(/[()]/g, (match) => {
    if (match === '(') return '%28';
    if (match === ')') return '%29';
    return match;
  });
  return `https://${CONFIG.supabaseProjectId}.supabase.co/storage/v1/object/public/${CONFIG.bucketName}/${encodedPath}`;
}

/**
 * Scan assets directory recursively
 */
async function scanAssetsDirectory(dirPath, basePath = '') {
  const imageMapping = {};
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subMapping = await scanAssetsDirectory(fullPath, relativePath);
        Object.assign(imageMapping, subMapping);
      } else if (entry.isFile()) {
        // Check if it's an image file
        const ext = path.extname(entry.name).toLowerCase();
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'];
        
        if (imageExtensions.includes(ext)) {
          // Convert Windows path separators to forward slashes
          const normalizedPath = relativePath.replace(/\\/g, '/');
          imageMapping[normalizedPath] = generateSupabaseUrl(normalizedPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}: ${error.message}`);
  }
  
  return imageMapping;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting automatic image mapping generation...\n');
  
  const assetsPath = path.join(process.cwd(), CONFIG.assetsDir);
  
  // Check if assets directory exists
  try {
    await fs.access(assetsPath);
  } catch (error) {
    console.error(`❌ Assets directory not found: ${CONFIG.assetsDir}`);
    console.log('Please make sure the path is correct.');
    process.exit(1);
  }
  
  console.log(`📁 Scanning assets directory: ${CONFIG.assetsDir}`);
  console.log(`🔗 Project ID: ${CONFIG.supabaseProjectId}`);
  console.log(`🪣 Bucket: ${CONFIG.bucketName}\n`);
  
  // Scan and generate mapping
  const imageMapping = await scanAssetsDirectory(assetsPath);
  
  if (Object.keys(imageMapping).length === 0) {
    console.log('❌ No images found in assets directory.');
    process.exit(1);
  }
  
  // Save mapping to file
  const outputPath = path.join(process.cwd(), CONFIG.outputFile);
  await fs.writeFile(outputPath, JSON.stringify(imageMapping, null, 2));
  
  console.log(`✅ Generated mapping for ${Object.keys(imageMapping).length} images!`);
  console.log(`📄 Saved to: ${CONFIG.outputFile}`);
  
  // Show sample entries
  console.log('\n📋 Sample mappings:');
  const sampleEntries = Object.entries(imageMapping).slice(0, 5);
  sampleEntries.forEach(([path, url]) => {
    console.log(`  ${path} → ${url}`);
  });
  
  if (Object.keys(imageMapping).length > 5) {
    console.log(`  ... and ${Object.keys(imageMapping).length - 5} more images`);
  }
  
  console.log('\n💡 Next steps:');
  console.log('1. Upload all images to Supabase Storage in the same folder structure');
  console.log('2. Run: npm run replace-images');
  console.log('3. All local image references will be replaced with Supabase URLs');
}

main().catch(console.error);
