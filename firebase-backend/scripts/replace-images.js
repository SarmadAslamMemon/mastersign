#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  // Source directories to scan
  sourceDirs: [
    'client/src/assets',
    'client/src/components', 
    'client/src/pages',
    'client/src/templates'
  ],
  // File extensions to process
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.html'],
  // Backup directory
  backupDir: 'backup-before-image-replacement',
  // Report file
  reportFile: 'image-replacement-report.json',
  // Supabase URL mapping file
  mappingFile: 'supabase-image-mapping.json'
};

// Image mapping structure
let imageMapping = {};
let changesReport = {
  timestamp: new Date().toISOString(),
  totalFilesProcessed: 0,
  totalChanges: 0,
  filesChanged: [],
  errors: [],
  summary: {}
};

/**
 * Load Supabase image mapping
 */
async function loadImageMapping() {
  try {
    const mappingPath = path.join(process.cwd(), CONFIG.mappingFile);
    const mappingData = await fs.readFile(mappingPath, 'utf8');
    imageMapping = JSON.parse(mappingData);
    console.log(`✅ Loaded ${Object.keys(imageMapping).length} image mappings`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to load image mapping: ${error.message}`);
    console.log('Please create the mapping file first (see instructions below)');
    return false;
  }
}

/**
 * Create backup of files before modification
 */
async function createBackup() {
  try {
    const backupPath = path.join(process.cwd(), CONFIG.backupDir);
    
    // Create backup directory
    await fs.mkdir(backupPath, { recursive: true });
    
    // Copy all source files to backup
    for (const dir of CONFIG.sourceDirs) {
      const sourcePath = path.join(process.cwd(), dir);
      const backupSourcePath = path.join(backupPath, dir);
      
      if (await fs.stat(sourcePath).catch(() => false)) {
        await fs.cp(sourcePath, backupSourcePath, { recursive: true });
        console.log(`📁 Backed up: ${dir}`);
      }
    }
    
    console.log(`✅ Backup created at: ${backupPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Backup failed: ${error.message}`);
    return false;
  }
}

/**
 * Find all files to process
 */
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

/**
 * Replace image references in a file
 */
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    let newContent = content;
    let fileChanges = 0;
    
    // Pattern 1: Import statements (import image from "@/assets/...")
    const importPattern = /import\s+(\w+)\s+from\s+["']@\/assets\/([^"']+)["']/g;
    newContent = newContent.replace(importPattern, (match, varName, assetPath) => {
      const supabaseUrl = findSupabaseUrl(assetPath);
      if (supabaseUrl) {
        fileChanges++;
        return `import ${varName} from "${supabaseUrl}"`;
      }
      return match;
    });
    
    // Pattern 2: Direct asset references in JSX (src={require("@/assets/...")})
    const requirePattern = /require\(["']@\/assets\/([^"']+)["']\)/g;
    newContent = newContent.replace(requirePattern, (match, assetPath) => {
      const supabaseUrl = findSupabaseUrl(assetPath);
      if (supabaseUrl) {
        fileChanges++;
        return `"${supabaseUrl}"`;
      }
      return match;
    });
    
    // Pattern 3: CSS background-image URLs
    const cssUrlPattern = /url\(["']?@\/assets\/([^"']+)["']?\)/g;
    newContent = newContent.replace(cssUrlPattern, (match, assetPath) => {
      const supabaseUrl = findSupabaseUrl(assetPath);
      if (supabaseUrl) {
        fileChanges++;
        return `url("${supabaseUrl}")`;
      }
      return match;
    });
    
    // Pattern 4: Inline style backgroundImage
    const stylePattern = /backgroundImage:\s*`url\(\$\{([^}]+)\}\)`/g;
    newContent = newContent.replace(stylePattern, (match, varName) => {
      // This is more complex - we need to check if the variable was imported from assets
      // For now, we'll log this case for manual review
      console.log(`⚠️  Found inline style with variable ${varName} in ${filePath} - manual review needed`);
      return match;
    });
    
    // Write file if changes were made
    if (fileChanges > 0) {
      await fs.writeFile(filePath, newContent, 'utf8');
      changesReport.filesChanged.push({
        file: filePath,
        changes: fileChanges
      });
      changesReport.totalChanges += fileChanges;
      console.log(`✅ Updated ${filePath} (${fileChanges} changes)`);
    }
    
    changesReport.totalFilesProcessed++;
    return fileChanges;
    
  } catch (error) {
    const errorMsg = `Error processing ${filePath}: ${error.message}`;
    changesReport.errors.push(errorMsg);
    console.error(`❌ ${errorMsg}`);
    return 0;
  }
}

/**
 * Find Supabase URL for a given asset path
 */
function findSupabaseUrl(assetPath) {
  // Try exact match first
  if (imageMapping[assetPath]) {
    return imageMapping[assetPath];
  }
  
  // Try filename match (case-insensitive)
  const filename = path.basename(assetPath);
  for (const [key, url] of Object.entries(imageMapping)) {
    if (path.basename(key).toLowerCase() === filename.toLowerCase()) {
      console.log(`🔍 Matched ${assetPath} to ${key} (filename match)`);
      return url;
    }
  }
  
  // Try partial path match
  for (const [key, url] of Object.entries(imageMapping)) {
    if (key.includes(filename) || assetPath.includes(path.basename(key))) {
      console.log(`🔍 Matched ${assetPath} to ${key} (partial match)`);
      return url;
    }
  }
  
  console.log(`❌ No Supabase URL found for: ${assetPath}`);
  return null;
}

/**
 * Generate and save report
 */
async function generateReport() {
  try {
    const reportPath = path.join(process.cwd(), CONFIG.reportFile);
    
    // Add summary statistics
    changesReport.summary = {
      filesWithChanges: changesReport.filesChanged.length,
      totalFilesProcessed: changesReport.totalFilesProcessed,
      successRate: changesReport.totalFilesProcessed > 0 
        ? ((changesReport.totalFilesProcessed - changesReport.errors.length) / changesReport.totalFilesProcessed * 100).toFixed(2)
        : 0
    };
    
    await fs.writeFile(reportPath, JSON.stringify(changesReport, null, 2));
    console.log(`📊 Report saved to: ${reportPath}`);
    
    // Print summary
    console.log('\n📋 REPLACEMENT SUMMARY:');
    console.log(`Total files processed: ${changesReport.totalFilesProcessed}`);
    console.log(`Files with changes: ${changesReport.filesChanged.length}`);
    console.log(`Total changes made: ${changesReport.totalChanges}`);
    console.log(`Errors: ${changesReport.errors.length}`);
    
  } catch (error) {
    console.error(`❌ Failed to generate report: ${error.message}`);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting image replacement process...\n');
  
  // Load image mapping
  if (!(await loadImageMapping())) {
    process.exit(1);
  }
  
  // Create backup
  if (!(await createBackup())) {
    console.log('⚠️  Continuing without backup...');
  }
  
  // Find files to process
  const files = await findFilesToProcess();
  console.log(`📁 Found ${files.length} files to process\n`);
  
  // Process each file
  for (const file of files) {
    await processFile(file);
  }
  
  // Generate report
  await generateReport();
  
  console.log('\n✅ Image replacement process completed!');
}

// Run the script
main().catch(console.error);
