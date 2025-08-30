#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Configuration
const BUCKET_NAME = 'mastersign-d8396.firebasestorage.app';
const SUPABASE_MAPPING_FILE = '../supabase-image-mapping.json';
const OUTPUT_DIR = '../firebase-backend/migration';

// Smart matching algorithms
class SmartImageMatcher {
  constructor() {
    this.supabaseMapping = {};
    this.firebaseFiles = [];
    this.matches = [];
    this.unmatched = [];
    this.migrationPlan = [];
  }

  // Load Supabase mapping
  loadSupabaseMapping() {
    try {
      const mappingPath = path.resolve(SUPABASE_MAPPING_FILE);
      const mappingData = fs.readFileSync(mappingPath, 'utf8');
      this.supabaseMapping = JSON.parse(mappingData);
      console.log(`✅ Loaded Supabase mapping with ${Object.keys(this.supabaseMapping).length} entries`);
      return true;
    } catch (error) {
      console.error('❌ Error loading Supabase mapping:', error.message);
      return false;
    }
  }

  // Get Firebase Storage files list
  getFirebaseFiles() {
    try {
      console.log('🔍 Fetching Firebase Storage files...');
      const command = `gsutil ls gs://${BUCKET_NAME}`;
      const output = execSync(command, { encoding: 'utf8' });
      
      this.firebaseFiles = output
        .split('\n')
        .filter(line => line.trim() && !line.endsWith('/'))
        .map(line => {
          const fileName = line.split('/').pop();
          return fileName;
        })
        .filter(fileName => fileName && !fileName.includes('Master%20Sign'));
      
      console.log(`✅ Found ${this.firebaseFiles.length} files in Firebase root`);
      return true;
    } catch (error) {
      console.error('❌ Error fetching Firebase files:', error.message);
      return false;
    }
  }

  // Smart matching algorithm with multiple strategies
  matchImages() {
    console.log('🧠 Starting smart image matching...');
    
    this.firebaseFiles.forEach(fileName => {
      const match = this.findBestMatch(fileName);
      if (match) {
        this.matches.push({
          firebaseFile: fileName,
          supabasePath: match.path,
          category: match.category,
          confidence: match.confidence,
          migrationCommand: this.generateMigrationCommand(fileName, match.path)
        });
      } else {
        this.unmatched.push(fileName);
      }
    });

    console.log(`✅ Matched: ${this.matches.length} files`);
    console.log(`❌ Unmatched: ${this.unmatched.length} files`);
  }

  // Find best match using multiple strategies
  findBestMatch(fileName) {
    const strategies = [
      this.exactNameMatch.bind(this),
      this.businessNameMatch.bind(this),
      this.dateBasedMatch.bind(this),
      this.categoryBasedMatch.bind(this)
    ];

    for (const strategy of strategies) {
      const match = strategy(fileName);
      if (match) return match;
    }

    return null;
  }

  // Strategy 1: Exact name matching (highest confidence)
  exactNameMatch(fileName) {
    const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    for (const [supabasePath, url] of Object.entries(this.supabaseMapping)) {
      const supabaseFileName = supabasePath.split('/').pop().toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (cleanFileName === supabaseFileName) {
        return {
          path: supabasePath,
          category: this.extractCategory(supabasePath),
          confidence: 'exact'
        };
      }
    }
    return null;
  }

  // Strategy 2: Business name matching
  businessNameMatch(fileName) {
    const businessNames = [
      'dancology', 'liberty', 'performance', 'precision_tune', 'precision tune',
      'hectors', 'plant_jungle', 'plant jungle', 'direct_source', 'direct source',
      'day violins', 'horse_crazy', 'horse crazy', 'canyon hills', 'salt cycles'
    ];

    const fileNameLower = fileName.toLowerCase();
    for (const businessName of businessNames) {
      if (fileNameLower.includes(businessName.replace(/\s+/g, '')) || 
          fileNameLower.includes(businessName.replace(/\s+/g, '_'))) {
        
        // Find matching Supabase path
        for (const [supabasePath, url] of Object.entries(this.supabaseMapping)) {
          if (url.toLowerCase().includes(businessName.toLowerCase())) {
            return {
              path: supabasePath,
              category: this.extractCategory(supabasePath),
              confidence: 'business_name'
            };
          }
        }
      }
    }
    return null;
  }

  // Strategy 3: Date-based matching
  dateBasedMatch(fileName) {
    const datePattern = /(\d{8})_(\d{6})/;
    const match = fileName.match(datePattern);
    
    if (match) {
      const dateStr = match[1] + '_' + match[2];
      
      // Find matching date in Supabase paths
      for (const [supabasePath, url] of Object.entries(this.supabaseMapping)) {
        if (supabasePath.includes(dateStr)) {
          return {
            path: supabasePath,
            category: this.extractCategory(supabasePath),
            confidence: 'date_based'
          };
        }
      }
    }
    return null;
  }

  // Strategy 4: Category-based matching
  categoryBasedMatch(fileName) {
    const categories = {
      'banner': 'Banners',
      'sign': 'Business Signage',
      'channel': 'Channel Letters',
      'laser': 'Laser Engraving',
      'vehicle': 'Vehicle Graphics',
      'monument': 'Monument Signs',
      'office': 'Office Signage',
      'fabricated': 'Fabricated Signs'
    };

    const fileNameLower = fileName.toLowerCase();
    for (const [keyword, category] of Object.entries(categories)) {
      if (fileNameLower.includes(keyword)) {
        // Find a representative path for this category
        for (const [supabasePath, url] of Object.entries(this.supabaseMapping)) {
          if (supabasePath.includes(category)) {
            return {
              path: supabasePath.replace(path.basename(supabasePath), fileName),
              category: category,
              confidence: 'category_based'
            };
          }
        }
      }
    }
    return null;
  }

  // Extract category from Supabase path
  extractCategory(supabasePath) {
    const parts = supabasePath.split('/');
    if (parts.length >= 2) {
      return parts[0]; // First part is usually the category
    }
    return 'Unknown';
  }

  // Generate gsutil migration command
  generateMigrationCommand(fileName, targetPath) {
    const targetPathParts = targetPath.split('/');
    const category = targetPathParts[0];
    const fileNameInPath = targetPathParts[targetPathParts.length - 1];
    
    // Create the target path in Firebase
    const firebaseTargetPath = `Master%20Sign/assets/${category}/${fileName}`;
    
    return {
      command: `gsutil mv gs://${BUCKET_NAME}/${fileName} gs://${BUCKET_NAME}/${firebaseTargetPath}`,
      source: fileName,
      target: firebaseTargetPath,
      category: category
    };
  }

  // Generate migration plan
  generateMigrationPlan() {
    console.log('📋 Generating migration plan...');
    
    // Group by category
    const categoryGroups = {};
    this.matches.forEach(match => {
      const category = match.category;
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(match);
    });

    // Create migration plan
    this.migrationPlan = Object.entries(categoryGroups).map(([category, matches]) => ({
      category,
      fileCount: matches.length,
      commands: matches.map(m => m.migrationCommand),
      files: matches.map(m => m.firebaseFile)
    }));

    console.log(`✅ Migration plan created for ${Object.keys(categoryGroups).length} categories`);
  }

  // Save results to files
  saveResults() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Save migration plan
    const migrationPlanPath = path.join(OUTPUT_DIR, 'migration-plan.json');
    fs.writeFileSync(migrationPlanPath, JSON.stringify(this.migrationPlan, null, 2));
    console.log(`📁 Migration plan saved to: ${migrationPlanPath}`);

    // Save gsutil commands
    const commandsPath = path.join(OUTPUT_DIR, 'gsutil-commands.sh');
    const commands = this.migrationPlan
      .flatMap(plan => plan.commands)
      .map(cmd => cmd.command)
      .join('\n');
    fs.writeFileSync(commandsPath, `#!/bin/bash\n\n# Firebase Storage Migration Commands\n# Generated on: ${new Date().toISOString()}\n\n${commands}\n`);
    console.log(`📁 gsutil commands saved to: ${commandsPath}`);

    // Save detailed matches
    const matchesPath = path.join(OUTPUT_DIR, 'detailed-matches.json');
    fs.writeFileSync(matchesPath, JSON.stringify({
      summary: {
        totalFiles: this.firebaseFiles.length,
        matchedFiles: this.matches.length,
        unmatchedFiles: this.unmatched.length,
        categories: this.migrationPlan.length
      },
      matches: this.matches,
      unmatched: this.unmatched
    }, null, 2));
    console.log(`📁 Detailed matches saved to: ${matchesPath}`);
  }

  // Display summary
  displaySummary() {
    console.log('\n🎯 MIGRATION SUMMARY');
    console.log('====================');
    console.log(`📁 Total Firebase files: ${this.firebaseFiles.length}`);
    console.log(`✅ Matched files: ${this.matches.length}`);
    console.log(`❌ Unmatched files: ${this.unmatched.length}`);
    console.log(`📂 Categories: ${this.migrationPlan.length}`);
    
    console.log('\n📊 Category Breakdown:');
    this.migrationPlan.forEach(plan => {
      console.log(`  ${plan.category}: ${plan.fileCount} files`);
    });

    if (this.unmatched.length > 0) {
      console.log('\n❌ Unmatched Files (need manual review):');
      this.unmatched.slice(0, 10).forEach(file => console.log(`  - ${file}`));
      if (this.unmatched.length > 10) {
        console.log(`  ... and ${this.unmatched.length - 10} more`);
      }
    }

    console.log('\n🚀 Next Steps:');
    console.log('1. Review migration plan in firebase-backend/migration/');
    console.log('2. Test with a few files first');
    console.log('3. Run gsutil commands when ready');
    console.log('4. Verify files are in correct locations');
  }
}

// Main execution
async function main() {
  console.log('🚀 Firebase Image Migration - Smart Mapping Script');
  console.log('================================================\n');

  const matcher = new SmartImageMatcher();

  // Step 1: Load Supabase mapping
  if (!matcher.loadSupabaseMapping()) {
    process.exit(1);
  }

  // Step 2: Get Firebase files
  if (!matcher.getFirebaseFiles()) {
    process.exit(1);
  }

  // Step 3: Smart matching
  matcher.matchImages();

  // Step 4: Generate migration plan
  matcher.generateMigrationPlan();

  // Step 5: Save results
  matcher.saveResults();

  // Step 6: Display summary
  matcher.displaySummary();
}

// Run the script
main().catch(error => {
  console.error('❌ Script execution failed:', error);
  process.exit(1);
});
