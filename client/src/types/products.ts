// Product Categories Enum
export enum ProductCategory {
  EXPO_DISPLAY = "EXPO_DISPLAY",
  LASER_ENGRAVING = "LASER_ENGRAVING",
  DECALS_STICKERS = "DECALS_STICKERS",
  BANNERS_FLAGS = "BANNERS_FLAGS",
  SIGNS = "SIGNS",
  PRIVACY_SECURITY = "PRIVACY_SECURITY",
  MARKETING = "MARKETING",
  PROMO = "PROMO",
  ELECTRIC_SIGNS = "ELECTRIC_SIGNS",
  VEHICLE_TRAILER = "VEHICLE_TRAILER",
  INDOOR_SIGNS = "INDOOR_SIGNS",
  OUTDOOR_SIGNS = "OUTDOOR_SIGNS",
  ACCESSORIES = "ACCESSORIES"
}

// Product interfaces
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  description: string;
  price: number;
  image: string;
  thumbnail: string;
  sizes: ProductSize[];
  shapes: ProductShape[];
  materials: string[];
  features: string[];
  specifications: ProductSpecifications;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSize {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'inches' | 'cm' | 'mm';
  price: number;
}

export interface ProductShape {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ProductSpecifications {
  weight: number;
  material: string;
  finish: string;
  durability: string;
  installation: string;
  warranty: string;
}

export interface CategoryData {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  image: string;
  featured: boolean;
  productCount: number;
  subCategories: SubCategoryData[];
}

export interface SubCategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

// Sub-categories for each main category
export const PRODUCT_SUBCATEGORIES = {
  [ProductCategory.EXPO_DISPLAY]: [
    "Trade Show Displays",
    "Banner Stands",
    "Custom Table Covers",
    "Event Tent Signs",
    "Trade Show Support Materials"
  ],
  [ProductCategory.LASER_ENGRAVING]: [
    "Engraved Signs",
    "Laser Engraved Plaques and Awards",
    "Laser Engraved Metal",
    "Laser Engraved Wood",
    "Laser Engraved Plastic",
    "Custom Promotional Products"
  ],
  [ProductCategory.DECALS_STICKERS]: [
    "Custom Stickers",
    "Wall Decals",
    "Window Decals",
    "Floor Decals",
    "Vinyl Lettering",
    "Custom Vinyl Decals",
    "Die-Cut Stickers",
    "Vehicle Magnets",
    "Custom Magnets"
  ],
  [ProductCategory.BANNERS_FLAGS]: [
    "Vinyl Banners",
    "Flags",
    "Custom Flags",
    "Flag Poles and Accessories",
    "Pole Banners",
    "Event and Promotional Banners",
    "Banners for Sports Teams"
  ],
  [ProductCategory.SIGNS]: [
    "Channel Letters",
    "Monument Signs",
    "Directional Signs",
    "Neon Signs",
    "Illuminated Signs",
    "Dimensional Signs",
    "Building Signs",
    "Lobby Signs",
    "Door Signs",
    "A-Frame Signs",
    "Reflective Signs",
    "Safety Signs",
    "Wayfinding Signs",
    "ADA Compliant Signs",
    "Custom Signs",
    "Floor Graphics",
    "Wall Graphics",
    "Pylon Signs",
    "Yard Signs",
    "Real Estate Signs",
    "Hanging Signs",
    "Temporary and Event Signage"
  ],
  [ProductCategory.PRIVACY_SECURITY]: [
    "Window Privacy Films",
    "Security Window Films",
    "Decorative Window Films",
    "Solar Control Films"
  ],
  [ProductCategory.MARKETING]: [
    "Branding for Businesses",
    "Signage for Multi-Location Programs",
    "Sign Design and Consultation",
    "Digital Printing",
    "Marketing Signage",
    "Custom Vinyl Decals",
    "Point-of-Purchase Displays",
    "Printed Wall Graphics",
    "Business Cards",
    "Metal Business Cards"
  ],
  [ProductCategory.PROMO]: [
    "Custom Promotional Products",
    "Custom Trophies, Awards, and Plaques",
    "Bumper Stickers",
    "Custom Magnets",
    "Promotional Items",
    "Custom Apparel",
    "Event Giveaways"
  ],
  [ProductCategory.ELECTRIC_SIGNS]: [
    "LED Signs",
    "Neon Signs",
    "Digital Displays",
    "Backlit Signs",
    "Channel Letter Signs",
    "Electronic Message Centers",
    "Video Walls",
    "Interactive Displays"
  ],
  [ProductCategory.VEHICLE_TRAILER]: [
    "Vehicle Wraps",
    "Vehicle Graphics",
    "Trailer Graphics",
    "Fleet Graphics",
    "Vehicle Magnets",
    "Window Tinting",
    "Custom Vehicle Lettering",
    "Commercial Vehicle Branding"
  ],
  [ProductCategory.INDOOR_SIGNS]: [
    "Wall Signs",
    "Lobby Signs",
    "Directional Signs",
    "Office Signs",
    "Retail Signs",
    "Restaurant Signs",
    "Healthcare Signs",
    "Educational Signs",
    "Floor Graphics",
    "Ceiling Signs"
  ],
  [ProductCategory.OUTDOOR_SIGNS]: [
    "Monument Signs",
    "Pylon Signs",
    "Yard Signs",
    "Real Estate Signs",
    "Building Signs",
    "Directional Signs",
    "Safety Signs",
    "Traffic Signs",
    "Outdoor Banners",
    "Flag Poles and Flags"
  ],
  [ProductCategory.ACCESSORIES]: [
    "Mounting Hardware",
    "Display Stands",
    "Flag Poles",
    "Sign Posts",
    "Brackets and Mounts",
    "Lighting Accessories",
    "Installation Tools",
    "Maintenance Supplies"
  ]
};

// Navigation Category Interface
export interface NavigationCategory {
  id: ProductCategory;
  name: string;
  subCategories: string[];
  featured?: boolean;
}

// Product Filter Interface
export interface ProductFilter {
  category?: ProductCategory;
  subCategory?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  popular?: boolean;
  featured?: boolean;
  search?: string;
} 