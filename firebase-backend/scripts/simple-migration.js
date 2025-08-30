#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Simple Firebase Migration Script - FIXED VERSION');
console.log('==================================================\n');

// Configuration
const SUPABASE_MAPPING_FILE = '../supabase-image-mapping.json';
const OUTPUT_DIR = '../firebase-backend/migration';
const BUCKET_NAME = 'mastersign-d8396.firebasestorage.app';

// Load Supabase mapping
console.log('📖 Loading Supabase mapping...');
const mappingPath = path.resolve(SUPABASE_MAPPING_FILE);
const mappingData = fs.readFileSync(mappingPath, 'utf8');
const supabaseMapping = JSON.parse(mappingData);

console.log(`✅ Loaded ${Object.keys(supabaseMapping).length} image mappings\n`);

// Generate migration commands
console.log('🔧 Generating migration commands...');

const migrationCommands = [];
const categoryGroups = {};

// Process each Supabase mapping
Object.entries(supabaseMapping).forEach(([supabasePath, url]) => {
  const pathParts = supabasePath.split('/');
  const category = pathParts[0];
  const fileName = pathParts[pathParts.length - 1];
  
  // Create the command with proper quoting for filenames with spaces
  const command = `gsutil mv "gs://${BUCKET_NAME}/${fileName}" "gs://${BUCKET_NAME}/Master%20Sign/assets/${supabasePath}"`;
  
  migrationCommands.push({
    command,
    category,
    fileName,
    supabasePath
  });
  
  // Group by category
  if (!categoryGroups[category]) {
    categoryGroups[category] = [];
  }
  categoryGroups[category].push({ fileName, command });
});

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Save migration commands
const commandsPath = path.join(OUTPUT_DIR, 'migration-commands-fixed.txt');
const commandsText = migrationCommands.map(item => item.command).join('\n');
fs.writeFileSync(commandsPath, commandsText);

// Save category breakdown
const breakdownPath = path.join(OUTPUT_DIR, 'category-breakdown-fixed.json');
fs.writeFileSync(breakdownPath, JSON.stringify(categoryGroups, null, 2));

// Display summary
console.log('📊 Migration Summary:');
console.log('=====================');
console.log(`📁 Total files to migrate: ${migrationCommands.length}`);
console.log(`📂 Categories: ${Object.keys(categoryGroups).length}`);

console.log('\n📂 Category Breakdown:');
Object.entries(categoryGroups).forEach(([category, files]) => {
  console.log(`  ${category}: ${files.length} files`);
});

console.log('\n📁 Files saved to firebase-backend/migration/:');
console.log('  • migration-commands-fixed.txt - Fixed gsutil commands');
console.log('  • category-breakdown-fixed.json - Files by category');

console.log('\n🔧 What Was Fixed:');
console.log('  • Added quotes around file paths');
console.log('  • Properly handles filenames with spaces and parentheses');
console.log('  • Example: gsutil mv "gs://bucket/file (1).jpg" "gs://bucket/target/file (1).jpg"');

console.log('\n🚀 Next Steps:');
console.log('1. Use the NEW migration-commands-fixed.txt file');
console.log('2. Copy and paste the commands');
console.log('3. Commands now properly handle spaces and special characters');

console.log('\nExample fixed command:');
console.log('gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (1) copy.jpg" \\');
console.log('         "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Banner (1) copy.jpg"');
