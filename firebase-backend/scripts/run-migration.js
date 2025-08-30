#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Firebase Image Migration - Execution Script');
console.log('=============================================\n');

// Check if gsutil is available
try {
  execSync('gsutil --version', { stdio: 'ignore' });
  console.log('✅ gsutil is available');
} catch (error) {
  console.error('❌ gsutil is not available. Please install Google Cloud SDK first.');
  console.error('   Visit: https://cloud.google.com/sdk/docs/install');
  process.exit(1);
}

// Check if we're authenticated
try {
  execSync('gcloud auth list --filter=status:ACTIVE --format="value(account)"', { stdio: 'pipe' });
  console.log('✅ Google Cloud authentication verified');
} catch (error) {
  console.error('❌ Not authenticated with Google Cloud. Please run:');
  console.error('   gcloud auth login');
  process.exit(1);
}

// Check if project is set
try {
  const project = execSync('gcloud config get-value project', { encoding: 'utf8' }).trim();
  if (project === 'mastersign-d8396') {
    console.log('✅ Project set to: mastersign-d8396');
  } else {
    console.log(`⚠️  Project is set to: ${project}`);
    console.log('   Expected: mastersign-d8396');
    console.log('   To change: gcloud config set project mastersign-d8396');
  }
} catch (error) {
  console.error('❌ Could not verify project configuration');
}

console.log('\n🔍 Starting Smart Image Analysis...\n');

// Run the migration script
try {
  execSync('node firebase-image-migration.js', { 
    stdio: 'inherit',
    cwd: path.dirname(import.meta.url.replace('file://', ''))
  });
  
  console.log('\n🎉 Analysis Complete!');
  console.log('\n📁 Check the following files in firebase-backend/migration/:');
  console.log('   • migration-plan.json - Complete migration plan');
  console.log('   • gsutil-commands.sh - Ready-to-run commands');
  console.log('   • detailed-matches.json - Full analysis results');
  
} catch (error) {
  console.error('\n❌ Migration analysis failed:', error.message);
  process.exit(1);
}
