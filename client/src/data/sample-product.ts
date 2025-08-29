import { ProductDetail } from '@/types/products';

export const sampleProduct: ProductDetail = {
  id: "sample-sign-001",
  name: "Custom Metal Business Sign",
  category: "SIGNS" as any,
  subCategory: "Business Signs",
  description: "Professional metal business sign with customizable options",
  longDescription: "Create a lasting impression with our premium metal business sign. This durable sign features high-quality materials and professional finishing options. Perfect for storefronts, offices, and commercial buildings. Choose from various sizes, materials, and customization options to match your brand perfectly.",
  price: 299.99,
  image: "/images/products/metal-sign-1.jpg",
  thumbnail: "/images/products/metal-sign-1-thumb.jpg",
  images: [
    {
      id: "img-1",
      url: "/images/products/metal-sign-1.jpg",
      alt: "Metal business sign front view",
      thumbnail: "/images/products/metal-sign-1-thumb.jpg"
    },
    {
      id: "img-2", 
      url: "/images/products/metal-sign-2.jpg",
      alt: "Metal business sign side view",
      thumbnail: "/images/products/metal-sign-2-thumb.jpg"
    },
    {
      id: "img-3",
      url: "/images/products/metal-sign-3.jpg", 
      alt: "Metal business sign installation",
      thumbnail: "/images/products/metal-sign-3-thumb.jpg"
    }
  ],
  sizes: [
    { id: "size-1", name: "Small", width: 12, height: 24, unit: "inches", price: 199.99 },
    { id: "size-2", name: "Medium", width: 18, height: 36, unit: "inches", price: 299.99 },
    { id: "size-3", name: "Large", width: 24, height: 48, unit: "inches", price: 399.99 }
  ],
  shapes: [
    { id: "shape-1", name: "Rectangle", description: "Classic rectangular shape", icon: "rectangle" },
    { id: "shape-2", name: "Rounded", description: "Modern rounded corners", icon: "rounded" }
  ],
  materials: ["Aluminum", "Stainless Steel", "Brass"],
  features: [
    "Weather resistant",
    "UV protected finish",
    "Easy installation",
    "Professional appearance",
    "Long lasting durability"
  ],
  specifications: [
    {
      id: "spec-1",
      name: "Material Thickness",
      type: "select",
      options: ["0.063\"", "0.080\"", "0.125\""],
      required: true
    },
    {
      id: "spec-2", 
      name: "Finish Type",
      type: "select",
      options: ["Matte", "Gloss", "Satin", "Brushed"],
      required: true
    },
    {
      id: "spec-3",
      name: "Mounting Style",
      type: "select", 
      options: ["Wall Mount", "Post Mount", "Hanging"],
      required: true
    }
  ],
  inStock: true,
  rating: 4.8,
  reviewCount: 127,
  questionCount: 23,
  tags: ["business", "metal", "custom", "professional", "outdoor"],
  featured: true,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-15"),

  // Dynamic pricing configuration
  pricing: {
    basePrice: 299.99,
    discountPercentage: 10,
    pricingModel: "per_sq_ft",
    pricePerSqFt: 12.50,
    minPrice: 99.99,
    maxPrice: 999.99
  },

  // Size constraints for custom sizing
  sizeConstraints: {
    allowCustomSize: true,
    minWidth: 6,
    maxWidth: 60,
    minHeight: 6,
    maxHeight: 60,
    defaultWidth: 18,
    defaultHeight: 36,
    unit: "inch"
  },

  // Customizable options
  customizableOptions: [
    {
      id: "option-1",
      name: "Material",
      type: "select",
      required: true,
      values: [
        { value: "aluminum", label: "Aluminum", priceImpact: 0, description: "Lightweight and durable" },
        { value: "stainless_steel", label: "Stainless Steel", priceImpact: 50, description: "Premium finish, rust resistant" },
        { value: "brass", label: "Brass", priceImpact: 75, description: "Luxury appearance, high-end look" }
      ]
    },
    {
      id: "option-2",
      name: "Finish",
      type: "select", 
      required: true,
      values: [
        { value: "matte", label: "Matte", priceImpact: 0, description: "Non-reflective, professional" },
        { value: "gloss", label: "Gloss", priceImpact: 25, description: "Shiny, eye-catching" },
        { value: "satin", label: "Satin", priceImpact: 15, description: "Semi-gloss, elegant" },
        { value: "brushed", label: "Brushed", priceImpact: 30, description: "Textured, modern" }
      ]
    },
    {
      id: "option-3",
      name: "Backlighting",
      type: "select",
      required: false,
      values: [
        { value: "none", label: "No Backlighting", priceImpact: 0, description: "Standard sign" },
        { value: "led", label: "LED Backlighting", priceImpact: 150, description: "Illuminated for night visibility" },
        { value: "halo", label: "Halo Effect", priceImpact: 200, description: "Soft glow around sign edges" }
      ]
    },
    {
      id: "option-4",
      name: "Mounting Hardware",
      type: "select",
      required: true,
      values: [
        { value: "wall_mount", label: "Wall Mount", priceImpact: 0, description: "Standard wall installation" },
        { value: "post_mount", label: "Post Mount", priceImpact: 45, description: "Freestanding post installation" },
        { value: "hanging", label: "Hanging Mount", priceImpact: 35, description: "Suspended from ceiling or structure" }
      ]
    }
  ],

  // Quantity discounts
  quantityDiscounts: [
    { minQuantity: 2, maxQuantity: 4, discountPercentage: 5, description: "5% off 2-4 signs" },
    { minQuantity: 5, maxQuantity: 9, discountPercentage: 10, description: "10% off 5-9 signs" },
    { minQuantity: 10, maxQuantity: 19, discountPercentage: 15, description: "15% off 10-19 signs" },
    { minQuantity: 20, maxQuantity: undefined, discountPercentage: 20, description: "20% off 20+ signs" }
  ],

  // Shipping options
  shippingOptions: [
    {
      id: "standard_shipping",
      name: "Standard Shipping",
      description: "5-7 business days",
      basePrice: 15.99,
      estimatedDays: 5,
      zipCodeRequired: true,
      zipCodePricing: {
        ranges: [
          { start: "00000", end: "19999", additionalCost: 0 },
          { start: "20000", end: "39999", additionalCost: 5 },
          { start: "40000", end: "59999", additionalCost: 10 },
          { start: "60000", end: "79999", additionalCost: 15 },
          { start: "80000", end: "99999", additionalCost: 20 }
        ]
      }
    },
    {
      id: "express_shipping",
      name: "Express Shipping", 
      description: "2-3 business days",
      basePrice: 29.99,
      estimatedDays: 3,
      zipCodeRequired: true,
      zipCodePricing: {
        ranges: [
          { start: "00000", end: "19999", additionalCost: 0 },
          { start: "20000", end: "39999", additionalCost: 8 },
          { start: "40000", end: "59999", additionalCost: 15 },
          { start: "60000", end: "79999", additionalCost: 22 },
          { start: "80000", end: "99999", additionalCost: 30 }
        ]
      }
    },
    {
      id: "overnight_shipping",
      name: "Overnight Shipping",
      description: "Next business day",
      basePrice: 79.99,
      estimatedDays: 1,
      zipCodeRequired: true,
      zipCodePricing: {
        ranges: [
          { start: "00000", end: "19999", additionalCost: 0 },
          { start: "20000", end: "39999", additionalCost: 15 },
          { start: "40000", end: "59999", additionalCost: 25 },
          { start: "60000", end: "79999", additionalCost: 35 },
          { start: "80000", end: "99999", additionalCost: 45 }
        ]
      }
    }
  ],

  // Turnaround time
  turnaroundTime: {
    estimatedDays: 7,
    rushAvailable: true,
    rushTurnaroundDays: 3,
    rushFeePercentage: 50,
    rushFeeMultiplier: 1.5,
    orderCutoffTime: "2:00 PM",
    businessDaysOnly: true
  },

  // Personalization options
  personalizationOptions: {
    artworkUpload: true,
    designNow: true,
    designHelp: true,
    maxFileSize: 10, // MB
    supportedFormats: ["JPG", "PNG", "PDF", "AI", "EPS"],
    designServiceFee: 75
  },

  // Inventory information
  inventory: {
    stockQuantity: 45,
    inStock: true,
    lowStockThreshold: 10,
    backorderAvailable: true,
    supplierLeadTime: 14
  },

  // Reviews
  reviews: [
    {
      id: "review-1",
      userId: "user-1",
      userName: "John Smith",
      rating: 5,
      title: "Excellent Quality Sign",
      comment: "The sign looks professional and the quality is outstanding. Installation was easy and it looks great on our storefront.",
      date: new Date("2024-01-10"),
      helpful: 12,
      verified: true
    },
    {
      id: "review-2", 
      userId: "user-2",
      userName: "Sarah Johnson",
      rating: 4,
      title: "Great Custom Sign",
      comment: "Love how customizable this sign is. The rush order option saved us when we needed it quickly for an event.",
      date: new Date("2024-01-08"),
      helpful: 8,
      verified: true
    }
  ],

  // Related products
  relatedProducts: ["sign-002", "sign-003", "sign-004"],
  frequentlyBoughtWith: ["mounting-kit-001", "lighting-kit-001"]
};
