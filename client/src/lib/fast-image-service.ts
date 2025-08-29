// Fast Image Service - Uses Supabase images instead of slow Unsplash URLs
// This provides fast-loading professional images for all products

export interface FastImageMapping {
  [key: string]: string;
}

// Fast Supabase images mapped to product categories
export const FAST_IMAGES: FastImageMapping = {
  // Channel Letters - Fast professional images
  'channel-letters-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/24330.jpeg',
  'channel-letters-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194813.jpg',
  'channel-letters-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194652.jpg',
  
  // Monument Signs - Fast professional images
  'monument-sign-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Monument%20Sign.JPG',
  'monument-sign-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
  'monument-sign-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg',
  
  // Real Estate Signs - Fast professional images
  'real-estate-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
  'real-estate-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
  'real-estate-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
  
  // Vinyl Banners - Fast professional images
  'vinyl-banner-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
  'vinyl-banner-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner-Canyon%20Hills.jpg',
  'vinyl-banner-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20(3).jpg',
  
  // Vehicle Wraps - Fast professional images
  'vehicle-wrap-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
  'vehicle-wrap-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20230410_173103.jpg',
  'vehicle-wrap-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20241112_170827.jpg',
  
  // Trailer Graphics - Fast professional images
  'trailer-graphics-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20241112_170953.jpg',
  'trailer-graphics-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20241112_194652.jpg',
  'trailer-graphics-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20241112_194813.jpg',
  
  // Laser Engraving - Fast professional images
  'laser-engraving-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
  'laser-engraving-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20160921_215751-edited.jpg',
  'laser-engraving-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20170605_125901-edited.jpg',
  
  // Trade Show Displays - Fast professional images
  'trade-show-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
  'trade-show-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
  'trade-show-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
  
  // Vinyl Decals - Fast professional images
  'vinyl-decals-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
  'vinyl-decals-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20191007_220944.jpg',
  'vinyl-decals-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20191007_221000.jpg',
  
  // LED Digital Signs - Fast professional images
  'led-digital-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194813.jpg',
  'led-digital-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194652.jpg',
  'led-digital-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/24330.jpeg',
  
  // Neon Signs - Fast professional images
  'neon-signs-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20170526_191737-edited.jpg',
  'neon-signs-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20170711_114459-edited.jpg',
  'neon-signs-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20180104_230648.jpg',
  
  // Office Signs - Fast professional images
  'office-signs-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/20231207_094933.jpg',
  'office-signs-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/20230120_165654.jpg',
  'office-signs-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
  
  // Wall Murals - Fast professional images
  'wall-murals-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
  'wall-murals-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
  'wall-murals-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20191007_220944.jpg',
  
  // Pylon Signs - Fast professional images
  'pylon-signs-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Monument%20Sign.JPG',
  'pylon-signs-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
  'pylon-signs-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg',
  
  // Window Privacy Films - Fast professional images
  'window-privacy-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Window%20Tint%20%26%20Frost/IMG_20230503_200206_01.jpg',
  'window-privacy-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Window%20Wear%20-%20touched%20up.jpg',
  'window-privacy-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20191010_113014.jpg',
  
  // Business Branding - Fast professional images
  'business-branding-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Dancology.jpg',
  'business-branding-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
  'business-branding-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg',
  
  // Custom Promotional Items - Fast professional images
  'promotional-items-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Clothes/FullSizeR.jpg',
  'promotional-items-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
  'promotional-items-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
  
  // Trade Show Giveaways - Fast professional images
  'trade-show-giveaways-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
  'trade-show-giveaways-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
  'trade-show-giveaways-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
  
  // Sign Mounting Hardware - Fast professional images
  'mounting-hardware-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154312.jpg',
  'mounting-hardware-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154153.jpg',
  'mounting-hardware-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154436.jpg',
  
  // Sign Cleaning Supplies - Fast professional images
  'cleaning-supplies-1': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
  'cleaning-supplies-2': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
  'cleaning-supplies-3': 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
};

// Get fast images for a product category
export function getFastImagesForCategory(category: string, count: number = 3): string[] {
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
  const images: string[] = [];
  
  for (let i = 1; i <= count; i++) {
    const imageKey = `${categoryKey}-${i}`;
    if (FAST_IMAGES[imageKey]) {
      images.push(FAST_IMAGES[imageKey]);
    }
  }
  
  // Fallback to generic images if category-specific ones aren't found
  if (images.length === 0) {
    return [
      FAST_IMAGES['business-branding-1'] || '',
      FAST_IMAGES['business-branding-2'] || '',
      FAST_IMAGES['business-branding-3'] || ''
    ].filter(Boolean);
  }
  
  return images;
}

// Get a random fast image for a product
export function getRandomFastImage(category: string): string {
  const images = getFastImagesForCategory(category, 3);
  if (images.length === 0) {
    return FAST_IMAGES['business-branding-1'] || '';
  }
  return images[Math.floor(Math.random() * images.length)];
}

// Get multiple fast images for a product
export function getMultipleFastImages(category: string, count: number = 3): string[] {
  return getFastImagesForCategory(category, count);
}
