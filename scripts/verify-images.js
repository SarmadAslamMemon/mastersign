#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

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
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.html']
};

async function findFilesToProcess() {
  const files = [];
  
  for (const dir of CONFIG.sourceDirs) {
    const dirPath = path.join(process.cwd(), dir);
    
    if (await fs.stat(dirPath).catch(() => false)) {
      try {
        // Use glob with Windows-compatible options
        const pattern = path.join(dirPath, '**/*');
        const matches = await glob(pattern, { 
          ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
          nodir: true,
          windowsPathsNoEscape: true
        });
        
        const relevantFiles = matches.filter(file => 
          CONFIG.fileExtensions.some(ext => file.endsWith(ext))
        );
        
        files.push(...relevantFiles);
      } catch (error) {
        console.log(`⚠️  Error scanning ${dir}: ${error.message}`);
        // Fallback: manual file discovery
        try {
          const manualFiles = await findFilesManually(dirPath);
          files.push(...manualFiles);
        } catch (fallbackError) {
          console.log(`❌ Fallback failed for ${dir}: ${fallbackError.message}`);
        }
      }
    }
  }
  
  return files;
}

/**
 * Manual file discovery fallback for Windows compatibility
 */
async function findFilesManually(dirPath) {
  const files = [];
  
  async function scanDirectory(currentPath) {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.isDirectory()) {
          // Skip certain directories
          if (['node_modules', 'dist', '.git'].includes(entry.name)) {
            continue;
          }
          await scanDirectory(fullPath);
        } else if (entry.isFile()) {
          // Check if file extension matches
          if (CONFIG.fileExtensions.some(ext => entry.name.endsWith(ext))) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️  Error scanning directory ${currentPath}: ${error.message}`);
    }
  }
  
  await scanDirectory(dirPath);
  return files;
}

async function verifyFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const issues = [];
    
    // Check for remaining local asset references
    const localAssetPattern = /@\/assets\//g;
    const localMatches = content.match(localAssetPattern);
    
    if (localMatches) {
      issues.push({
        type: 'local-asset-reference',
        count: localMatches.length,
        message: `Found ${localMatches.length} local asset reference(s)`
      });
    }
    
    // Check for hardcoded local paths
    const hardcodedPattern = /["']\.\.?\/assets\//g;
    const hardcodedMatches = content.match(hardcodedPattern);
    
    if (hardcodedMatches) {
      issues.push({
        type: 'hardcoded-path',
        count: hardcodedMatches.length,
        message: `Found ${hardcodedMatches.length} hardcoded asset path(s)`
      });
    }
    
    // Check for Supabase URLs
    const supabasePattern = /supabase\.co.*storage.*public/g;
    const supabaseMatches = content.match(supabasePattern);
    
    if (supabaseMatches) {
      issues.push({
        type: 'supabase-url',
        count: supabaseMatches.length,
        message: `Found ${supabaseMatches.length} Supabase URL(s)`
      });
    }
    
    return {
      file: filePath,
      issues,
      hasIssues: issues.length > 0
    };
    
  } catch (error) {
    return {
      file: filePath,
      issues: [{
        type: 'error',
        count: 1,
        message: `Error reading file: ${error.message}`
      }],
      hasIssues: true
    };
  }
}

async function main() {
  console.log('🔍 Starting image verification process...\n');
  
  const files = await findFilesToProcess();
  console.log(`📁 Found ${files.length} files to verify\n`);
  
  const results = [];
  let totalIssues = 0;
  
  for (const file of files) {
    const result = await verifyFile(file);
    results.push(result);
    
    if (result.hasIssues) {
      totalIssues += result.issues.length;
      console.log(`⚠️  ${file}`);
      result.issues.forEach(issue => {
        console.log(`   - ${issue.message}`);
      });
    } else {
      console.log(`✅ ${file}`);
    }
  }
  
  // Generate summary
  const filesWithIssues = results.filter(r => r.hasIssues).length;
  const filesWithoutIssues = results.length - filesWithIssues;
  
  console.log('\n📊 VERIFICATION SUMMARY:');
  console.log(`Total files processed: ${results.length}`);
  console.log(`Files with issues: ${filesWithIssues}`);
  console.log(`Files without issues: ${filesWithoutIssues}`);
  console.log(`Total issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('\n🎉 All files are properly configured with Supabase URLs!');
  } else {
    console.log('\n⚠️  Some files still need attention. Review the issues above.');
  }
  
  // Save detailed report
  const reportPath = path.join(process.cwd(), 'image-verification-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: results.length,
      filesWithIssues,
      filesWithoutIssues,
      totalIssues
    },
    results
  };
  
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

main().catch(console.error);
