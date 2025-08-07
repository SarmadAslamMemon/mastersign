import { useRoute } from "wouter";
import ProductDetailComponent from "@/components/product-detail";
import Navigation from "@/components/navigation";
import { ProductDetail as ProductDetailType, ProductCategory } from "@/types/products";

// Sample product data for demonstration
const sampleProduct: ProductDetailType = {
  id: "vinyl-banner-001",
  name: "Premium Vinyl Banner",
  category: ProductCategory.BANNERS_FLAGS,
  subCategory: "Vinyl Banners",
  shortDescription: "High-quality vinyl banner perfect for outdoor advertising",
  longDescription: "Our premium vinyl banner is crafted from high-quality materials designed to withstand outdoor elements. Perfect for trade shows, outdoor events, and long-term advertising campaigns. Features include UV-resistant printing, reinforced grommets, and fade-resistant colors that maintain their vibrancy even in direct sunlight.",
  images: [
    {
      id: "img1",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Vinyl Banner Front View"
    },
    {
      id: "img2", 
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Vinyl Banner Detail"
    },
    {
      id: "img3",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      alt: "Vinyl Banner Installation"
    }
  ],
  rating: 4.8,
  reviewCount: 127,
  questionCount: 23,
  features: [
    "UV-resistant printing",
    "Reinforced grommets",
    "Fade-resistant colors",
    "Weatherproof material",
    "Quick installation"
  ],
  specifications: [
    {
      id: "size",
      name: "Size",
      type: "select",
      options: ["3' x 6'", "4' x 8'", "5' x 10'", "6' x 12'", "Custom Size"],
      required: true
    },
    {
      id: "material",
      name: "Material",
      type: "select", 
      options: ["13 oz Vinyl", "18 oz Vinyl", "Premium Mesh", "Fabric"],
      required: true
    },
    {
      id: "finish",
      name: "Finish",
      type: "select",
      options: ["Matte", "Gloss", "Satin"],
      required: true
    },
    {
      id: "quantity",
      name: "Quantity",
      type: "number",
      min: 1,
      max: 100,
      step: 1,
      unit: "pieces",
      required: true
    },
    {
      id: "custom_text",
      name: "Custom Text",
      type: "text",
      required: false
    }
  ],
  pricing: {
    basePrice: 89.99,
    discountPercentage: 15,
    bulkPricing: [
      { minQuantity: 5, discount: 10 },
      { minQuantity: 10, discount: 20 },
      { minQuantity: 25, discount: 30 }
    ]
  },
  availability: "In Stock",
  estimatedDelivery: "3-5 business days",
  tags: ["outdoor", "advertising", "trade-show", "durable", "customizable"]
};

const channelLettersProduct: ProductDetailType = {
  id: "channel-letters-001",
  name: "LED Channel Letters",
  category: ProductCategory.SIGNS,
  subCategory: "Channel Letters",
  shortDescription: "Professional LED channel letters for business signage",
  longDescription: "Our LED channel letters provide exceptional visibility day and night. Each letter is custom-fabricated with premium materials and energy-efficient LED lighting. Perfect for storefronts, office buildings, and any business requiring professional exterior signage.",
  images: [
    {
      id: "img1",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Channel Letters Front View"
    },
    {
      id: "img2",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      alt: "Channel Letters Detail"
    }
  ],
  rating: 4.9,
  reviewCount: 89,
  questionCount: 15,
  features: [
    "Energy-efficient LED lighting",
    "Weather-resistant construction",
    "Custom lettering",
    "Easy installation",
    "Long lifespan"
  ],
  specifications: [
    {
      id: "letter_height",
      name: "Letter Height",
      type: "select",
      options: ["12\"", "18\"", "24\"", "36\"", "48\"", "Custom"],
      required: true
    },
    {
      id: "lighting_type",
      name: "Lighting Type",
      type: "select",
      options: ["Face-lit", "Halo-lit", "Non-lit"],
      required: true
    },
    {
      id: "color",
      name: "Color",
      type: "text",
      required: true
    },
    {
      id: "quantity",
      name: "Number of Letters",
      type: "number",
      min: 1,
      max: 50,
      step: 1,
      unit: "letters",
      required: true
    }
  ],
  pricing: {
    basePrice: 299.99,
    discountPercentage: 10,
    bulkPricing: [
      { minQuantity: 3, discount: 15 },
      { minQuantity: 5, discount: 25 }
    ]
  },
  availability: "In Stock",
  estimatedDelivery: "7-10 business days",
  tags: ["led", "business", "exterior", "custom", "professional"]
};

const vehicleWrapProduct: ProductDetailType = {
  id: "vehicle-wrap-001", 
  name: "Full Vehicle Wrap",
  category: ProductCategory.VEHICLE_TRAILER,
  subCategory: "Vehicle Graphics and Wraps",
  shortDescription: "Complete vehicle wrap for maximum advertising impact",
  longDescription: "Transform your vehicle into a mobile billboard with our premium full vehicle wrap. Using high-quality vinyl materials and professional installation techniques, we create eye-catching designs that turn heads wherever you go. Perfect for businesses looking to maximize their advertising reach.",
  images: [
    {
      id: "img1",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Vehicle Wrap Front View"
    },
    {
      id: "img2",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Vehicle Wrap Side View"
    }
  ],
  rating: 4.7,
  reviewCount: 156,
  questionCount: 34,
  features: [
    "Full vehicle coverage",
    "High-quality vinyl material",
    "Professional installation",
    "UV-resistant printing",
    "Easy removal"
  ],
  specifications: [
    {
      id: "vehicle_type",
      name: "Vehicle Type",
      type: "select",
      options: ["Sedan", "SUV", "Truck", "Van", "Commercial Vehicle", "Custom"],
      required: true
    },
    {
      id: "wrap_type",
      name: "Wrap Type",
      type: "select",
      options: ["Full Wrap", "Partial Wrap", "Decals Only"],
      required: true
    },
    {
      id: "design_complexity",
      name: "Design Complexity",
      type: "select",
      options: ["Simple", "Moderate", "Complex", "Custom Design"],
      required: true
    },
    {
      id: "duration",
      name: "Duration",
      type: "select",
      options: ["1-3 months", "3-6 months", "6-12 months", "Permanent"],
      required: true
    }
  ],
  pricing: {
    basePrice: 2499.99,
    discountPercentage: 5,
    bulkPricing: [
      { minQuantity: 2, discount: 10 },
      { minQuantity: 5, discount: 20 }
    ]
  },
  availability: "In Stock",
  estimatedDelivery: "10-14 business days",
  tags: ["vehicle", "advertising", "mobile", "professional", "custom"]
};

// Mock database for demonstration
const productDatabase: Record<string, ProductDetailType> = {
  "expo-display-001": {
    ...sampleProduct,
    id: "expo-display-001",
    name: "Trade Show Display",
    category: ProductCategory.EXPO_DISPLAY,
    subCategory: "Trade Show Displays"
  },
  "laser-engraving-001": {
    ...sampleProduct,
    id: "laser-engraving-001", 
    name: "Laser Engraved Plaque",
    category: ProductCategory.LASER_ENGRAVING,
    subCategory: "Laser Engraved Plaques and Awards"
  },
  "decals-stickers-001": {
    ...sampleProduct,
    id: "decals-stickers-001",
    name: "Custom Vinyl Decals",
    category: ProductCategory.DECALS_STICKERS,
    subCategory: "Custom Stickers"
  },
  "banners-flags-001": {
    ...sampleProduct,
    id: "banners-flags-001",
    name: "Custom Flag",
    category: ProductCategory.BANNERS_FLAGS,
    subCategory: "Flags"
  },
  "signs-001": {
    ...sampleProduct,
    id: "signs-001",
    name: "Monument Sign",
    category: ProductCategory.SIGNS,
    subCategory: "Monument Signs"
  },
  "privacy-security-films-001": {
    ...sampleProduct,
    id: "privacy-security-films-001",
    name: "Window Privacy Film",
    category: ProductCategory.PRIVACY_SECURITY,
    subCategory: "Window Privacy Films"
  },
  "marketing-001": {
    ...sampleProduct,
    id: "marketing-001",
    name: "Business Branding Package",
    category: ProductCategory.MARKETING,
    subCategory: "Branding for Businesses"
  },
  "promo-001": {
    ...sampleProduct,
    id: "promo-001",
    name: "Custom Promotional Products",
    category: ProductCategory.PROMO,
    subCategory: "Custom Promotional Products"
  },
  "electric-signs-001": {
    ...sampleProduct,
    id: "electric-signs-001",
    name: "LED Digital Sign",
    category: ProductCategory.ELECTRIC_SIGNS,
    subCategory: "LED and Digital Signs"
  },

  "indoor-signs-001": {
    ...sampleProduct,
    id: "indoor-signs-001",
    name: "Wall Mural",
    category: ProductCategory.INDOOR_SIGNS,
    subCategory: "Wall Murals and Graphics"
  },
  "outdoor-signs-001": {
    ...sampleProduct,
    id: "outdoor-signs-001",
    name: "Yard Sign",
    category: ProductCategory.OUTDOOR_SIGNS,
    subCategory: "Yard Signs"
  },
  "accessories-001": {
    ...sampleProduct,
    id: "accessories-001",
    name: "Sign Mounting Hardware",
    category: ProductCategory.ACCESSORIES,
    subCategory: "Mounting Hardware for Signs and Banners"
  }
};

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;

  const product = productId ? productDatabase[productId] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProductDetailComponent product={product} />
    </div>
  );
} 