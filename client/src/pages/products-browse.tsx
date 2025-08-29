import React, { useMemo, useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ProductCategory, Product } from "@/types/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useStaticProducts } from "@/hooks/useStaticData";

// Category fallback images mapping
const categoryFallbackImage: Record<ProductCategory, string> = {
  [ProductCategory.SIGNS]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.BANNERS_FLAGS]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/category-banners.jpg",
  [ProductCategory.VEHICLE_TRAILER]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle/category-vehicle.jpg",
  [ProductCategory.LASER_ENGRAVING]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Laser%20Engraving/category-laser.jpg",
  [ProductCategory.EXPO_DISPLAY]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/category-banners.jpg",
  [ProductCategory.DECALS_STICKERS]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.PRIVACY_SECURITY]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.MARKETING]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.PROMO]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.ELECTRIC_SIGNS]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.INDOOR_SIGNS]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.OUTDOOR_SIGNS]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg",
  [ProductCategory.ACCESSORIES]: "https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Signs/category-signs.jpg"
};

// Function to convert database category to display name
function getCategoryDisplayName(category: ProductCategory): string {
  const displayNames: Record<ProductCategory, string> = {
    [ProductCategory.EXPO_DISPLAY]: "Expo Display",
    [ProductCategory.LASER_ENGRAVING]: "Laser Engraving",
    [ProductCategory.DECALS_STICKERS]: "Decals & Stickers",
    [ProductCategory.BANNERS_FLAGS]: "Banners & Flags",
    [ProductCategory.SIGNS]: "Signs",
    [ProductCategory.PRIVACY_SECURITY]: "Privacy & Security Films",
    [ProductCategory.MARKETING]: "Marketing",
    [ProductCategory.PROMO]: "Promotional",
    [ProductCategory.ELECTRIC_SIGNS]: "Electric Signs",
    [ProductCategory.VEHICLE_TRAILER]: "Vehicle & Trailer",
    [ProductCategory.INDOOR_SIGNS]: "Indoor Signs",
    [ProductCategory.OUTDOOR_SIGNS]: "Outdoor Signs",
    [ProductCategory.ACCESSORIES]: "Accessories"
  };
  return displayNames[category] || category;
}

// Function to validate and get a safe image URL
function getSafeImageUrl(imageUrl: string | undefined, category: ProductCategory): string {
  if (!imageUrl) {
    return categoryFallbackImage[category] || categoryFallbackImage[ProductCategory.SIGNS];
  }
  
  // Check if the image URL is valid
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    // Invalid URL, use fallback
    return categoryFallbackImage[category] || categoryFallbackImage[ProductCategory.SIGNS];
  }
}

// Test link for enhanced product detail page
const ENHANCED_PRODUCT_TEST_LINK = "/product/sample-sign-001";

// Sub-categories mapping
const PRODUCT_SUBCATEGORIES: Record<ProductCategory, string[]> = {
  [ProductCategory.EXPO_DISPLAY]: [
    "Trade Show Displays", "Banner Stands", "Custom Table Covers", 
    "Event Tent Signs", "Trade Show Support Materials", "Pop-up Displays",
    "Retractable Banners", "Table Covers", "Event Signage", "Display Accessories"
  ],
  [ProductCategory.LASER_ENGRAVING]: [
    "Engraved Signs", "Laser Engraved Plaques and Awards", "Laser Engraved Metal",
    "Laser Engraved Wood", "Laser Engraved Plastic", "Custom Promotional Products",
    "Laser Cut Signs", "Engraved Plaques", "Metal Engraving", "Wood Engraving"
  ],
  [ProductCategory.DECALS_STICKERS]: [
    "Custom Stickers", "Wall Decals", "Window Decals", "Floor Decals",
    "Vinyl Lettering", "Custom Vinyl Decals", "Die-Cut Stickers",
    "Vehicle Magnets", "Custom Magnets", "Vinyl Graphics", "Sticker Sheets",
    "Wall Graphics", "Window Graphics", "Floor Graphics", "Vehicle Decals"
  ],
  [ProductCategory.BANNERS_FLAGS]: [
    "Vinyl Banners", "Flags", "Custom Flags", "Flag Poles and Accessories",
    "Pole Banners", "Event and Promotional Banners", "Banners for Sports Teams",
    "Outdoor Banners", "Indoor Banners", "Flag Poles", "Banner Stands",
    "Promotional Banners", "Sports Banners", "Event Banners"
  ],
  [ProductCategory.SIGNS]: [
    "Channel Letters", "Monument Signs", "Directional Signs", "Neon Signs",
    "Illuminated Signs", "Dimensional Signs", "Building Signs", "Lobby Signs",
    "Door Signs", "A-Frame Signs", "Reflective Signs", "Safety Signs",
    "Wayfinding Signs", "ADA Compliant Signs", "Custom Signs", "Floor Graphics",
    "Wall Graphics", "Pylon Signs", "Yard Signs", "Real Estate Signs",
    "Hanging Signs", "Temporary and Event Signage"
  ],
  [ProductCategory.PRIVACY_SECURITY]: [
    "Window Privacy Films", "Security Window Films", "Decorative Window Films",
    "Solar Control Films"
  ],
  [ProductCategory.MARKETING]: [
    "Branding Packages", "Digital Marketing Materials", "Print Marketing",
    "Trade Show Materials", "Promotional Items", "Business Cards",
    "Brochures", "Flyers", "Posters", "Banners", "Vehicle Graphics"
  ],
  [ProductCategory.PROMO]: [
    "Promotional Products", "Trade Show Giveaways", "Custom Apparel",
    "Branded Items", "Corporate Gifts", "Event Materials"
  ],
  [ProductCategory.ELECTRIC_SIGNS]: [
    "LED Signs", "Neon Signs", "Digital Displays", "Message Centers",
    "Electronic Signs", "Lighted Signs", "Illuminated Displays"
  ],
  [ProductCategory.VEHICLE_TRAILER]: [
    "Vehicle Wraps", "Trailer Graphics", "Fleet Graphics", "Car Decals",
    "Truck Graphics", "Van Wraps", "Motorcycle Graphics", "Boat Graphics"
  ],
  [ProductCategory.INDOOR_SIGNS]: [
    "Lobby Signs", "Wall Murals", "Directional Signs", "Room Signs",
    "Office Signs", "Retail Signs", "Restaurant Signs", "Healthcare Signs"
  ],
  [ProductCategory.OUTDOOR_SIGNS]: [
    "Pylon Signs", "Yard Signs", "Building Signs", "Monument Signs",
    "Pole Signs", "Channel Letters", "LED Signs", "Neon Signs"
  ],
  [ProductCategory.ACCESSORIES]: [
    "Mounting Hardware", "Cleaning Supplies", "Installation Tools",
    "Sign Accessories", "Lighting Components", "Electrical Components"
  ]
};

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductsBrowsePage() {
  const params = new URLSearchParams(window.location.search);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    (params.get('category') as ProductCategory) || ProductCategory.SIGNS
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  // Fetch products from static data
  const { products, loading, error, fetchProductsByCategory } = useStaticProducts();

  useEffect(() => {
    // Fetch products for the selected category
    console.log('🔄 Category changed to:', selectedCategory);
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory, fetchProductsByCategory]);

  const subCategories = PRODUCT_SUBCATEGORIES[selectedCategory] || [];

  const items: Product[] = useMemo(() => {
    if (loading) return [];
    if (error) return [];

    console.log(`🔄 Using ${products.length} static products`);
    console.log('📊 Product categories found:', [...new Set(products.map(p => p.category))]);

    // Our static data already matches the Product interface, so just return it
    return products;
  }, [products, loading, error]);

  const filtered = useMemo(() => {
    let filteredItems = items;

    // Filter by sub-category
    if (selectedSubCategory && selectedSubCategory !== "all") {
      filteredItems = filteredItems.filter(item => 
        item.subCategory === selectedSubCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredItems;
  }, [items, selectedSubCategory, searchTerm]);

  const handleCategoryChange = (category: ProductCategory) => {
    console.log('🎯 Category button clicked:', category);
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error loading products</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Product Catalog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover our comprehensive range of professional signage solutions, 
            from custom banners to illuminated signs and everything in between.
          </p>
          
          {/* Test Enhanced Product Detail Page */}
          <div className="mt-8">
            <a 
              href={ENHANCED_PRODUCT_TEST_LINK}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg"
            >
              🧪 Test Enhanced Product Detail Page
            </a>
            <p className="text-sm text-blue-200 mt-2">
              Click to see the new dynamic pricing, customization options, and real-time calculations
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.values(ProductCategory).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">{getCategoryDisplayName(category)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedSubCategory || "all"} onValueChange={(value) => setSelectedSubCategory(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Sub-categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sub-categories</SelectItem>
              {subCategories.map((subCategory) => (
                <SelectItem key={subCategory} value={subCategory}>
                  {subCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filtered.length} of {items.length} products in {getCategoryDisplayName(selectedCategory)}
          </p>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {filtered.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                className="group cursor-pointer"
                onClick={() => window.location.href = `/product/${product.id}`}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to category image if product image fails
                        const target = e.target as HTMLImageElement;
                        console.log(`🖼️ Image failed to load: ${product.image}, using fallback for category: ${product.category}`);
                        target.src = categoryFallbackImage[product.category];
                        // Prevent infinite error loop
                        target.onerror = null;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {product.subCategory}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                          <ShoppingCart className="h-4 w-4 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category selection.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Animation variants
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
