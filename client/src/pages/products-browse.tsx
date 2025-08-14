import React, { useMemo, useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FaqsSection from "@/components/faqs-section";
import { ProductCategory, PRODUCT_SUBCATEGORIES } from "@/types/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { ChevronRight } from "lucide-react";
import { getCategoryImage } from "@/lib/image-utils";

type Shape = "Rectangle" | "Square" | "Circle";

type BrowseItem = {
  id: string;
  title: string;
  category: ProductCategory;
  image: string;
  size: "Small" | "Medium" | "Large";
  shape: Shape;
  subCategory: string;
};

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
    // Handle forward slashes by replacing them with underscores for matching
    const normalizedCategory = decodedCategory.replace(/\//g, "_");
    const match = Object.values(ProductCategory).find((v) => 
      v.toLowerCase().replace(/\//g, "_") === normalizedCategory.toLowerCase()
    );
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
  const [size, setSize] = useState<"All" | "Small" | "Medium" | "Large">("All");
  const [shape, setShape] = useState<"All" | Shape>("All");

  const subCategories = PRODUCT_SUBCATEGORIES[selectedCategory] || [];

  const items: BrowseItem[] = useMemo(() => {
    const baseImage = categoryFallbackImage[selectedCategory];
    // synthesize demo items from subcategories
    return subCategories.map((sub, index) => {
      const sizes: Array<"Small" | "Medium" | "Large"> = ["Small", "Medium", "Large"];
      const shapes: Shape[] = ["Rectangle", "Square", "Circle"];
      return {
        id: `${slugify(selectedCategory)}-${slugify(sub)}`,
        title: sub,
        category: selectedCategory,
        image: baseImage,
        size: sizes[index % sizes.length],
        shape: shapes[index % shapes.length],
        subCategory: sub,
      } as BrowseItem;
    });
  }, [selectedCategory, subCategories]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (selectedSubCategory !== "all" && it.subCategory !== selectedSubCategory) return false;
      if (search && !it.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (size !== "All" && it.size !== size) return false;
      if (shape !== "All" && it.shape !== shape) return false;
      return true;
    });
  }, [items, selectedSubCategory, search, size, shape]);

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
              <motion.div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
                <motion.div variants={fadeInUp} className="md:col-span-2">
                  <Input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Select value={size} onValueChange={(v) => setSize(v as any)}>
                    <SelectTrigger><SelectValue placeholder="Size" /></SelectTrigger>
                    <SelectContent>
                      {(["All", "Small", "Medium", "Large"] as const).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Select value={shape} onValueChange={(v) => setShape(v as any)}>
                    <SelectTrigger><SelectValue placeholder="Shape" /></SelectTrigger>
                    <SelectContent>
                      {(["All", "Rectangle", "Square", "Circle"] as const).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </motion.div>

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Browse {selectedCategory}</h2>
                <div className="text-sm text-gray-500">{filtered.length} results</div>
              </div>

              {/* Grid */}
              <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
                {filtered.map((item) => (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className="overflow-hidden group cursor-pointer" onClick={() => (window.location.href = `/product/${slugify(item.title)}`)}>
                      <div className="relative overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-blue-600 font-medium mb-1">{item.category}</div>
                        <div className="font-semibold text-sm mb-1">{item.title}</div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{item.size}</span>
                          <span className="flex items-center gap-1">{item.shape} <ChevronRight className="w-3 h-3" /></span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
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
