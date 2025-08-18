// Working image utility functions using placeholder images
// This ensures your application displays images while we fix the Supabase URLs

export const IMAGE_MAPPING: Record<string, string> = {
  // App logos
  "app-logo-sub.png": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/app-logo-sub.png",
  "app-logo.png": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/app-logo.png",
  
  // Banners
  "Banners/MAIN - Banner.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg",
  "Banners/Banner (1) copy.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%281%29%20copy.jpg",
  "Banners/Banner (3).jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%283%29.jpg",
  "Banners/Banner (4) copy.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%284%29%20copy.jpg",
  "Banners/Banner (6) copy.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%286%29%20copy.jpg",
  "Banners/Banner-Canyon Hills.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner-Canyon%20Hills.jpg",
  
  // Business Signage
  "Business Signage/Performance.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg",
  "Business Signage/Hectors_Building.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg",
  "Business Signage/Liberty.JPG": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Liberty.JPG",
  "Business Signage/Dancology.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Dancology.jpg",
  "Business Signage/20240118_151230.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20240118_151230.jpg",
  
  // Vehicle Graphics
  "Vehicle Graphics/20240309_133150.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg",
  "Vehicle Graphics/20230410_173103.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20230410_173103.jpg",
  
  // Office Signage
  "Office Signage/20230120_165654.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/20230120_165654.jpg",
  "Office Signage/20231207_094933.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Office%20Signage/20231207_094933.jpg",
  
  // Indoor-Outdoor Displays
  "Indoor-Outdoor Displays/Exterior Sign.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Indoor-Outdoor%20Displays/Exterior%20Sign.jpg",
  "Indoor-Outdoor Displays/IMG_20230621_000909.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Indoor-Outdoor%20Displays/IMG_20230621_000909.jpg",
  
  // Channel Letters
  "Channel Letters/20241112_194813.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194813.jpg",
  "Channel Letters/24330.jpeg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/24330.jpeg",
  
  // Laser Engraving
  "Laser Engraving/fish.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg",
  
  // Fabricated Signs
  "Fabricated Signs/20230616_154312.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154312.jpg",
  "Fabricated Signs/20231114_212838.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20231114_212838.jpg",
  
  // Rigid Signs
  "Rigid Signs/20240424_104117.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Rigid%20Signs/20240424_104117.jpg",
  
  // Tradeshows-Expos
  "Tradeshows-Expos/popup1.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg",
  
  // Clothes
  "Clothes/FullSizeR.jpg": "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Clothes/FullSizeR.jpg"
};

/**
 * Get placeholder image URL for a local asset path
 */
export function getImageUrl(assetPath: string): string {
  // Remove @/assets/ prefix if present
  const cleanPath = assetPath.replace('@/assets/', '');
  
  // Try exact match first
  if (IMAGE_MAPPING[cleanPath]) {
    console.log(`✅ Found exact match for: ${cleanPath}`);
    return IMAGE_MAPPING[cleanPath];
  }
  
  // Try filename match (case-insensitive)
  const filename = cleanPath.split('/').pop() || '';
  for (const [key, url] of Object.entries(IMAGE_MAPPING)) {
    if (key.split('/').pop()?.toLowerCase() === filename.toLowerCase()) {
      console.log(`🔍 Matched ${assetPath} to ${key} (filename match)`);
      return url;
    }
  }
  
  // Return a fallback image if no match found
  console.warn(`❌ No image mapping found for: ${assetPath}`);
  return IMAGE_MAPPING["app-logo.png"] || "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/app-logo.png";
}

/**
 * Test if an image URL is accessible and return a fallback if not
 */
export async function testImageUrl(url: string, fallbackUrl?: string): Promise<string> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      return url;
    }
  } catch (error) {
    console.warn(`⚠️ Image URL not accessible: ${url}`, error);
  }
  
  // Return fallback or default
  return fallbackUrl || IMAGE_MAPPING["app-logo.png"] || "https://picsum.photos/400/400?random=999";
}

/**
 * Get placeholder image URL for a specific category
 */
export function getCategoryImage(category: string): string {
  const categoryMap: Record<string, string> = {
    'BANNERS_FLAGS': 'Banners/MAIN - Banner.jpg',
    'SIGNS': 'Business Signage/Performance.jpg',
    'VEHICLE_TRAILER': 'Vehicle Graphics/20240309_133150.jpg',
    'INDOOR_SIGNS': 'Office Signage/20230120_165654.jpg',
    'OUTDOOR_SIGNS': 'Indoor-Outdoor Displays/Exterior Sign.jpg',
    'ELECTRIC_SIGNS': 'Channel Letters/20241112_194813.jpg',
    'LASER_ENGRAVING': 'Laser Engraving/fish.jpg',
    'DECALS_STICKERS': 'Banners/MAIN - Banner.jpg',
    'EXPO_DISPLAY': 'Banners/MAIN - Banner.jpg',
    'PRIVACY_SECURITY': 'Indoor-Outdoor Displays/IMG_20230621_000909.jpg',
    'MARKETING': 'Business Signage/Dancology.jpg',
    'PROMO': 'Banners/MAIN - Banner.jpg',
    'ACCESSORIES': 'Fabricated Signs/20230616_154312.jpg'
  };
  
  const assetPath = categoryMap[category] || 'app-logo.png';
  console.log(`🎯 Category ${category} mapped to: ${assetPath}`);
  return getImageUrl(assetPath);
}
