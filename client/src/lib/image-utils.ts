// Working image utility functions using placeholder images
// This ensures your application displays images while we fix the Supabase URLs

export const IMAGE_MAPPING: Record<string, string> = {
  // App logos - using placeholder images temporarily
  "app-logo-sub.png": "https://picsum.photos/400/400?random=1",
  "app-logo.png": "https://picsum.photos/400/400?random=2",
  
  // Banners - using placeholder images temporarily
  "Banners/MAIN - Banner.jpg": "https://picsum.photos/1200/400?random=3",
  "Banners/Banner (1) copy.jpg": "https://picsum.photos/1200/400?random=4",
  "Banners/Banner (3).jpg": "https://picsum.photos/1200/400?random=5",
  "Banners/Banner (4) copy.jpg": "https://picsum.photos/1200/400?random=6",
  "Banners/Banner (6) copy.jpg": "https://picsum.photos/1200/400?random=7",
  "Banners/Banner-Canyon Hills.jpg": "https://picsum.photos/1200/400?random=8",
  
  // Business Signage - using placeholder images temporarily
  "Business Signage/Performance.jpg": "https://picsum.photos/800/600?random=9",
  "Business Signage/Hectors_Building.jpg": "https://picsum.photos/800/600?random=10",
  "Business Signage/Liberty.JPG": "https://picsum.photos/800/600?random=11",
  "Business Signage/Dancology.jpg": "https://picsum.photos/800/600?random=12",
  "Business Signage/20240118_151230.jpg": "https://picsum.photos/800/600?random=13",
  
  // Vehicle Graphics - using placeholder images temporarily
  "Vehicle Graphics/20240309_133150.jpg": "https://picsum.photos/800/600?random=14",
  "Vehicle Graphics/20230410_173103.jpg": "https://picsum.photos/800/600?random=15",
  
  // Office Signage - using placeholder images temporarily
  "Office Signage/20230120_165654.jpg": "https://picsum.photos/800/600?random=16",
  "Office Signage/20231207_094933.jpg": "https://picsum.photos/800/600?random=17",
  
  // Indoor-Outdoor Displays - using placeholder images temporarily
  "Indoor-Outdoor Displays/Exterior Sign.jpg": "https://picsum.photos/800/600?random=18",
  "Indoor-Outdoor Displays/IMG_20230621_000909.jpg": "https://picsum.photos/800/600?random=19",
  
  // Channel Letters - using placeholder images temporarily
  "Channel Letters/20241112_194813.jpg": "https://picsum.photos/800/600?random=20",
  "Channel Letters/24330.jpeg": "https://picsum.photos/800/600?random=21",
  
  // Laser Engraving - using placeholder images temporarily
  "Laser Engraving/fish.jpg": "https://picsum.photos/800/600?random=22",
  
  // Fabricated Signs - using placeholder images temporarily
  "Fabricated Signs/20230616_154312.jpg": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&crop=center",
  
  // Rigid Signs - using placeholder images temporarily
  "Rigid Signs/20240424_104117.jpg": "https://picsum.photos/800/600?random=25",
  
  // Tradeshows-Expos - using placeholder images temporarily
  "Tradeshows-Expos/popup1.jpg": "https://picsum.photos/800/600?random=26",
  
  // Clothes - using placeholder images temporarily
  "Clothes/FullSizeR.jpg": "https://picsum.photos/800/600?random=27"
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
  return IMAGE_MAPPING["app-logo.png"] || "https://picsum.photos/400/400?random=999";
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
