// Product Categories Enum
export enum ProductCategory {
  EXPO_DISPLAY = "Expo/Display",
  LASER_ENGRAVING = "Laser Engraving",
  DECALS_STICKERS = "Decals/Stickers",
  BANNERS_FLAGS = "Banners/Flags",
  SIGNS = "Signs",
  PRIVACY_SECURITY = "Privacy/Security Films",
  MARKETING = "Marketing",
  PROMO = "Promo",
  ELECTRIC_SIGNS = "Electric Signs",
  VEHICLE_TRAILER = "Vehicle & Trailer",
  INDOOR_SIGNS = "Indoor Signs",
  OUTDOOR_SIGNS = "Outdoor Signs",
  ACCESSORIES = "Accessories"
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
    "Stickers for Promotional Campaigns",
    "Promotional Bags and Totes",
    "Wearables"
  ],
  [ProductCategory.ELECTRIC_SIGNS]: [
    "Electronic Message Centers",
    "LED and Digital Signs",
    "Backlit Signs",
    "Channel Letters",
    "Neon Signs",
    "Illuminated Signage",
    "Digital Printing for LED Displays",
    "Monument Signs",
    "Blade Signs",
    "Business Signs",
    "Push Thru Signs"
  ],
  [ProductCategory.VEHICLE_TRAILER]: [
    "Vehicle Graphics and Wraps",
    "Custom Vehicle Magnets",
    "Vehicle Decals",
    "Trailer Graphics and Decals",
    "Vehicle Wraps for Advertising"
  ],
  [ProductCategory.INDOOR_SIGNS]: [
    "Wall Murals and Graphics",
    "Lobby Signs",
    "Door Signs",
    "Floor Graphics",
    "Window Graphics and Decals",
    "Custom Wall Stickers",
    "Indoor Wayfinding and Directional Signs",
    "Safety Signs for Indoor Spaces",
    "Informational Signs"
  ],
  [ProductCategory.OUTDOOR_SIGNS]: [
    "Yard Signs",
    "Real Estate Signs",
    "Pylon Signs",
    "Monument Signs",
    "Outdoor Banners",
    "Temporary Outdoor Signage",
    "Reflective Signs for Outdoor Visibility",
    "Building Signage",
    "Post and Panel Signs",
    "Event Signage for Outdoor Promotions"
  ],
  [ProductCategory.ACCESSORIES]: [
    "Mounting Hardware for Signs and Banners",
    "Frames",
    "Display Stands",
    "Flag Poles and Accessories",
    "Pole Banners",
    "Custom Display Accessories",
    "Poster Holders"
  ]
};

// Product Interface
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  description: string;
  image: string;
  price?: number;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
  specifications?: {
    material?: string;
    size?: string;
    finish?: string;
    installation?: string;
  };
}

// Category Interface
export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  subCategories: string[];
  featured?: boolean;
}

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