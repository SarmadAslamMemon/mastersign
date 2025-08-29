// Firestore Database Schema for SignFlow
// This defines the structure of our database collections

export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  TEMPLATES: 'templates',
  USER_DESIGNS: 'userDesigns',
  ORDERS: 'orders',
  CART_ITEMS: 'cartItems',
  QUOTE_REQUESTS: 'quoteRequests',
  TESTIMONIALS: 'testimonials',
  CATEGORIES: 'categories',
  SUB_CATEGORIES: 'subCategories'
};

// Product Categories Enum
export const PRODUCT_CATEGORIES = {
  EXPO_DISPLAY: 'EXPO_DISPLAY',
  LASER_ENGRAVING: 'LASER_ENGRAVING',
  DECALS_STICKERS: 'DECALS_STICKERS',
  BANNERS_FLAGS: 'BANNERS_FLAGS',
  SIGNS: 'SIGNS',
  PRIVACY_SECURITY: 'PRIVACY_SECURITY',
  MARKETING: 'MARKETING',
  PROMO: 'PROMO',
  ELECTRIC_SIGNS: 'ELECTRIC_SIGNS',
  VEHICLE_TRAILER: 'VEHICLE_TRAILER',
  INDOOR_SIGNS: 'INDOOR_SIGNS',
  OUTDOOR_SIGNS: 'OUTDOOR_SIGNS',
  ACCESSORIES: 'ACCESSORIES'
};

// User schema
export const USER_SCHEMA = {
  id: 'string',
  email: 'string',
  fullName: 'string',
  company: 'string',
  phone: 'string',
  role: 'string', // 'user', 'admin', 'designer'
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  profileImage: 'string',
  isEmailVerified: 'boolean'
};

// Product schema - Enhanced for advanced e-commerce features
export const PRODUCT_SCHEMA = {
  id: 'string',
  name: 'string',
  description: 'string',
  longDescription: 'string', // Full product description
  category: 'string', // EXPO_DISPLAY, SIGNS, etc.
  subcategory: 'string', // "Metal Signs", "Banners", etc.
  images: 'array', // Array of image objects with url, alt, id
  features: 'array', // Array of key features like ["Vibrant", "Durable", "Weather-Resistant"]
  rating: 'number', // 1-5 star rating
  reviewCount: 'number', // Total number of reviews
  questionCount: 'number', // Total number of questions
  inStock: 'boolean',
  isActive: 'boolean',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  tags: 'array',
  featured: 'boolean',
  reviews: 'array',

  // 🔽 Enhanced Pricing & Configuration System
  pricing: {
    basePrice: 'number', // Base price for the product
    pricingModel: 'string', // 'fixed' | 'per_sq_ft' | 'per_linear_ft' | 'per_letter' | 'custom'
    pricePerSqFt: 'number', // Price per square foot
    pricePerLinearFt: 'number', // Price per linear foot  
    pricePerLetter: 'number', // Price per letter
    discountPercentage: 'number', // Percentage discount (0-100)
    minPrice: 'number', // Minimum price for custom products
    maxPrice: 'number' // Maximum price for custom products
  },

  // Quantity-based discounts
  quantityDiscounts: 'array', // [
  //   {
  //     minQuantity: 'number',
  //     maxQuantity: 'number', // null for "and above"
  //     discountPercentage: 'number', // e.g., 10 for 10% off
  //     discountAmount: 'number' // Fixed amount discount per item
  //   }
  // ],

  // Size constraints and customization
  sizeConstraints: {
    allowCustomSize: 'boolean',
    minWidth: 'number', // Minimum width allowed
    maxWidth: 'number', // Maximum width allowed  
    defaultWidth: 'number', // Default width (e.g., 15)
    minHeight: 'number', // Minimum height allowed
    maxHeight: 'number', // Maximum height allowed
    defaultHeight: 'number', // Default height (e.g., 30)
    unit: 'string', // 'inch', 'cm', 'ft'
    step: 'number' // Increment step for size inputs
  },

  // Product specifications and options (as shown in the image)
  specifications: 'array', // [
  //   {
  //     id: 'string',
  //     name: 'string', // e.g., "Sign Type", "Size", "Coating"
  //     type: 'string', // 'select', 'number', 'text'
  //     options: 'array', // For select type
  //     min: 'number', // For number type
  //     max: 'number', // For number type
  //     step: 'number', // For number type
  //     unit: 'string', // e.g., "inches", "letters"
  //     defaultValue: 'string', // Default selected value
  //     priceImpact: 'object' // Price modifiers for each option
  //   }
  // ],

  // Customizable options with pricing
  customizableOptions: 'array', // [
  //   {
  //     id: 'string',
  //     name: 'string', // e.g., "Coating", "Shape", "Drilled Holes"
  //     type: 'string', // 'dropdown', 'checkbox', 'radio'
  //     values: 'array', // [
  //       {
  //         label: 'string', // e.g., "None (Standard)", "Rounded Corners (1/4\")"
  //         value: 'string', // e.g., "none_standard", "rounded_1_4"
  //         priceImpact: 'number', // Price adjustment (can be negative)
  //         image: 'string', // Optional: URL to option image
  //         description: 'string' // Optional: description of this option
  //       }
  //     ],
  //     defaultValue: 'string', // Default selected value
  //     isRequired: 'boolean', // Is this option mandatory?
  //     unit: 'string' // Optional: unit for number inputs
  //   }
  // ],

  // Artwork and design options
  personalizationOptions: {
    allowArtworkUpload: 'boolean', // Can customers upload artwork?
    allowDesignNow: 'boolean', // Can customers design now?
    allowDesignHelp: 'boolean', // Can customers get design help?
    artworkPrice: 'number', // Base price for artwork services
    designNowPrice: 'number', // Price for design now service
    designHelpPrice: 'number' // Price for design help service
  },

  // Shipping and delivery options
  shippingOptions: 'array', // [
  //   {
  //     id: 'string',
  //     name: 'string', // e.g., "Local Pickup", "Standard Shipping"
  //     type: 'string', // 'pickup', 'shipping'
  //     basePrice: 'number', // Base shipping cost
  //     description: 'string', // Description of shipping method
  //     estimatedDays: 'number', // Estimated delivery time
  //     zipCodeRequired: 'boolean', // Whether zip code affects pricing
  //     zipCodePricing: 'object' // Price variations by zip code ranges
  //   }
  // ],

  // Turnaround time and rush options
  turnaroundTime: {
    estimatedDays: 'number', // Standard turnaround time (e.g., 5)
    rushAvailable: 'boolean', // Can customers rush the order?
    rushFeePercentage: 'number', // Rush fee as percentage (e.g., 50 for 50%)
    rushFeeMultiplier: 'number', // Rush fee multiplier (e.g., 1.5 for 50% more)
    rushTurnaroundDays: 'number', // Rush turnaround time
    orderCutoffTime: 'string', // Daily order cutoff time (e.g., "2:00 PM")
    nextShipDate: 'string' // Next available ship date
  },

  // Inventory and availability
  inventory: {
    inStock: 'boolean',
    stockQuantity: 'number', // Available quantity
    lowStockThreshold: 'number', // When to show "low stock" warning
    backorderAllowed: 'boolean', // Can customers backorder?
    estimatedRestockDate: 'timestamp' // When will stock be replenished?
  }
};

// Template schema
export const TEMPLATE_SCHEMA = {
  id: 'string',
  name: 'string',
  description: 'string',
  category: 'string',
  subcategory: 'string',
  thumbnail: 'string',
  designData: 'object',
  isCustomizable: 'boolean',
  basePrice: 'number',
  isActive: 'boolean',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  tags: 'array'
};

// User Design schema
export const USER_DESIGN_SCHEMA = {
  id: 'string',
  userId: 'string',
  name: 'string',
  description: 'string',
  designData: 'object',
  thumbnail: 'string',
  category: 'string',
  isPublic: 'boolean',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Order schema
export const ORDER_SCHEMA = {
  id: 'string',
  userId: 'string',
  orderNumber: 'string',
  items: 'array',
  totalAmount: 'number',
  status: 'string', // 'pending', 'confirmed', 'in_production', 'shipped', 'delivered'
  shippingAddress: 'object',
  billingAddress: 'object',
  paymentStatus: 'string',
  trackingNumber: 'string',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Cart Item schema
export const CART_ITEM_SCHEMA = {
  id: 'string',
  userId: 'string',
  productId: 'string',
  templateId: 'string',
  userDesignId: 'string',
  quantity: 'number',
  customizationData: 'object',
  price: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',

  // 🔽 New Fields for pricing logic and customization
  size: {
    width: 'number',
    height: 'number',
    unit: 'string' // 'inch', 'cm', etc.
  },

  letterCount: 'number',

  optionsSelected: 'array', // [{ name: 'Material', value: 'Acrylic' }]

  pricingModelUsed: 'string', // Snapshot of product pricing model

  calculatedPrice: 'number',

  pricingBreakdown: {
    base: 'number',
    options: 'number',
    rushFee: 'number',
    shippingFee: 'number',
    quantityDiscountApplied: 'number'
  },

  artworkFileUrl: 'string',
  designMode: 'string', // 'upload' | 'designNow' | 'designHelp'

  shippingMethod: 'string',

  turnaround: {
    rushRequested: 'boolean'
  }
};

// Quote Request schema
export const QUOTE_REQUEST_SCHEMA = {
  id: 'string',
  name: 'string',
  email: 'string',
  phone: 'string',
  company: 'string',
  serviceType: 'string',
  timeline: 'string',
  budget: 'string',
  description: 'string',
  files: 'array',
  status: 'string',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Testimonial schema
export const TESTIMONIAL_SCHEMA = {
  id: 'string',
  name: 'string',
  company: 'string',
  rating: 'number',
  content: 'string',
  avatar: 'string',
  featured: 'boolean',
  isApproved: 'boolean',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Category schema
export const CATEGORY_SCHEMA = {
  id: 'string',
  categoryId: 'string',
  name: 'string',
  description: 'string',
  icon: 'string',
  image: 'string',
  featuredSubCategories: 'array',
  popular: 'boolean',
  isActive: 'boolean',
  sortOrder: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Sub-category schema
export const SUB_CATEGORY_SCHEMA = {
  id: 'string',
  categoryId: 'string',
  name: 'string',
  description: 'string',
  isActive: 'boolean',
  sortOrder: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};
