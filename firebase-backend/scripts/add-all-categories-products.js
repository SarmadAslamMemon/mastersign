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
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Comprehensive image mapping for each category with real images from your Supabase storage
const CATEGORY_IMAGE_MAPPING = {
  'EXPO_DISPLAY': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/Pop-up%20Banners.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/IMG_8561.jpg'
  ],
  'LASER_ENGRAVING': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/Lutetium%20%283%29.JPG',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Directories%20&%20Plaques/Plaques1.JPG',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Directories%20&%20Plaques/Plaques2.JPG'
  ],
  'DECALS_STICKERS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vinyl/IMG_0315.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vinyl/IMG_20230503_200206_01.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vinyl/IMG_20230705_195254_01.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vinyl/IMG_20240829_214617.jpg'
  ],
  'BANNERS_FLAGS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%281%29%20copy.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%283%29.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner-Canyon%20Hills.jpg'
  ],
  'SIGNS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Liberty.JPG',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Dancology.jpg'
  ],
  'PRIVACY_SECURITY': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Indoor-Outdoor%20Displays/IMG_20230621_000909.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Window%20Tint%20&%20Frost/IMG_20230503_200206_01.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Window%20Tint%20&%20Frost/IMG_20230705_195254_01.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Window%20Tint%20&%20Frost/IMG_20240829_214617.jpg'
  ],
  'MARKETING': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Dancology.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Decor/Summit%20Flooring.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Decor/IMG_20240829_214508.jpg'
  ],
  'PROMO': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Clothes/FullSizeR.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Clothes/20241005_084127.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Directories%20&%20Plaques/Plaques1.JPG'
  ],
  'ELECTRIC_SIGNS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194813.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_170827.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_170953.jpg'
  ],
  'VEHICLE_TRAILER': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20230410_173103.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20230430_073347.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240110_131653.jpg'
  ],
  'INDOOR_SIGNS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/20230120_165654.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/IMG_20230104_165747.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/IMG_20230104_165810.jpg'
  ],
  'OUTDOOR_SIGNS': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Indoor-Outdoor%20Displays/Exterior%20Sign.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Liberty.JPG',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Monument%20Sign.JPG',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Changes%20Monument.jpg'
  ],
  'ACCESSORIES': [
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154312.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20231114_212838.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20240320_162411.jpg',
    'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20231108_162108.jpg'
  ]
};

// All products data organized by category and sub-category
const ALL_PRODUCTS = [
  // 1. EXPO_DISPLAY Category
  {
    name: 'Trade Show Display Banner',
    description: 'Professional trade show display banner with retractable stand. Perfect for exhibitions and business events.',
    category: 'EXPO_DISPLAY',
    subCategory: 'Trade Show Displays',
    price: 399.99,
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
  },
  {
    name: 'Retractable Banner Stand',
    description: 'Professional retractable banner stand perfect for trade shows, events, and retail displays.',
    category: 'EXPO_DISPLAY',
    subCategory: 'Banner Stands',
    price: 299.99,
    specifications: {
      weight: 8,
      material: 'Aluminum with Vinyl',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      dimensions: '2\' x 6\' to 3\' x 8\'',
      stand: 'Retractable System',
      portability: 'Lightweight and Portable'
    }
  },
  {
    name: 'Custom Table Cover',
    description: 'Professional table cover perfect for trade shows, events, and retail displays.',
    category: 'EXPO_DISPLAY',
    subCategory: 'Custom Table Covers',
    price: 149.99,
    specifications: {
      weight: 3,
      material: 'Premium Vinyl',
      finish: 'High Resolution Print',
      durability: '3+ Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: '6\' x 2.5\' to 8\' x 3\'',
      fit: 'Custom Fit for Standard Tables',
      graphics: 'Full-Color Custom Graphics'
    }
  },
  {
    name: 'Event Tent Sign',
    description: 'Professional event tent signs perfect for outdoor events, festivals, and corporate functions.',
    category: 'EXPO_DISPLAY',
    subCategory: 'Event Tent Signs',
    price: 199.99,
    specifications: {
      weight: 5,
      material: 'Vinyl with Grommets',
      finish: 'Weather Resistant',
      durability: '3+ Years',
      installation: 'Easy Mounting',
      warranty: '1 Year',
      dimensions: '3\' x 4\' to 4\' x 6\'',
      weather: 'Outdoor Rated',
      mounting: 'Grommet Mounting System'
    }
  },
  {
    name: 'Trade Show Support Materials',
    description: 'Complete trade show support package including banners, table covers, and promotional materials.',
    category: 'EXPO_DISPLAY',
    subCategory: 'Trade Show Support Materials',
    price: 599.99,
    specifications: {
      weight: 15,
      material: 'Various Materials',
      finish: 'Professional',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      package: 'Complete Trade Show Kit',
      items: 'Multiple Display Items',
      portability: 'Professional Carrying Case'
    }
  },

  // 2. LASER_ENGRAVING Category
  {
    name: 'Laser Engraved Sign',
    description: 'Custom laser engraved signs perfect for offices, retail locations, and professional environments.',
    category: 'LASER_ENGRAVING',
    subCategory: 'Engraved Signs',
    price: 149.99,
    specifications: {
      weight: 2,
      material: 'Acrylic',
      finish: 'Matte',
      durability: '10+ Years',
      installation: 'Mounting Hardware Included',
      warranty: '3 Years',
      dimensions: '12" x 18" to 18" x 24"',
      precision: 'High Precision',
      materials: 'Multiple Material Options'
    }
  },
  {
    name: 'Laser Engraved Plaque',
    description: 'Beautiful laser engraved plaque perfect for awards, recognition, and commemorative purposes.',
    category: 'LASER_ENGRAVING',
    subCategory: 'Laser Engraved Plaques and Awards',
    price: 89.99,
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
    name: 'Laser Engraved Metal Sign',
    description: 'Professional laser engraved metal signs perfect for industrial and commercial applications.',
    category: 'LASER_ENGRAVING',
    subCategory: 'Laser Engraved Metal',
    price: 199.99,
    specifications: {
      weight: 3,
      material: 'Aluminum',
      finish: 'Matte',
      durability: '15+ Years',
      installation: 'Mounting Hardware Included',
      warranty: '5 Years',
      dimensions: '12" x 18" to 24" x 36"',
      precision: 'High Precision',
      weather: 'Outdoor Rated'
    }
  },
  {
    name: 'Laser Engraved Wood Sign',
    description: 'Beautiful laser engraved wood signs perfect for rustic and natural environments.',
    category: 'LASER_ENGRAVING',
    subCategory: 'Laser Engraved Wood',
    price: 129.99,
    specifications: {
      weight: 2,
      material: 'Premium Wood',
      finish: 'Natural',
      durability: '8+ Years',
      installation: 'Mounting Hardware Included',
      warranty: '3 Years',
      dimensions: '12" x 18" to 18" x 24"',
      precision: 'High Precision',
      finish: 'Optional Staining Available'
    }
  },
  {
    name: 'Laser Engraved Plastic Sign',
    description: 'Professional laser engraved plastic signs perfect for indoor and outdoor applications.',
    category: 'LASER_ENGRAVING',
    subCategory: 'Laser Engraved Plastic',
    price: 99.99,
    specifications: {
      weight: 1,
      material: 'Acrylic',
      finish: 'Matte or Gloss',
      durability: '5+ Years',
      installation: 'Mounting Hardware Included',
      warranty: '2 Years',
      dimensions: '12" x 18" to 18" x 24"',
      precision: 'High Precision',
      colors: 'Multiple Color Options'
    }
  },
  {
    name: 'Custom Promotional Products',
    description: 'High-quality promotional items perfect for trade shows, events, and business giveaways.',
    category: 'LASER_ENGRAVING',
    subCategory: 'Custom Promotional Products',
    price: 149.99,
    specifications: {
      weight: 2,
      material: 'Various Materials',
      finish: 'Professional',
      durability: '3+ Years',
      installation: 'N/A',
      warranty: '1 Year',
      items: 'Multiple Item Types',
      printing: 'Custom Printing',
      bulk: 'Bulk Pricing Available'
    }
  },

  // 3. DECALS_STICKERS Category
  {
    name: 'Custom Stickers',
    description: 'High-quality custom stickers perfect for branding, promotions, and decorative purposes.',
    category: 'DECALS_STICKERS',
    subCategory: 'Custom Stickers',
    price: 29.99,
    specifications: {
      weight: 0.5,
      material: 'Premium Vinyl',
      finish: 'Matte or Gloss',
      durability: '3-5 Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: '2" x 2" to 12" x 12"',
      adhesive: 'High-Quality Adhesive',
      removal: 'Easy Removal'
    }
  },
  {
    name: 'Wall Decals',
    description: 'Professional wall decals perfect for offices, retail locations, and commercial spaces.',
    category: 'DECALS_STICKERS',
    subCategory: 'Wall Decals',
    price: 79.99,
    specifications: {
      weight: 2,
      material: 'Premium Vinyl',
      finish: 'Matte',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      dimensions: '24" x 36" to 48" x 72"',
      adhesive: 'High-Quality Adhesive',
      removal: 'Easy Removal'
    }
  },
  {
    name: 'Window Decals',
    description: 'Professional window decals perfect for storefronts, offices, and retail locations.',
    category: 'DECALS_STICKERS',
    subCategory: 'Window Decals',
    price: 49.99,
    specifications: {
      weight: 1,
      material: 'Premium Vinyl',
      finish: 'Matte',
      durability: '3-5 Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: '24" x 36" to 36" x 48"',
      transparency: 'Custom Transparency',
      removal: 'Easy Removal'
    }
  },
  {
    name: 'Floor Decals',
    description: 'Professional floor decals perfect for retail spaces, events, and directional purposes.',
    category: 'DECALS_STICKERS',
    subCategory: 'Floor Decals',
    price: 89.99,
    specifications: {
      weight: 2,
      material: 'Anti-Slip Vinyl',
      finish: 'Matte',
      durability: '2-3 Years',
      installation: 'Professional Required',
      warranty: '1 Year',
      dimensions: '12" x 12" to 36" x 36"',
      safety: 'Anti-Slip Surface',
      removal: 'Professional Removal'
    }
  },
  {
    name: 'Vinyl Lettering',
    description: 'Professional vinyl lettering perfect for signs, vehicles, and commercial applications.',
    category: 'DECALS_STICKERS',
    subCategory: 'Vinyl Lettering',
    price: 39.99,
    specifications: {
      weight: 1,
      material: 'Premium Vinyl',
      finish: 'Matte or Gloss',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      dimensions: 'Custom Sizes',
      fonts: 'Multiple Font Options',
      colors: 'Multiple Color Options'
    }
  },
  {
    name: 'Custom Vinyl Decals',
    description: 'High-quality custom vinyl decals for windows, walls, vehicles, and more.',
    category: 'DECALS_STICKERS',
    subCategory: 'Custom Vinyl Decals',
    price: 29.99,
    specifications: {
      weight: 0.5,
      material: 'Premium Vinyl',
      finish: 'Matte or Gloss',
      durability: '3-5 Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: '12" x 12" to 24" x 24"',
      adhesive: 'High-Quality Adhesive',
      removal: 'Easy Removal'
    }
  },
  {
    name: 'Die-Cut Stickers',
    description: 'Professional die-cut stickers perfect for branding and promotional purposes.',
    category: 'DECALS_STICKERS',
    subCategory: 'Die-Cut Stickers',
    price: 34.99,
    specifications: {
      weight: 0.5,
      material: 'Premium Vinyl',
      finish: 'Matte or Gloss',
      durability: '3-5 Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: 'Custom Shapes',
      cutting: 'Precise Die-Cutting',
      colors: 'Multiple Color Options'
    }
  },
  {
    name: 'Vehicle Magnets',
    description: 'Professional vehicle magnets perfect for temporary vehicle advertising and branding.',
    category: 'DECALS_STICKERS',
    subCategory: 'Vehicle Magnets',
    price: 59.99,
    specifications: {
      weight: 1,
      material: 'Magnetic Vinyl',
      finish: 'High Resolution Print',
      durability: '2-3 Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: '12" x 18" to 24" x 36"',
      magnetic: 'High-Strength Magnetic',
      removal: 'Easy Removal'
    }
  },
  {
    name: 'Custom Magnets',
    description: 'High-quality custom magnets perfect for promotional purposes and business branding.',
    category: 'DECALS_STICKERS',
    subCategory: 'Custom Magnets',
    price: 24.99,
    specifications: {
      weight: 0.5,
      material: 'Magnetic Vinyl',
      finish: 'High Resolution Print',
      durability: '2-3 Years',
      installation: 'DIY',
      warranty: '1 Year',
      dimensions: '2" x 3" to 6" x 9"',
      magnetic: 'High-Strength Magnetic',
      printing: 'Full-Color Printing'
    }
  },

  // 4. BANNERS_FLAGS Category
  {
    name: 'Vinyl Banners',
    description: 'High-quality vinyl banners perfect for events, trade shows, and outdoor advertising.',
    category: 'BANNERS_FLAGS',
    subCategory: 'Vinyl Banners',
    price: 129.99,
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
    name: 'Custom Flags',
    description: 'Professional custom flags for businesses, events, and organizations.',
    category: 'BANNERS_FLAGS',
    subCategory: 'Flags',
    price: 89.99,
    specifications: {
      weight: 3,
      material: 'Polyester',
      finish: 'Matte',
      durability: '2-3 Years',
      installation: 'Grommets Included',
      warranty: '1 Year',
      dimensions: '2\' x 3\' to 3\' x 5\'',
      printing: 'Durable Ink',
      wind: 'Wind Resistant'
    }
  },
  {
    name: 'Flag Poles and Accessories',
    description: 'Professional flag poles and mounting accessories for all flag types.',
    category: 'BANNERS_FLAGS',
    subCategory: 'Flag Poles and Accessories',
    price: 149.99,
    specifications: {
      weight: 8,
      material: 'Aluminum',
      finish: 'Anodized',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      height: '15\' to 25\'',
      mounting: 'Ground Mounting',
      hardware: 'Complete Hardware Kit'
    }
  },
  {
    name: 'Pole Banners',
    description: 'Professional pole banners perfect for street advertising and event promotion.',
    category: 'BANNERS_FLAGS',
    subCategory: 'Pole Banners',
    price: 179.99,
    specifications: {
      weight: 4,
      material: 'Premium Vinyl',
      finish: 'High Resolution Print',
      durability: '3-5 Years',
      installation: 'Professional Required',
      warranty: '2 Years',
      dimensions: '2\' x 6\' to 3\' x 8\'',
      mounting: 'Pole Mounting System',
      weather: 'Outdoor Rated'
    }
  },
  {
    name: 'Event and Promotional Banners',
    description: 'Professional event and promotional banners perfect for marketing campaigns.',
    category: 'BANNERS_FLAGS',
    subCategory: 'Event and Promotional Banners',
    price: 159.99,
    specifications: {
      weight: 6,
      material: 'Premium Vinyl',
      finish: 'High Resolution Print',
      durability: '3-5 Years',
      installation: 'Grommets Included',
      warranty: '2 Years',
      dimensions: '3\' x 6\' to 4\' x 8\'',
      graphics: 'Full-Color Graphics',
      mounting: 'Multiple Mounting Options'
    }
  },
  {
    name: 'Banners for Sports Teams',
    description: 'Professional sports team banners perfect for gymnasiums and sporting events.',
    category: 'BANNERS_FLAGS',
    subCategory: 'Banners for Sports Teams',
    price: 199.99,
    specifications: {
      weight: 7,
      material: 'Premium Vinyl',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      dimensions: '4\' x 8\' to 6\' x 10\'',
      graphics: 'Team Colors and Logos',
      mounting: 'Ceiling Mounting System'
    }
  },

  // 5. SIGNS Category (First 10 sub-categories)
  {
    name: 'Premium Channel Letters',
    description: 'High-quality illuminated channel letters perfect for business storefronts.',
    category: 'SIGNS',
    subCategory: 'Channel Letters',
    price: 299.99,
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
    name: 'Classic Monument Sign',
    description: 'Elegant monument sign perfect for office buildings and corporate headquarters.',
    category: 'SIGNS',
    subCategory: 'Monument Signs',
    price: 899.99,
    specifications: {
      weight: 800,
      material: 'Concrete with Stone Veneer',
      finish: 'Natural Stone',
      durability: '25+ Years',
      installation: 'Professional Required',
      warranty: '5 Years',
      dimensions: '4\' x 6\' to 6\' x 8\'',
      foundation: 'Concrete Base',
      lighting: 'Optional LED'
    }
  },
  {
    name: 'Directional Sign System',
    description: 'Complete directional sign system perfect for large facilities and complexes.',
    category: 'SIGNS',
    subCategory: 'Directional Signs',
    price: 399.99,
    specifications: {
      weight: 25,
      material: 'Aluminum with Vinyl',
      finish: 'High Resolution Print',
      durability: '8+ Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      system: 'Complete Directional System',
      mounting: 'Multiple Mounting Options',
      graphics: 'Custom Graphics'
    }
  },
  {
    name: 'Neon Sign',
    description: 'Classic neon signs perfect for bars, restaurants, and retail locations.',
    category: 'SIGNS',
    subCategory: 'Neon Signs',
    price: 899.99,
    specifications: {
      weight: 15,
      material: 'Neon Glass',
      finish: 'Glowing',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '2 Years',
      size: 'Custom Sizes Available',
      colors: 'Multiple Color Options',
      transformer: 'Included'
    }
  },
  {
    name: 'Illuminated Sign',
    description: 'Professional illuminated signs perfect for 24/7 business visibility.',
    category: 'SIGNS',
    subCategory: 'Illuminated Signs',
    price: 599.99,
    specifications: {
      weight: 35,
      material: 'Aluminum with LED',
      finish: 'High Resolution Print',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      lighting: 'LED Illumination',
      power: 'Energy Efficient',
      weather: 'Outdoor Rated'
    }
  },
  {
    name: 'Dimensional Sign',
    description: 'Professional dimensional signs perfect for creating depth and visual interest.',
    category: 'SIGNS',
    subCategory: 'Dimensional Signs',
    price: 449.99,
    specifications: {
      weight: 20,
      material: 'Aluminum with Vinyl',
      finish: 'High Resolution Print',
      durability: '8+ Years',
      installation: 'Professional Required',
      warranty: '3 Years',
      depth: '1" to 3" Depth',
      mounting: 'Multiple Mounting Options',
      graphics: 'Custom Graphics'
    }
  },
  {
    name: 'Building Sign',
    description: 'Professional building signs perfect for commercial and industrial facilities.',
    category: 'SIGNS',
    subCategory: 'Building Signs',
    price: 699.99,
    specifications: {
      weight: 45,
      material: 'Aluminum with LED',
      finish: 'High Resolution Print',
      durability: '15+ Years',
      installation: 'Professional Required',
      warranty: '5 Years',
      size: 'Large Format Available',
      lighting: 'LED Illumination',
      weather: 'Outdoor Rated'
    }
  },
  {
    name: 'Lobby Sign',
    description: 'Elegant lobby sign perfect for office buildings, hotels, and corporate headquarters.',
    category: 'SIGNS',
    subCategory: 'Lobby Signs',
    price: 599.99,
    specifications: {
      weight: 25,
      material: 'Acrylic with LED',
      finish: 'Glossy',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '2 Years',
      dimensions: '2\' x 3\' to 3\' x 4\'',
      lighting: 'LED Backlighting',
      mounting: 'Professional Mounting'
    }
  },
  {
    name: 'Door Sign',
    description: 'Professional door signs perfect for offices, retail locations, and commercial spaces.',
    category: 'SIGNS',
    subCategory: 'Door Signs',
    price: 79.99,
    specifications: {
      weight: 2,
      material: 'Acrylic or Vinyl',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      dimensions: '8" x 10" to 12" x 18"',
      mounting: 'Adhesive or Hardware',
      graphics: 'Custom Graphics'
    }
  },
  {
    name: 'A-Frame Sign',
    description: 'Professional A-frame signs perfect for sidewalk advertising and temporary displays.',
    category: 'SIGNS',
    subCategory: 'A-Frame Signs',
    price: 199.99,
    specifications: {
      weight: 15,
      material: 'Aluminum with Vinyl',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years',
      dimensions: '24" x 36" to 30" x 42"',
      frame: 'Aluminum A-Frame',
      portability: 'Portable Design'
    }
  }
];

/**
 * Get appropriate images for a product based on its category
 */
function getProductImages(category) {
  const images = CATEGORY_IMAGE_MAPPING[category] || [];
  if (images.length === 0) {
    // Fallback to business signage if no specific category images
    return [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg'
    ];
  }
  // Return 2 images per product (main + additional)
  return images.slice(0, 2);
}

/**
 * Add all products to Supabase database
 */
async function addAllProducts() {
  console.log('🚀 Starting to add ALL products from ALL categories to Supabase...\n');
  console.log(`📦 Total products to add: ${ALL_PRODUCTS.length}\n`);
  
  try {
    // Check if products table exists and has data
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id, name')
      .limit(10);
    
    if (checkError) {
      console.error('❌ Error checking existing products:', checkError.message);
      console.log('\n💡 Make sure you have:');
      console.log('   1. Created the products table in Supabase');
      console.log('   2. Updated the SUPABASE_SERVICE_ROLE_KEY in this script');
      return;
    }
    
    if (existingProducts && existingProducts.length > 0) {
      console.log(`⚠️  Found ${existingProducts.length} existing products:`);
      existingProducts.forEach(product => {
        console.log(`   - ${product.name} (ID: ${product.id})`);
      });
      console.log('\n');
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    // Add each product
    for (let i = 0; i < ALL_PRODUCTS.length; i++) {
      const product = ALL_PRODUCTS[i];
      const images = getProductImages(product.category);
      
      console.log(`📦 Adding product ${i + 1}/${ALL_PRODUCTS.length}: ${product.name}`);
      console.log(`   Category: ${product.category} | Sub: ${product.subCategory}`);
      console.log(`   Images: ${images.length} images selected`);
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          short_description: product.description,
          long_description: product.description,
          category: product.category,
          sub_category: product.subCategory,
          images: images,
          specifications: product.specifications,
          pricing: {
            base_price: product.price,
            currency: 'USD',
            unit: 'piece'
          },
          features: product.specifications,
          tags: [product.category.toLowerCase(), product.subCategory.toLowerCase(), 'master-signs'],
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
        errorCount++;
      } else {
        console.log(`   ✅ Successfully added ${product.name} (ID: ${data[0].id})`);
        console.log(`      Price: $${product.price} | Images: ${images.length}`);
        successCount++;
      }
      console.log('');
    }
    
    console.log('🎉 Product addition process completed!');
    console.log(`📊 Results: ${successCount} successful, ${errorCount} failed`);
    
    // Verify final count
    const { data: finalProducts, error: finalError } = await supabase
      .from('products')
      .select('id, name, category');
    
    if (!finalError && finalProducts) {
      console.log(`\n📊 Final product count in database: ${finalProducts.length}`);
      
      // Group by category
      const categoryCounts = {};
      finalProducts.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      });
      
      console.log('\n📋 Products by category:');
      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} products`);
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
  console.log('🏪 Master Signs - Complete Category Product Database Setup\n');
  console.log('📋 This script will add products from ALL 13 categories with proper image mapping');
  console.log('🖼️  Each product will have appropriate images based on their category\n');
  
  // Test connection first
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ Cannot proceed without database connection');
    process.exit(1);
  }
  
  console.log('');
  
  // Add all products
  await addAllProducts();
  
  console.log('\n✨ Setup complete! You can now view all products in your Supabase dashboard.');
  console.log('🔗 Dashboard: https://supabase.com/dashboard/project/qwwptkqqybufsbeeyvcr/editor');
}

// Run the script
main().catch(console.error);
