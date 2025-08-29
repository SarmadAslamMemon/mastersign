import { Product, ProductCategory, CategoryData, SubCategoryData } from '@/types/products';

// Dummy product data for all categories
export const DUMMY_PRODUCTS: Product[] = [
  // SIGNS Category
  {
    id: 'signs-channel-letters-1',
    name: 'Premium Channel Letters',
    category: ProductCategory.SIGNS,
    subCategory: 'Channel Letters',
    description: 'High-quality illuminated channel letters perfect for business storefronts. Customizable colors, fonts, and lighting options.',
    price: 299.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/24330.jpeg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/24330.jpeg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/24330.jpeg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194813.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Channel%20Letters/20241112_194652.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '12" Height', width: 12, height: 12, unit: 'inches', price: 299.99 },
      { id: 'size-2', name: '18" Height', width: 18, height: 18, unit: 'inches', price: 449.99 },
      { id: 'size-3', name: '24" Height', width: 24, height: 24, unit: 'inches', price: 599.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Standard', description: 'Classic rectangular channel letters', icon: '📐' },
      { id: 'shape-2', name: 'Rounded', description: 'Modern rounded corners', icon: '🔵' }
    ],
    materials: ['Aluminum', 'LED Lighting', 'Acrylic Face'],
    features: ['Energy Efficient', 'Weather Resistant', 'Easy Installation', 'Custom Colors'],
    specifications: {
      weight: 15,
      material: 'Aluminum with LED',
      finish: 'Powder Coated',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 127,
    tags: ['illuminated', 'storefront', 'business', 'custom'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'signs-monument-1',
    name: 'Classic Monument Sign',
    category: ProductCategory.SIGNS,
    subCategory: 'Monument Signs',
    description: 'Elegant monument sign perfect for office buildings, shopping centers, and corporate headquarters.',
    price: 899.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Monument%20Sign.JPG',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Monument%20Sign.JPG',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Monument%20Signs/Monument%20Sign.JPG',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '4\' x 6\'', width: 48, height: 72, unit: 'inches', price: 899.99 },
      { id: 'size-2', name: '6\' x 8\'', width: 72, height: 96, unit: 'inches', price: 1299.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Traditional', description: 'Classic rectangular design', icon: '🏛️' },
      { id: 'shape-2', name: 'Modern', description: 'Contemporary angled design', icon: '🏢' }
    ],
    materials: ['Concrete', 'Stone Veneer', 'Aluminum'],
    features: ['Weather Resistant', 'Low Maintenance', 'Professional Appearance', 'Custom Design'],
    specifications: {
      weight: 800,
      material: 'Concrete with Stone Veneer',
      finish: 'Natural Stone',
      durability: '25+ Years',
      installation: 'Professional Required',
      warranty: '5 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['monument', 'corporate', 'professional', 'durable'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'banners-vinyl-1',
    name: 'Premium Vinyl Banner',
    category: ProductCategory.BANNERS_FLAGS,
    subCategory: 'Vinyl Banners',
    description: 'High-quality vinyl banner perfect for outdoor events, trade shows, and promotional displays.',
    price: 89.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner-Canyon%20Hills.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20(3).jpg'
    ],
    sizes: [
      { id: 'size-1', name: '3\' x 6\'', width: 36, height: 72, unit: 'inches', price: 89.99 },
      { id: 'size-2', name: '4\' x 8\'', width: 48, height: 96, unit: 'inches', price: 129.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard rectangular banner', icon: '📏' },
      { id: 'shape-2', name: 'Custom', description: 'Custom cut to shape', icon: '✂️' }
    ],
    materials: ['Vinyl', 'Grommets', 'UV Protected'],
    features: ['Weather Resistant', 'High Resolution', 'Custom Graphics', 'Easy Installation'],
    specifications: {
      weight: 1,
      material: 'Premium Vinyl',
      finish: 'UV Protected',
      durability: '3-5 Years',
      installation: 'DIY or Professional',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 203,
    tags: ['banner', 'outdoor', 'promotional', 'custom'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'vehicle-wrap-1',
    name: 'Full Vehicle Wrap',
    category: ProductCategory.VEHICLE_TRAILER,
    subCategory: 'Vehicle Wraps',
    description: 'Complete vehicle wrap service for cars, trucks, and vans. High-quality vinyl with custom design.',
    price: 2499.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20230410_173103.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20241112_170827.jpg'
    ],
    sizes: [
      { id: 'size-1', name: 'Small Car', width: 60, height: 180, unit: 'inches', price: 2499.99 },
      { id: 'size-2', name: 'Large Truck', width: 80, height: 240, unit: 'inches', price: 3999.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Full Wrap', description: 'Complete vehicle coverage', icon: '🚗' },
      { id: 'shape-2', name: 'Partial Wrap', description: 'Selective area coverage', icon: '🚙' }
    ],
    materials: ['Premium Vinyl', 'Laminate', 'Installation Kit'],
    features: ['Professional Installation', 'Custom Design', 'Weather Resistant', 'Easy Removal'],
    specifications: {
      weight: 5,
      material: 'Premium Vinyl with Laminate',
      finish: 'High Gloss',
      durability: '5-7 Years',
      installation: 'Professional Required',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    tags: ['vehicle', 'wrap', 'advertising', 'mobile'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'signs-yard-1',
    name: 'Real Estate Yard Sign',
    category: ProductCategory.SIGNS,
    subCategory: 'Yard Signs',
    description: 'Professional yard sign perfect for real estate agents, open houses, and property sales.',
    price: 49.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '18" x 24"', width: 18, height: 24, unit: 'inches', price: 49.99 },
      { id: 'size-2', name: '24" x 36"', width: 24, height: 36, unit: 'inches', price: 79.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard rectangular sign', icon: '📏' },
      { id: 'shape-2', name: 'H-Frame', description: 'H-frame with stake', icon: '🪧' }
    ],
    materials: ['Coroplast', 'Aluminum Frame', 'Vinyl Graphics'],
    features: ['Weather Resistant', 'Easy Installation', 'Custom Graphics', 'Affordable'],
    specifications: {
      weight: 2,
      material: 'Coroplast with Vinyl',
      finish: 'UV Protected',
      durability: '2-3 Years',
      installation: 'DIY',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 234,
    tags: ['real-estate', 'yard-sign', 'affordable', 'custom'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-08-14')
  },

  // BANNERS_FLAGS Category
  {
    id: 'banners-vinyl-1',
    name: 'Premium Vinyl Banner',
    category: ProductCategory.BANNERS_FLAGS,
    subCategory: 'Vinyl Banners',
    description: 'High-quality vinyl banner perfect for events, trade shows, and outdoor advertising.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    sizes: [
      { id: 'size-1', name: '3\' x 6\'', width: 36, height: 72, unit: 'inches', price: 129.99 },
      { id: 'size-2', name: '4\' x 8\'', width: 48, height: 96, unit: 'inches', price: 199.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard rectangular banner', icon: '🟦' },
      { id: 'shape-2', name: 'Custom', description: 'Custom cut shapes', icon: '✂️' }
    ],
    materials: ['13oz Vinyl', 'Grommets', 'Hemmed Edges'],
    features: ['Weather Resistant', 'High Resolution', 'Custom Design', 'Quick Turnaround'],
    specifications: {
      weight: 5,
      material: '13oz Vinyl',
      finish: 'Matte',
      durability: '3-5 Years',
      installation: 'Grommets Included',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['banner', 'vinyl', 'outdoor', 'event'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'banners-flag-1',
    name: 'Custom Flag Design',
    category: ProductCategory.BANNERS_FLAGS,
    subCategory: 'Flags',
    description: 'Professional custom flags for businesses, events, and organizations. High-quality materials and printing.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    sizes: [
      { id: 'size-1', name: '2\' x 3\'', width: 24, height: 36, unit: 'inches', price: 89.99 },
      { id: 'size-2', name: '3\' x 5\'', width: 36, height: 60, unit: 'inches', price: 149.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard flag shape', icon: '🏁' },
      { id: 'shape-2', name: 'Custom', description: 'Custom flag designs', icon: '🎨' }
    ],
    materials: ['Polyester', 'Durable Ink', 'Grommets'],
    features: ['Weather Resistant', 'Vibrant Colors', 'Custom Design', 'Quick Turnaround'],
    specifications: {
      weight: 3,
      material: 'Polyester',
      finish: 'Matte',
      durability: '2-3 Years',
      installation: 'Grommets Included',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ['flag', 'custom', 'outdoor', 'business'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-08-14')
  },

  // VEHICLE_TRAILER Category
  {
    id: 'vehicle-wrap-1',
    name: 'Full Vehicle Wrap',
    category: ProductCategory.VEHICLE_TRAILER,
    subCategory: 'Vehicle Wraps',
    description: 'Complete vehicle wrap service for cars, trucks, and vans. High-quality vinyl with professional installation.',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Small Car', width: 0, height: 0, unit: 'inches', price: 2499.99 },
      { id: 'size-2', name: 'SUV/Van', width: 0, height: 0, unit: 'inches', price: 3499.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Full Wrap', description: 'Complete vehicle coverage', icon: '🚗' },
      { id: 'shape-2', name: 'Partial Wrap', description: 'Selective area coverage', icon: '🚙' }
    ],
    materials: ['Premium Vinyl', 'Lamination', 'Professional Installation'],
    features: ['Full Coverage', 'Custom Design', 'Professional Installation', 'Warranty'],
    specifications: {
      weight: 0,
      material: 'Premium Vinyl',
      finish: 'Laminated',
      durability: '5-7 Years',
      installation: 'Professional Required',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ['vehicle-wrap', 'full-coverage', 'professional', 'custom'],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'vehicle-trailer-2',
    name: 'Trailer Graphics',
    category: ProductCategory.VEHICLE_TRAILER,
    subCategory: 'Trailer Graphics',
    description: 'Professional trailer graphics and branding for commercial trailers, food trucks, and mobile businesses.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Small Trailer', width: 0, height: 0, unit: 'inches', price: 899.99 },
      { id: 'size-2', name: 'Large Trailer', width: 0, height: 0, unit: 'inches', price: 1299.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Full Coverage', description: 'Complete trailer branding', icon: '🚛' },
      { id: 'shape-2', name: 'Partial Graphics', description: 'Selective area graphics', icon: '🎨' }
    ],
    materials: ['Premium Vinyl', 'UV Resistant', 'Professional Installation'],
    features: ['High Visibility', 'Weather Resistant', 'Custom Design', 'Professional Installation'],
    specifications: {
      weight: 0,
      material: 'Premium Vinyl',
      finish: 'Laminated',
      durability: '5-7 Years',
      installation: 'Professional Required',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 45,
    tags: ['trailer', 'graphics', 'mobile', 'commercial'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-08-14')
  },

  // LASER_ENGRAVING Category
  {
    id: 'laser-engraved-1',
    name: 'Laser Engraved Plaque',
    category: ProductCategory.LASER_ENGRAVING,
    subCategory: 'Laser Engraved Plaques and Awards',
    description: 'Beautiful laser engraved plaque perfect for awards, recognition, and commemorative purposes.',
    price: 89.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/fish.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20160921_215751-edited.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20170605_125901-edited.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '6" x 8"', width: 6, height: 8, unit: 'inches', price: 89.99 },
      { id: 'size-2', name: '8" x 10"', width: 8, height: 10, unit: 'inches', price: 129.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Classic rectangular plaque', icon: '🏆' },
      { id: 'shape-2', name: 'Oval', description: 'Elegant oval design', icon: '🥇' }
    ],
    materials: ['Brass', 'Wood', 'Acrylic'],
    features: ['Custom Text', 'High Quality', 'Professional Finish', 'Quick Turnaround'],
    specifications: {
      weight: 1,
      material: 'Brass on Wood',
      finish: 'Polished',
      durability: 'Lifetime',
      installation: 'Hanging Hardware Included',
      warranty: '5 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ['award', 'plaque', 'recognition', 'custom'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'laser-engraved-2',
    name: 'Laser Engraved Sign',
    category: ProductCategory.LASER_ENGRAVING,
    subCategory: 'Laser Engraved Signs',
    description: 'Custom laser engraved signs perfect for offices, retail locations, and professional environments.',
    price: 149.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/laser-sign.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/laser-sign-thumb.jpg',
    sizes: [
      { id: 'size-1', name: '12" x 18"', width: 12, height: 18, unit: 'inches', price: 149.99 },
      { id: 'size-2', name: '18" x 24"', width: 18, height: 24, unit: 'inches', price: 199.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard rectangular sign', icon: '📏' },
      { id: 'shape-2', name: 'Custom', description: 'Custom shaped signs', icon: '✂️' }
    ],
    materials: ['Acrylic', 'Aluminum', 'Wood'],
    features: ['Custom Design', 'High Precision', 'Professional Finish', 'Durable'],
    specifications: {
      weight: 2,
      material: 'Acrylic',
      finish: 'Matte',
      durability: '10+ Years',
      installation: 'Mounting Hardware Included',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ['laser', 'engraved', 'sign', 'professional'],
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-08-14')
  },

  // EXPO_DISPLAY Category
  {
    id: 'expo-display-1',
    name: 'Trade Show Display Banner',
    category: ProductCategory.EXPO_DISPLAY,
    subCategory: 'Trade Show Displays',
    description: 'Professional trade show display banner with retractable stand. Perfect for exhibitions and business events.',
    price: 399.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Tradeshows-Expos/popup1.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '3\' x 6\'', width: 36, height: 72, unit: 'inches', price: 399.99 },
      { id: 'size-2', name: '4\' x 8\'', width: 48, height: 96, unit: 'inches', price: 599.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Retractable', description: 'Retractable stand with banner', icon: '🎪' },
      { id: 'shape-2', name: 'X-Stand', description: 'X-stand display system', icon: '❌' }
    ],
    materials: ['Vinyl Banner', 'Aluminum Stand', 'Carrying Case'],
    features: ['Retractable Stand', 'Easy Setup', 'Professional Appearance', 'Portable'],
    specifications: {
      weight: 12,
      material: 'Vinyl with Aluminum',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ['trade-show', 'display', 'banner', 'portable', 'featured'],
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'expo-display-2',
    name: 'Pop-Up Display System',
    category: ProductCategory.EXPO_DISPLAY,
    subCategory: 'Pop-Up Displays',
    description: 'Professional pop-up display system perfect for trade shows, exhibitions, and corporate events.',
    price: 599.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190501_163912.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190529_210403-edited.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '6\' x 8\'', width: 72, height: 96, unit: 'inches', price: 599.99 },
      { id: 'size-2', name: '8\' x 10\'', width: 96, height: 120, unit: 'inches', price: 799.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Pop-Up', description: 'Easy pop-up system', icon: '🎯' },
      { id: 'shape-2', name: 'Curved', description: 'Curved display panels', icon: '🌊' }
    ],
    materials: ['Aluminum Frame', 'Graphics Panel', 'Carrying Case'],
    features: ['Easy Setup', 'Professional Appearance', 'Portable', 'Custom Graphics'],
    specifications: {
      weight: 25,
      material: 'Aluminum with Graphics',
      finish: 'High Resolution Print',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    tags: ['pop-up', 'display', 'trade-show', 'portable'],
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-08-14')
  },

  // DECALS_STICKERS Category
  {
    id: 'decals-stickers-1',
    name: 'Custom Vinyl Decals',
    category: ProductCategory.DECALS_STICKERS,
    subCategory: 'Custom Vinyl Decals',
    description: 'High-quality custom vinyl decals for windows, walls, vehicles, and more. Weather resistant and long-lasting.',
    price: 29.99,
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
    thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
    images: [
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20190614_201518.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20191007_220944.jpg',
      'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20191007_221000.jpg'
    ],
    sizes: [
      { id: 'size-1', name: '12" x 12"', width: 12, height: 12, unit: 'inches', price: 29.99 },
      { id: 'size-2', name: '24" x 24"', width: 24, height: 24, unit: 'inches', price: 59.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Die-Cut', description: 'Custom die-cut shapes', icon: '✂️' },
      { id: 'shape-2', name: 'Rectangle', description: 'Standard rectangular decals', icon: '🟦' }
    ],
    materials: ['Premium Vinyl', 'UV Resistant', 'Weatherproof'],
    features: ['Custom Design', 'Weather Resistant', 'Easy Application', 'Long Lasting'],
    specifications: {
      weight: 0.5,
      material: 'Premium Vinyl',
      finish: 'Matte or Gloss',
      durability: '3-5 Years',
      installation: 'DIY',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['decals', 'vinyl', 'custom', 'weather-resistant'],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'decals-stickers-2',
    name: 'Window Decals',
    category: ProductCategory.DECALS_STICKERS,
    subCategory: 'Window Decals',
    description: 'Professional window decals perfect for storefronts, offices, and retail locations.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    sizes: [
      { id: 'size-1', name: '24" x 36"', width: 24, height: 36, unit: 'inches', price: 49.99 },
      { id: 'size-2', name: '36" x 48"', width: 36, height: 48, unit: 'inches', price: 79.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Custom', description: 'Custom window designs', icon: '🪟' },
      { id: 'shape-2', name: 'Full Coverage', description: 'Complete window coverage', icon: '🖼️' }
    ],
    materials: ['Premium Vinyl', 'UV Resistant', 'Easy Removal'],
    features: ['Professional Appearance', 'Easy Installation', 'Custom Design', 'Removable'],
    specifications: {
      weight: 1,
      material: 'Premium Vinyl',
      finish: 'Matte',
      durability: '3-5 Years',
      installation: 'DIY',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    tags: ['window', 'decals', 'storefront', 'professional'],
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-08-14')
  },

  // ELECTRIC_SIGNS Category
  {
    id: 'electric-signs-1',
    name: 'LED Digital Sign',
    category: ProductCategory.ELECTRIC_SIGNS,
    subCategory: 'LED Signs',
    description: 'Bright LED digital sign perfect for storefronts and outdoor advertising. Energy efficient and highly visible.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: '2\' x 4\'', width: 24, height: 48, unit: 'inches', price: 1299.99 },
      { id: 'size-2', name: '3\' x 6\'', width: 36, height: 72, unit: 'inches', price: 1899.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard rectangular LED sign', icon: '📺' },
      { id: 'shape-2', name: 'Custom', description: 'Custom shaped LED display', icon: '💡' }
    ],
    materials: ['LED Panels', 'Aluminum Frame', 'Weatherproof Housing'],
    features: ['Energy Efficient', 'High Brightness', 'Weather Resistant', 'Custom Content'],
    specifications: {
      weight: 45,
      material: 'LED with Aluminum',
      finish: 'Weatherproof',
      durability: '8+ Years',
      installation: 'Professional Required',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 78,
    tags: ['led', 'digital', 'electric', 'storefront'],
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'electric-signs-2',
    name: 'Neon Sign',
    category: ProductCategory.ELECTRIC_SIGNS,
    subCategory: 'Neon Signs',
    description: 'Classic neon signs perfect for bars, restaurants, and retail locations. Eye-catching and nostalgic.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Small', width: 0, height: 0, unit: 'inches', price: 899.99 },
      { id: 'size-2', name: 'Medium', width: 0, height: 0, unit: 'inches', price: 1299.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Custom Text', description: 'Custom neon text', icon: '✨' },
      { id: 'shape-2', name: 'Custom Design', description: 'Custom neon shapes', icon: '🎨' }
    ],
    materials: ['Neon Glass', 'Aluminum Frame', 'Transformer'],
    features: ['Classic Look', 'High Visibility', 'Custom Design', 'Energy Efficient'],
    specifications: {
      weight: 15,
      material: 'Neon Glass',
      finish: 'Glowing',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    tags: ['neon', 'classic', 'retro', 'custom'],
    createdAt: new Date('2024-07-10'),
    updatedAt: new Date('2024-08-14')
  },

  // INDOOR_SIGNS Category
  {
    id: 'indoor-signs-1',
    name: 'Office Lobby Sign',
    category: ProductCategory.INDOOR_SIGNS,
    subCategory: 'Lobby Signs',
    description: 'Elegant lobby sign perfect for office buildings, hotels, and corporate headquarters.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: '2\' x 3\'', width: 24, height: 36, unit: 'inches', price: 599.99 },
      { id: 'size-2', name: '3\' x 4\'', width: 36, height: 48, unit: 'inches', price: 899.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Classic rectangular design', icon: '🏢' },
      { id: 'shape-2', name: 'Modern', description: 'Contemporary angled design', icon: '✨' }
    ],
    materials: ['Acrylic', 'Aluminum', 'LED Backlighting'],
    features: ['Professional Appearance', 'Custom Design', 'Easy Installation', 'Low Maintenance'],
    specifications: {
      weight: 25,
      material: 'Acrylic with LED',
      finish: 'Glossy',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 134,
    tags: ['lobby', 'office', 'professional', 'indoor'],
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'indoor-signs-2',
    name: 'Wall Mural',
    category: ProductCategory.INDOOR_SIGNS,
    subCategory: 'Wall Murals',
    description: 'Custom wall murals perfect for offices, retail locations, and commercial spaces.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: '8\' x 10\'', width: 96, height: 120, unit: 'inches', price: 799.99 },
      { id: 'size-2', name: '10\' x 12\'', width: 120, height: 144, unit: 'inches', price: 1199.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Custom', description: 'Custom designed murals', icon: '🎨' },
      { id: 'shape-2', name: 'Full Wall', description: 'Complete wall coverage', icon: '🖼️' }
    ],
    materials: ['Vinyl', 'Canvas', 'Wallpaper'],
    features: ['Custom Design', 'High Resolution', 'Easy Installation', 'Removable'],
    specifications: {
      weight: 10,
      material: 'Premium Vinyl',
      finish: 'Matte',
      durability: '5+ Years',
      installation: 'Professional Required',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['mural', 'wall', 'custom', 'artistic'],
    createdAt: new Date('2024-08-05'),
    updatedAt: new Date('2024-08-14')
  },

  // OUTDOOR_SIGNS Category
  {
    id: 'outdoor-signs-1',
    name: 'Pylon Sign',
    category: ProductCategory.OUTDOOR_SIGNS,
    subCategory: 'Pylon Signs',
    description: 'Tall pylon sign perfect for roadside businesses, gas stations, and retail locations.',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: '6\' x 8\'', width: 72, height: 96, unit: 'inches', price: 2499.99 },
      { id: 'size-2', name: '8\' x 10\'', width: 96, height: 120, unit: 'inches', price: 3499.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Traditional', description: 'Classic pylon design', icon: '🏗️' },
      { id: 'shape-2', name: 'Modern', description: 'Contemporary pylon style', icon: '🏭' }
    ],
    materials: ['Aluminum', 'Steel Structure', 'LED Lighting'],
    features: ['High Visibility', 'Weather Resistant', 'Custom Design', 'Professional Installation'],
    specifications: {
      weight: 1200,
      material: 'Aluminum with Steel',
      finish: 'Powder Coated',
      durability: '15+ Years',
      installation: 'Professional Required',
      warranty: '5 Years'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ['pylon', 'outdoor', 'roadside', 'high-visibility'],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'outdoor-signs-2',
    name: 'Yard Sign',
    category: ProductCategory.OUTDOOR_SIGNS,
    subCategory: 'Yard Signs',
    description: 'Professional yard signs perfect for real estate, political campaigns, and temporary advertising.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    sizes: [
      { id: 'size-1', name: '18" x 24"', width: 18, height: 24, unit: 'inches', price: 39.99 },
      { id: 'size-2', name: '24" x 36"', width: 24, height: 36, unit: 'inches', price: 59.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Rectangle', description: 'Standard rectangular sign', icon: '📏' },
      { id: 'shape-2', name: 'H-Frame', description: 'H-frame with stake', icon: '🪧' }
    ],
    materials: ['Coroplast', 'Aluminum Frame', 'Vinyl Graphics'],
    features: ['Weather Resistant', 'Easy Installation', 'Custom Graphics', 'Affordable'],
    specifications: {
      weight: 2,
      material: 'Coroplast with Vinyl',
      finish: 'UV Protected',
      durability: '2-3 Years',
      installation: 'DIY',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 234,
    tags: ['yard-sign', 'real-estate', 'political', 'temporary'],
    createdAt: new Date('2024-06-25'),
    updatedAt: new Date('2024-08-14')
  },

  // PRIVACY_SECURITY Category
  {
    id: 'privacy-security-1',
    name: 'Window Privacy Film',
    category: ProductCategory.PRIVACY_SECURITY,
    subCategory: 'Window Privacy Films',
    description: 'Professional window privacy film that provides privacy while maintaining natural light.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: '3\' x 6\'', width: 36, height: 72, unit: 'inches', price: 89.99 },
      { id: 'size-2', name: '4\' x 8\'', width: 48, height: 96, unit: 'inches', price: 129.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Custom Cut', description: 'Custom cut to fit windows', icon: '🪟' },
      { id: 'shape-2', name: 'Standard', description: 'Standard rectangular sheets', icon: '📐' }
    ],
    materials: ['Vinyl Film', 'UV Resistant', 'Adhesive Backed'],
    features: ['Privacy Control', 'UV Protection', 'Easy Installation', 'Removable'],
    specifications: {
      weight: 2,
      material: 'Premium Vinyl',
      finish: 'Frosted',
      durability: '5+ Years',
      installation: 'DIY',
      warranty: '2 Years'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    tags: ['privacy', 'window', 'film', 'uv-protection'],
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'privacy-security-2',
    name: 'Security Film',
    category: ProductCategory.PRIVACY_SECURITY,
    subCategory: 'Security Films',
    description: 'High-strength security film that reinforces windows and provides protection against break-ins.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    sizes: [
      { id: 'size-1', name: '3\' x 6\'', width: 36, height: 72, unit: 'inches', price: 199.99 },
      { id: 'size-2', name: '4\' x 8\'', width: 48, height: 96, unit: 'inches', price: 299.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Custom Cut', description: 'Custom cut to fit windows', icon: '🪟' },
      { id: 'shape-2', name: 'Standard', description: 'Standard rectangular sheets', icon: '📐' }
    ],
    materials: ['Security Film', 'UV Resistant', 'Adhesive Backed'],
    features: ['Break-In Protection', 'UV Protection', 'Professional Installation', 'Long Lasting'],
    specifications: {
      weight: 3,
      material: 'Security Film',
      finish: 'Clear',
      durability: '10+ Years',
      installation: 'Professional Required',
      warranty: '5 Years'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    tags: ['security', 'protection', 'break-in', 'reinforcement'],
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-08-14')
  },

  // MARKETING Category
  {
    id: 'marketing-1',
    name: 'Business Branding Package',
    category: ProductCategory.MARKETING,
    subCategory: 'Branding for Businesses',
    description: 'Complete business branding package including business cards, signage, and marketing materials.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Standard Package', width: 0, height: 0, unit: 'inches', price: 299.99 },
      { id: 'size-2', name: 'Premium Package', width: 0, height: 0, unit: 'inches', price: 499.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Package', description: 'Complete branding solution', icon: '📦' },
      { id: 'shape-2', name: 'Custom', description: 'Custom designed elements', icon: '🎨' }
    ],
    materials: ['Premium Paper', 'Vinyl', 'Digital Files'],
    features: ['Complete Branding', 'Professional Design', 'Multiple Formats', 'Quick Turnaround'],
    specifications: {
      weight: 1,
      material: 'Various Materials',
      finish: 'Professional',
      durability: 'Lifetime',
      installation: 'N/A',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['branding', 'business', 'marketing', 'complete-package'],
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'marketing-2',
    name: 'Digital Marketing Materials',
    category: ProductCategory.MARKETING,
    subCategory: 'Digital Marketing',
    description: 'Professional digital marketing materials including social media graphics, email templates, and web banners.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Social Media Package', width: 0, height: 0, unit: 'inches', price: 199.99 },
      { id: 'size-2', name: 'Complete Digital Package', width: 0, height: 0, unit: 'inches', price: 399.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Digital', description: 'Digital marketing materials', icon: '💻' },
      { id: 'shape-2', name: 'Custom', description: 'Custom digital designs', icon: '🎨' }
    ],
    materials: ['Digital Files', 'High Resolution', 'Multiple Formats'],
    features: ['Digital Ready', 'High Resolution', 'Multiple Formats', 'Quick Turnaround'],
    specifications: {
      weight: 0,
      material: 'Digital',
      finish: 'High Resolution',
      durability: 'Lifetime',
      installation: 'N/A',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ['digital', 'marketing', 'social-media', 'web'],
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-08-14')
  },

  // PROMO Category
  {
    id: 'promo-1',
    name: 'Custom Promotional Items',
    category: ProductCategory.PROMO,
    subCategory: 'Custom Promotional Products',
    description: 'High-quality promotional items perfect for trade shows, events, and business giveaways.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Small Items', width: 0, height: 0, unit: 'inches', price: 149.99 },
      { id: 'size-2', name: 'Large Items', width: 0, height: 0, unit: 'inches', price: 249.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Various', description: 'Multiple item types', icon: '🎁' },
      { id: 'shape-2', name: 'Custom', description: 'Custom designed items', icon: '✨' }
    ],
    materials: ['Various Materials', 'Custom Printing', 'Quality Construction'],
    features: ['Custom Design', 'High Quality', 'Quick Turnaround', 'Bulk Pricing'],
    specifications: {
      weight: 2,
      material: 'Various',
      finish: 'Professional',
      durability: '3+ Years',
      installation: 'N/A',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 98,
    tags: ['promotional', 'custom', 'trade-show', 'giveaways'],
    createdAt: new Date('2024-07-05'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'promo-2',
    name: 'Trade Show Giveaways',
    category: ProductCategory.PROMO,
    subCategory: 'Trade Show Items',
    description: 'Professional trade show giveaways that help promote your business and leave lasting impressions.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Small Items', width: 0, height: 0, unit: 'inches', price: 99.99 },
      { id: 'size-2', name: 'Medium Items', width: 0, height: 0, unit: 'inches', price: 149.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Various', description: 'Multiple item types', icon: '🎁' },
      { id: 'shape-2', name: 'Custom', description: 'Custom designed items', icon: '✨' }
    ],
    materials: ['Various Materials', 'Custom Printing', 'Quality Construction'],
    features: ['Custom Design', 'High Quality', 'Bulk Pricing', 'Quick Turnaround'],
    specifications: {
      weight: 1,
      material: 'Various',
      finish: 'Professional',
      durability: '3+ Years',
      installation: 'N/A',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 67,
    tags: ['trade-show', 'giveaways', 'promotional', 'custom'],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-14')
  },

  // ACCESSORIES Category
  {
    id: 'accessories-1',
    name: 'Sign Mounting Hardware',
    category: ProductCategory.ACCESSORIES,
    subCategory: 'Mounting Hardware',
    description: 'Professional mounting hardware for signs, banners, and displays. Durable and easy to install.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Standard Kit', width: 0, height: 0, unit: 'inches', price: 79.99 },
      { id: 'size-2', name: 'Heavy Duty Kit', width: 0, height: 0, unit: 'inches', price: 129.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Kit', description: 'Complete mounting solution', icon: '🔧' },
      { id: 'shape-2', name: 'Individual', description: 'Individual hardware pieces', icon: '⚙️' }
    ],
    materials: ['Stainless Steel', 'Aluminum', 'Weather Resistant'],
    features: ['Easy Installation', 'Weather Resistant', 'Professional Grade', 'Complete Kit'],
    specifications: {
      weight: 5,
      material: 'Stainless Steel',
      finish: 'Corrosion Resistant',
      durability: '10+ Years',
      installation: 'DIY',
      warranty: '3 Years'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 67,
    tags: ['hardware', 'mounting', 'installation', 'professional'],
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-08-14')
  },
  {
    id: 'accessories-2',
    name: 'Sign Cleaning Supplies',
    category: ProductCategory.ACCESSORIES,
    subCategory: 'Cleaning Supplies',
    description: 'Professional cleaning supplies and maintenance kits for signs, displays, and outdoor graphics.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    ],
    sizes: [
      { id: 'size-1', name: 'Basic Kit', width: 0, height: 0, unit: 'inches', price: 49.99 },
      { id: 'size-2', name: 'Professional Kit', width: 0, height: 0, unit: 'inches', price: 89.99 }
    ],
    shapes: [
      { id: 'shape-1', name: 'Kit', description: 'Complete cleaning solution', icon: '🧽' },
      { id: 'shape-2', name: 'Individual', description: 'Individual cleaning items', icon: '🧴' }
    ],
    materials: ['Professional Grade', 'Safe for Signs', 'Long Lasting'],
    features: ['Safe for All Signs', 'Professional Grade', 'Easy to Use', 'Long Lasting'],
    specifications: {
      weight: 3,
      material: 'Professional Grade',
      finish: 'Various',
      durability: '2+ Years',
      installation: 'N/A',
      warranty: '1 Year'
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 45,
    tags: ['cleaning', 'maintenance', 'supplies', 'professional'],
    createdAt: new Date('2024-07-25'),
    updatedAt: new Date('2024-08-14')
  }
];

// Category data with enhanced information
export const CATEGORY_DATA: CategoryData[] = [
  {
    id: ProductCategory.SIGNS,
    name: 'Signs',
    description: 'Professional signage solutions for businesses, including channel letters, monument signs, and more.',
    icon: '🪧',
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg',
    featured: true,
    productCount: 45,
    subCategories: [
      {
        id: 'channel-letters',
        name: 'Channel Letters',
        description: 'Illuminated channel letters for storefronts',
        image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/channel-letters-sub.jpg',
        productCount: 12,
        featured: true
      },
      {
        id: 'monument-signs',
        name: 'Monument Signs',
        description: 'Elegant monument signs for buildings',
        image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/monument-signs-sub.jpg',
        productCount: 8,
        featured: true
      }
    ]
  },
  {
    id: ProductCategory.BANNERS_FLAGS,
    name: 'Banners & Flags',
    description: 'High-quality banners and flags for events, trade shows, and outdoor advertising.',
    icon: '🚩',
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/category-banners.jpg',
    featured: true,
    productCount: 32,
    subCategories: [
      {
        id: 'vinyl-banners',
        name: 'Vinyl Banners',
        description: 'Durable vinyl banners for outdoor use',
        image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/vinyl-banners-sub.jpg',
        productCount: 15,
        featured: true
      }
    ]
  },
  {
    id: ProductCategory.VEHICLE_TRAILER,
    name: 'Vehicle & Trailer',
    description: 'Professional vehicle graphics, wraps, and trailer branding solutions.',
    icon: '🚗',
    image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/category-vehicle.jpg',
    featured: true,
    productCount: 28,
    subCategories: [
      {
        id: 'vehicle-wraps',
        name: 'Vehicle Wraps',
        description: 'Complete vehicle wrap services',
        image: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/vehicle-wraps-sub.jpg',
        productCount: 10,
        featured: true
      }
    ]
  }
];

// Helper functions
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return DUMMY_PRODUCTS.filter(product => product.category === category);
};

export const getProductsBySubCategory = (category: ProductCategory, subCategory: string): Product[] => {
  return DUMMY_PRODUCTS.filter(product => 
    product.category === category && product.subCategory === subCategory
  );
};

export const getCategoryData = (category: ProductCategory): CategoryData | undefined => {
  return CATEGORY_DATA.find(cat => cat.id === category);
};

export const getAllCategories = (): CategoryData[] => {
  return CATEGORY_DATA;
};
