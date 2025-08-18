import React, { useMemo, useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FaqsSection from "@/components/faqs-section";
import { ProductCategory, PRODUCT_SUBCATEGORIES, Product } from "@/types/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { ChevronRight, Star, ShoppingCart, Eye } from "lucide-react";
import { getCategoryImage } from "@/lib/image-utils";
import { DUMMY_PRODUCTS, getProductsByCategory, getCategoryData } from "@/data/dummy-products";

type Shape = "Rectangle" | "Square" | "Circle";

const categoryFallbackImage: Record<ProductCategory, string> = {
  [ProductCategory.BANNERS_FLAGS]: getCategoryImage('BANNERS_FLAGS'),
  [ProductCategory.SIGNS]: getCategoryImage('SIGNS'),
  [ProductCategory.VEHICLE_TRAILER]: getCategoryImage('VEHICLE_TRAILER'),
  [ProductCategory.INDOOR_SIGNS]: getCategoryImage('INDOOR_SIGNS'),
  [ProductCategory.OUTDOOR_SIGNS]: getCategoryImage('OUTDOOR_SIGNS'),
  [ProductCategory.ELECTRIC_SIGNS]: getCategoryImage('ELECTRIC_SIGNS'),
  [ProductCategory.LASER_ENGRAVING]: getCategoryImage('LASER_ENGRAVING'),
  [ProductCategory.DECALS_STICKERS]: getCategoryImage('DECALS_STICKERS'),
  [ProductCategory.EXPO_DISPLAY]: getCategoryImage('EXPO_DISPLAY'),
  [ProductCategory.PRIVACY_SECURITY]: getCategoryImage('PRIVACY_SECURITY'),
  [ProductCategory.MARKETING]: getCategoryImage('MARKETING'),
  [ProductCategory.PROMO]: getCategoryImage('PROMO'),
  [ProductCategory.ACCESSORIES]: getCategoryImage('ACCESSORIES'),
};

function slugify(input: string) {
  return input.toLowerCase().replace(/[\s/&]+/g, "-");
}

export default function ProductsBrowsePage() {
  const params = (() => {
    try { return new URLSearchParams(window.location.search); } catch { return new URLSearchParams(); }
  })();
  
  const initialCategoryFromQuery: ProductCategory | undefined = (() => {
    const c = params.get("category");
    if (!c) return undefined;
    const decodedCategory = decodeURIComponent(c);
    // Find exact match with the enum values
    const match = Object.values(ProductCategory).find((v) => v === decodedCategory);
    return match as ProductCategory | undefined;
  })();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategoryFromQuery || ProductCategory.SIGNS);
  const subCategoriesForInitial = PRODUCT_SUBCATEGORIES[initialCategoryFromQuery || ProductCategory.SIGNS] || [];
  
  const initialSub = (() => {
    const s = params.get("sub");
    if (!s) return "all";
    const match = subCategoriesForInitial.find((x) => x.toLowerCase() === decodeURIComponent(s).toLowerCase());
    return match || "all";
  })();
  
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSub);
  const [search, setSearch] = useState<string>("");

  // Get subcategories for the selected category (for the sidebar selector)
  const subCategories = PRODUCT_SUBCATEGORIES[selectedCategory] || [];

  const items: Product[] = useMemo(() => {
    // Get real products from dummy data for the selected category
    const categoryProducts = getProductsByCategory(selectedCategory);
    
    // If we have real products, use them; otherwise fall back to synthetic ones
    if (categoryProducts.length > 0) {
      return categoryProducts;
    }
    
    // Fallback: synthesize demo items from subcategories
    const subCategories = PRODUCT_SUBCATEGORIES[selectedCategory] || [];
    const baseImage = categoryFallbackImage[selectedCategory];
    const fallbackProducts = subCategories.map((sub, index) => {
      const sizes: Array<"Small" | "Medium" | "Large"> = ["Small", "Medium", "Large"];
      const shapes: Shape[] = ["Rectangle", "Square", "Circle"];
      return {
        id: `${slugify(selectedCategory)}-${slugify(sub)}`,
        name: sub,
        category: selectedCategory,
        subCategory: sub,
        description: `Professional ${sub.toLowerCase()} for your business needs.`,
        price: 99.99 + (index * 50),
        image: baseImage,
        thumbnail: baseImage,
        sizes: [],
        shapes: [],
        materials: ['High Quality Material'],
        features: ['Professional Grade', 'Custom Design'],
        specifications: {
          weight: 1,
          material: 'Premium Material',
          finish: 'Professional',
          durability: '5+ Years',
          installation: 'Professional Required',
          warranty: '2 Years'
        },
        inStock: true,
        rating: 4.5,
        reviewCount: 25,
        tags: [sub.toLowerCase(), 'professional', 'custom'],
        createdAt: new Date(),
        updatedAt: new Date()
      } as Product;
    });
    
    return fallbackProducts;
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (selectedSubCategory !== "all" && it.subCategory !== selectedSubCategory) return false;
      if (search && !it.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [items, selectedSubCategory, search]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setSelectedSubCategory("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-20">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-1">
                  {Object.values(ProductCategory).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${cat === selectedCategory ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Subcategory</h4>
                  <Select value={selectedSubCategory} onValueChange={(v) => setSelectedSubCategory(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {subCategories.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* Content */}
            <section className="flex-1">
              {/* Filters */}
              <motion.div className="mb-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
                <motion.div variants={fadeInUp} className="max-w-md">
                  <Input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </motion.div>
              </motion.div>

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Browse {selectedCategory}</h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">{filtered.length} results</div>
                  <button 
                    onClick={() => window.location.href = '/enhanced-editor'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Start Designing
                  </button>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <div key={item.id}>
                      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => (window.location.href = `/product/${slugify(item.name)}`)}>
                        <div className="relative overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          
                          {/* Product Badges */}
                          <div className="absolute top-2 left-2 flex gap-2">
                            {item.tags.includes('featured') && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
                            )}
                            {!item.inStock && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Out of Stock</span>
                            )}
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md">
                              <ShoppingCart className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-blue-600 font-medium">{item.category}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                              <span>({item.reviewCount})</span>
                            </div>
                          </div>
                          
                          <div className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</div>
                          
                          <div className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <span>{item.subCategory}</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium mb-2">No products found for {selectedCategory}</p>
                      <p className="text-sm">Try selecting a different category or check the console for debugging information.</p>
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                        <p className="text-xs font-mono">
                          Debug Info:<br/>
                          Selected Category: {selectedCategory}<br/>
                          Category Type: {typeof selectedCategory}<br/>
                          Available Products: {DUMMY_PRODUCTS.length}<br/>
                          Available Categories: {[...new Set(DUMMY_PRODUCTS.map(p => p.category))].join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* FAQ */}
        <FaqsSection />
      </main>

      <Footer />
    </div>
  );
}
