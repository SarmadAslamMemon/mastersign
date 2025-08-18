#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  sourceDirs: [
    'client/src/assets',
    'client/src/components', 
    'client/src/pages',
    'client/src/templates'
  ],
  backupDir: 'backup-images-' + new Date().toISOString().split('T')[0]
};

async function createBackup() {
  try {
    const backupPath = path.join(process.cwd(), CONFIG.backupDir);
    
    // Create backup directory
    await fs.mkdir(backupPath, { recursive: true });
    console.log(`📁 Creating backup at: ${backupPath}`);
    
    // Copy all source files to backup
    for (const dir of CONFIG.sourceDirs) {
      const sourcePath = path.join(process.cwd(), dir);
      const backupSourcePath = path.join(backupPath, dir);
      
      if (await fs.stat(sourcePath).catch(() => false)) {
        await fs.cp(sourcePath, backupSourcePath, { recursive: true });
        console.log(`✅ Backed up: ${dir}`);
      } else {
        console.log(`⚠️  Directory not found: ${dir}`);
      }
    }
    
    console.log(`\n🎉 Backup completed successfully!`);
    console.log(`📂 Location: ${backupPath}`);
    console.log(`💡 You can now safely run the image replacement script.`);
    
  } catch (error) {
    console.error(`❌ Backup failed: ${error.message}`);
    process.exit(1);
  }
}

createBackup();
