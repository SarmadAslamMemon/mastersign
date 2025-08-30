#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Firebase Categories & Products Setup - Execution Script');
console.log('==========================================================\n');

// Check if we're in the right directory
const currentDir = process.cwd();
const scriptDir = path.dirname(import.meta.url.replace('file://', ''));

if (!currentDir.includes('scripts')) {
  console.log('📁 Navigating to scripts directory...');
  process.chdir(scriptDir);
}

// Check if the Firebase script exists
const firebaseScript = 'firebase-categories-products.js';
if (!fs.existsSync(firebaseScript)) {
  console.error(`❌ Firebase script not found: ${firebaseScript}`);
  process.exit(1);
}

console.log('✅ Firebase script found');
console.log('🔍 Starting Firebase setup...\n');

// Run the Firebase script
try {
  execSync(`node ${firebaseScript}`, { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n🎉 Firebase setup completed successfully!');
  console.log('\n📁 Check your Firebase Console to see the new collections:');
  console.log('   • categories');
  console.log('   • subCategories');
  console.log('   • products');
  
} catch (error) {
  console.error('\n❌ Firebase setup failed:', error.message);
  process.exit(1);
}
