#!/usr/bin/env node

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQk6eD1PWv5UxwWzjHivW4l4EapSpxO2Y",
  authDomain: "mastersign-d8396.firebaseapp.com",
  projectId: "mastersign-d8396",
  storageBucket: "mastersign-d8396.firebasestorage.app",
  messagingSenderId: "688784364899",
  appId: "1:688784364899:web:b27c29f9d3a4e1f398ef56",
  measurementId: "G-3YV9XHP9PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Complete category and sub-category mapping (from your existing script)
const CATEGORY_SUBCATEGORIES = {
  'EXPO_DISPLAY': [
    'Trade Show Displays', 'Banner Stands', 'Custom Table Covers', 
    'Event Tent Signs', 'Trade Show Support Materials', 'Pop-up Displays',
    'Retractable Banners', 'Table Covers', 'Event Signage', 'Display Accessories'
  ],
  'LASER_ENGRAVING': [
    'Engraved Signs', 'Laser Engraved Plaques and Awards', 'Laser Engraved Metal',
    'Laser Engraved Wood', 'Laser Engraved Plastic', 'Custom Promotional Products',
    'Laser Cut Signs', 'Engraved Plaques', 'Metal Engraving', 'Wood Engraving'
  ],
  'DECALS_STICKERS': [
    'Custom Stickers', 'Wall Decals', 'Window Decals', 'Floor Decals',
    'Vinyl Lettering', 'Custom Vinyl Decals', 'Die-Cut Stickers',
    'Vehicle Magnets', 'Custom Magnets', 'Vinyl Graphics', 'Sticker Sheets',
    'Wall Graphics', 'Window Graphics', 'Floor Graphics', 'Vehicle Decals'
  ],
  'BANNERS_FLAGS': [
    'Vinyl Banners', 'Flags', 'Custom Flags', 'Flag Poles and Accessories',
    'Pole Banners', 'Event and Promotional Banners', 'Banners for Sports Teams',
    'Outdoor Banners', 'Indoor Banners', 'Flag Poles', 'Banner Stands',
    'Promotional Banners', 'Sports Banners', 'Event Banners'
  ],
  'SIGNS': [
    'Channel Letters', 'Monument Signs', 'Directional Signs', 'Neon Signs',
    'Illuminated Signs', 'Dimensional Signs', 'Building Signs', 'Lobby Signs',
    'Door Signs', 'A-Frame Signs', 'Reflective Signs', 'Safety Signs',
    'Wayfinding Signs', 'ADA Compliant Signs', 'Custom Signs', 'Floor Graphics',
    'Wall Graphics', 'Pylon Signs', 'Yard Signs', 'Real Estate Signs',
    'Hanging Signs', 'Temporary and Event Signage', 'Business Signs',
    'Office Signs', 'Retail Signs', 'Restaurant Signs', 'Healthcare Signs'
  ],
  'PRIVACY_SECURITY': [
    'Window Privacy Films', 'Security Window Films', 'Decorative Window Films',
    'Solar Control Films', 'Frosted Glass', 'Privacy Decals', 'Security Decals',
    'Window Tinting', 'Privacy Graphics', 'Security Graphics'
  ],
  'MARKETING': [
    'Branding for Businesses', 'Signage for Multi-Location Programs',
    'Sign Design and Consultation', 'Digital Printing', 'Marketing Signage',
    'Custom Vinyl Decals', 'Point-of-Purchase Displays', 'Printed Wall Graphics',
    'Business Cards', 'Metal Business Cards', 'Marketing Materials',
    'Brand Identity', 'Corporate Signage', 'Marketing Graphics'
  ],
  'PROMO': [
    'Custom Promotional Products', 'Custom Trophies, Awards, and Plaques',
    'Bumper Stickers', 'Custom Magnets', 'Promotional Items',
    'Custom Apparel', 'Event Giveaways', 'Promotional Signs',
    'Award Plaques', 'Trophy Engraving', 'Promotional Graphics'
  ],
  'ELECTRIC_SIGNS': [
    'LED Signs', 'Neon Signs', 'Digital Displays', 'Backlit Signs',
    'Channel Letter Signs', 'Electronic Message Centers', 'Video Walls',
    'Interactive Displays', 'LED Displays', 'Neon Lighting', 'Digital Signage',
    'Backlit Graphics', 'Electronic Signs', 'LED Message Boards'
  ],
  'VEHICLE_TRAILER': [
    'Vehicle Wraps', 'Vehicle Graphics', 'Trailer Graphics', 'Fleet Graphics',
    'Vehicle Magnets', 'Window Tinting', 'Custom Vehicle Lettering',
    'Commercial Vehicle Branding', 'Car Wraps', 'Truck Graphics',
    'Trailer Wraps', 'Fleet Branding', 'Vehicle Decals'
  ],
  'INDOOR_SIGNS': [
    'Wall Signs', 'Lobby Signs', 'Directional Signs', 'Office Signs',
    'Retail Signs', 'Restaurant Signs', 'Healthcare Signs', 'Educational Signs',
    'Floor Graphics', 'Ceiling Signs', 'Interior Graphics', 'Office Decor',
    'Retail Graphics', 'Healthcare Graphics', 'Educational Graphics'
  ],
  'OUTDOOR_SIGNS': [
    'Monument Signs', 'Pylon Signs', 'Yard Signs', 'Real Estate Signs',
    'Building Signs', 'Directional Signs', 'Safety Signs', 'Traffic Signs',
    'Outdoor Banners', 'Flag Poles and Flags', 'Exterior Signs',
    'Outdoor Graphics', 'Safety Graphics', 'Traffic Graphics'
  ],
  'ACCESSORIES': [
    'Mounting Hardware', 'Display Stands', 'Flag Poles', 'Sign Posts',
    'Brackets and Mounts', 'Lighting Accessories', 'Installation Tools',
    'Maintenance Supplies', 'Sign Hardware', 'Display Accessories',
    'Mounting Systems', 'Installation Kits', 'Maintenance Tools'
  ]
};

// Image mapping (keeping existing Supabase URLs)
const CATEGORY_IMAGE_MAPPING = {
  'EXPO_DISPLAY': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/Pop-up%20Banners.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg'
  ],
  'LASER_ENGRAVING': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Directories%20&%20Plaques/Plaques1.JPG'
  ],
  'BANNERS_FLAGS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%281%29%20copy.jpg'
  ],
  'SIGNS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg'
  ]
  // Add more categories as needed
};

// Step 1: Add Categories
async function addCategories() {
  console.log('🏷️  Adding Categories...\n');
  
  const categoryIds = {};
  let successCount = 0;
  
  for (const [categoryKey, subCategories] of Object.entries(CATEGORY_SUBCATEGORIES)) {
    try {
      const categoryData = {
        categoryId: categoryKey,
        name: categoryKey.replace('_', ' '),
        description: `Professional ${categoryKey.toLowerCase().replace('_', ' ')} solutions for all your signage needs`,
        icon: '🎯',
        image: CATEGORY_IMAGE_MAPPING[categoryKey]?.[0] || '',
        featuredSubCategories: subCategories.slice(0, 3), // First 3 sub-categories
        popular: ['SIGNS', 'BANNERS_FLAGS', 'VEHICLE_TRAILER'].includes(categoryKey),
        isActive: true,
        sortOrder: Object.keys(CATEGORY_SUBCATEGORIES).indexOf(categoryKey) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const categoryRef = await addDoc(collection(db, 'categories'), categoryData);
      categoryIds[categoryKey] = categoryRef.id;
      
      console.log(`✅ Added category: ${categoryKey} (ID: ${categoryRef.id})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to add category ${categoryKey}:`, error.message);
    }
  }
  
  console.log(`\n📊 Categories added: ${successCount}/${Object.keys(CATEGORY_SUBCATEGORIES).length}`);
  return categoryIds;
}

// Step 2: Add Sub-Categories
async function addSubCategories(categoryIds) {
  console.log('\n📂 Adding Sub-Categories...\n');
  
  const subCategoryIds = {};
  let successCount = 0;
  
  for (const [categoryKey, subCategories] of Object.entries(CATEGORY_SUBCATEGORIES)) {
    const categoryId = categoryIds[categoryKey];
    if (!categoryId) continue;
    
    subCategoryIds[categoryKey] = {};
    
    for (let i = 0; i < subCategories.length; i++) {
      const subCategoryName = subCategories[i];
      
      try {
        const subCategoryData = {
          categoryId: categoryId,
          name: subCategoryName,
          description: `Professional ${subCategoryName.toLowerCase()} services`,
          isActive: true,
          sortOrder: i + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const subCategoryRef = await addDoc(collection(db, 'subCategories'), subCategoryData);
        subCategoryIds[categoryKey][subCategoryName] = subCategoryRef.id;
        
        console.log(`✅ Added sub-category: ${subCategoryName} (ID: ${subCategoryRef.id})`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Failed to add sub-category ${subCategoryName}:`, error.message);
      }
    }
  }
  
  console.log(`\n📊 Sub-categories added: ${successCount}`);
  return subCategoryIds;
}

// Step 3: Add Products
async function addProducts(categoryIds, subCategoryIds) {
  console.log('\n📦 Adding Products...\n');
  
  let successCount = 0;
  let totalProducts = 0;
  
  for (const [categoryKey, subCategories] of Object.entries(CATEGORY_SUBCATEGORIES)) {
    const categoryId = categoryIds[categoryKey];
    if (!categoryId) continue;
    
    for (const subCategoryName of subCategories) {
      const subCategoryId = subCategoryIds[categoryKey]?.[subCategoryName];
      if (!subCategoryId) continue;
      
      // Create 2-3 products per sub-category
      const productCount = Math.min(3, Math.floor(Math.random() * 3) + 2);
      
      for (let i = 0; i < productCount; i++) {
        totalProducts++;
        
        try {
          const productData = {
            name: `${subCategoryName} - ${i + 1}`,
            description: `Professional ${subCategoryName.toLowerCase()} with high-quality materials`,
            longDescription: `Premium ${subCategoryName.toLowerCase()} perfect for ${categoryKey.toLowerCase().replace('_', ' ')} applications. Expert craftsmanship and durable materials.`,
            category: categoryId,
            subcategory: subCategoryId,
            images: CATEGORY_IMAGE_MAPPING[categoryKey] || [],
            features: ['Professional Quality', 'Durable Materials', 'Custom Sizing'],
            rating: 4.5,
            reviewCount: Math.floor(Math.random() * 50),
            questionCount: Math.floor(Math.random() * 10),
            inStock: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: [categoryKey.toLowerCase(), subCategoryName.toLowerCase()],
            featured: Math.random() > 0.8, // 20% chance to be featured
            
            pricing: {
              basePrice: Math.floor(Math.random() * 800) + 99.99,
              pricingModel: 'fixed',
              currency: 'USD'
            },
            
            sizeConstraints: {
              allowCustomSize: true,
              minWidth: 12,
              maxWidth: 120,
              defaultWidth: 24,
              minHeight: 12,
              maxHeight: 120,
              defaultHeight: 36,
              unit: 'inch',
              step: 1
            },
            
            inventory: {
              inStock: true,
              stockQuantity: Math.floor(Math.random() * 100) + 10
            }
          };
          
          await addDoc(collection(db, 'products'), productData);
          console.log(`✅ Added product: ${productData.name}`);
          successCount++;
          
        } catch (error) {
          console.error(`❌ Failed to add product:`, error.message);
        }
      }
    }
  }
  
  console.log(`\n📊 Products added: ${successCount}/${totalProducts}`);
}

// Main execution
async function main() {
  console.log('🚀 Firebase Categories & Products Setup');
  console.log('=======================================\n');
  
  try {
    // Step 1: Add Categories
    const categoryIds = await addCategories();
    
    // Step 2: Add Sub-Categories
    const subCategoryIds = await addSubCategories(categoryIds);
    
    // Step 3: Add Products
    await addProducts(categoryIds, subCategoryIds);
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${Object.keys(categoryIds).length}`);
    console.log(`   Sub-categories: ${Object.values(subCategoryIds).reduce((acc, curr) => acc + Object.keys(curr).length, 0)}`);
    console.log(`   Products: Added successfully`);
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
  }
}

// Run the script
main().catch(console.error);
