#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://qwwptkqqybufsbeeyvcr.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if required environment variables are set
if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  console.log('\n💡 Make sure you have:');
  console.log('   1. Created a .env file in your project root');
  console.log('   2. Added SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  console.log('   3. Restarted your terminal/command prompt');
  console.log('\n📝 Example .env file:');
  console.log('   VITE_SUPABASE_URL=https://qwwptkqqybufsbeeyvcr.supabase.co');
  console.log('   VITE_SUPABASE_ANON_KEY=your-anon-key');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Product data with real images from the project
const products = [
  {
    name: 'Premium Channel Letters',
    description: 'High-quality illuminated channel letters perfect for business storefronts. Customizable colors, fonts, and lighting options. Made with premium aluminum and LED technology for maximum visibility and durability.',
    category: 'SIGNS',
    price: 299.99,
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg'
    ],
    specifications: {
      weight: 15,
      material: 'Aluminum with LED',
      finish: 'Powder Coated',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      dimensions: '12" to 24" Height',
      power: 'LED Energy Efficient',
      weather: 'Outdoor Rated'
    }
  },
  {
    name: 'Custom Vinyl Banner',
    description: 'High-quality vinyl banner perfect for events, trade shows, and outdoor advertising. Weather-resistant material with reinforced grommets for easy installation. Available in various sizes and custom designs.',
    category: 'BANNERS_FLAGS',
    price: 129.99,
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%281%29%20copy.jpg'
    ],
    specifications: {
      weight: 5,
      material: '13oz Vinyl',
      finish: 'Matte',
      durability: '3-5 Years',
      installation: 'Grommets Included',
      warranty: '2 Years',
      dimensions: '3\' x 6\' to 4\' x 8\'',
      resolution: 'High Resolution Print',
      weather: 'UV Protected'
    }
  },
  {
    name: 'Full Vehicle Wrap',
    description: 'Complete vehicle wrap service for cars, trucks, and vans. High-quality vinyl with professional installation. Transform your vehicle into a mobile billboard with custom graphics and branding.',
    category: 'VEHICLE_TRAILER',
    price: 2499.99,
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20230410_173103.jpg'
    ],
    specifications: {
      weight: 0,
      material: 'Premium Vinyl',
      finish: 'Laminated',
      durability: '5-7 Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      coverage: 'Full Vehicle Coverage',
      material: 'Premium Cast Vinyl',
      protection: 'Paint Protection'
    }
  },
  {
    name: 'Laser Engraved Plaque',
    description: 'Beautiful laser engraved plaque perfect for awards, recognition, and commemorative purposes. High-precision laser technology creates detailed, permanent engravings on various materials.',
    category: 'LASER_ENGRAVING',
    price: 89.99,
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/laser-sign.jpg'
    ],
    specifications: {
      weight: 1,
      material: 'Brass on Wood',
      finish: 'Polished',
      durability: 'Lifetime',
      installation: 'Hanging Hardware Included',
      warranty: '5 Years',
      dimensions: '6" x 8" to 8" x 10"',
      technology: 'High-Precision Laser',
      customization: 'Custom Text & Graphics'
    }
  },
  {
    name: 'Trade Show Display Banner',
    description: 'Professional trade show display banner with retractable stand. Perfect for exhibitions and business events. Easy setup and takedown with professional appearance and custom graphics.',
    category: 'EXPO_DISPLAY',
    price: 399.99,
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg'
    ],
    specifications: {
      weight: 12,
      material: 'Vinyl with Aluminum',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      dimensions: '3\' x 6\' to 4\' x 8\'',
      stand: 'Retractable Aluminum Stand',
      portability: 'Includes Carrying Case'
    }
  }
];

/**
 * Add products to Supabase database
 */
async function addProducts() {
  console.log('🚀 Starting to add products to Supabase...\n');
  
  try {
    // Check if products table exists and has data
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id, name')
      .limit(5);
    
    if (checkError) {
      console.error('❌ Error checking existing products:', checkError.message);
      console.log('\n💡 Make sure you have:');
      console.log('   1. Created the products table in Supabase');
      console.log('   2. Updated the SUPABASE_SERVICE_KEY in this script');
      console.log('   3. Run the SQL schema from supabase-schema.sql');
      return;
    }
    
    if (existingProducts && existingProducts.length > 0) {
      console.log(`⚠️  Found ${existingProducts.length} existing products:`);
      existingProducts.forEach(product => {
        console.log(`   - ${product.name} (ID: ${product.id})`);
      });
      console.log('\n');
    }
    
    // Add each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`📦 Adding product ${i + 1}/${products.length}: ${product.name}`);
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          short_description: product.description,
          long_description: product.description,
          category: product.category,
          sub_category: product.category,
          images: product.images,
          specifications: product.specifications,
          pricing: {
            base_price: product.price,
            currency: 'USD',
            unit: 'piece'
          },
          features: product.specifications,
          tags: [product.category.toLowerCase(), 'master-signs'],
          popular: false,
          featured: false,
          availability: 'In Stock',
          estimated_delivery: '3-5 business days',
          rating: 4.5,
          review_count: 0,
          question_count: 0
        })
        .select();
      
      if (error) {
        console.error(`   ❌ Failed to add ${product.name}:`, error.message);
      } else {
        console.log(`   ✅ Successfully added ${product.name} (ID: ${data[0].id})`);
        console.log(`      Category: ${product.category}`);
        console.log(`      Price: $${product.price} (stored in pricing field)`);
        console.log(`      Images: ${product.images.length} images`);
      }
      console.log('');
    }
    
    console.log('🎉 Product addition process completed!');
    
    // Verify final count
    const { data: finalProducts, error: finalError } = await supabase
      .from('products')
      .select('id, name, category, short_description');
    
    if (!finalError && finalProducts) {
      console.log(`\n📊 Final product count: ${finalProducts.length}`);
      console.log('\n📋 Products in database:');
      finalProducts.forEach(product => {
        console.log(`   - ${product.name} (${product.category})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

/**
 * Test database connection
 */
async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🏪 Master Signs - Product Database Setup\n');
  console.log('📋 This script will add 5 sample products to your Supabase database');
  console.log('🖼️  Using real images from your existing project assets\n');
  

  
  // Test connection first
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ Cannot proceed without database connection');
    process.exit(1);
  }
  
  console.log('');
  
  // Add products
  await addProducts();
  
  console.log('\n✨ Setup complete! You can now view these products in your Supabase dashboard.');
  console.log('🔗 Dashboard: https://supabase.com/dashboard/project/qwwptkqqybufsbeeyvcr/editor');
}

// Run the script
main().catch(console.error);
