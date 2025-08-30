#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Firebase Image Migration - Node.js Script');
console.log('============================================\n');

// Check if gsutil is available
try {
  execSync('gsutil --version', { stdio: 'ignore' });
  console.log('✅ gsutil is available');
} catch (error) {
  console.error('❌ gsutil is not available. Please install Google Cloud SDK first.');
  process.exit(1);
}

// Read migration commands
const commandsFile = 'migration-commands-fixed.txt';
if (!fs.existsSync(commandsFile)) {
  console.error(`❌ Migration commands file not found: ${commandsFile}`);
  process.exit(1);
}

console.log(`📖 Reading migration commands from: ${commandsFile}`);
const commands = fs.readFileSync(commandsFile, 'utf8').split('\n').filter(cmd => cmd.trim());

console.log(`📊 Found ${commands.length} commands to execute\n`);

// Ask for confirmation
console.log('⚠️  This will migrate ALL images to their proper folders.');
console.log('   Are you sure you want to continue? (y/N)');

rl.question('', (answer) => {
  if (answer.toLowerCase() !== 'y') {
    console.log('❌ Migration cancelled by user');
    rl.close();
    return;
  }

  console.log('\n🔄 Starting migration...\n');

  // Execute commands with progress
  let successCount = 0;
  let errorCount = 0;

  commands.forEach((command, index) => {
    const current = index + 1;
    const percent = Math.round((current / commands.length) * 100);
    
    console.log(`[${current}/${commands.length}] (${percent}%) Executing: ${command}`);
    
    try {
      execSync(command, { stdio: 'pipe' });
      console.log('✅ Success');
      successCount++;
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
      errorCount++;
    }
    
    console.log('');
  });

  // Summary
  console.log('🎉 Migration completed!');
  console.log(`📊 Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📁 Total: ${commands.length}`);
  
  rl.close();
});
