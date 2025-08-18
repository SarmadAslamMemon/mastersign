import { motion } from "framer-motion";
import { ArrowRight, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ProductCategory, PRODUCT_SUBCATEGORIES } from "@/types/products";
import { getImageUrl } from "@/lib/image-utils";
import { useProducts } from "@/hooks/useSupabase";
import { useEffect, useState } from "react";

export default function ProductsSection() {
  const { products, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  // All parent categories with their featured sub-categories
  const allCategories = [
    {
      category: ProductCategory.EXPO_DISPLAY,
      title: "Expo/Display",
      featuredSubCategories: ["Trade Show Displays", "Banner Stands", "Custom Table Covers"],
      image: getImageUrl("Tradeshows-Expos/popup1.jpg"),
      popular: true
    },
    {
      category: ProductCategory.LASER_ENGRAVING,
      title: "Laser Engraving",
      featuredSubCategories: ["Engraved Signs", "Laser Engraved Plaques", "Custom Promotional Products"],
      image: getImageUrl("Laser Engraving/fish.jpg"),
      popular: false
    },
    {
      category: ProductCategory.DECALS_STICKERS,
      title: "Decals/Stickers",
      featuredSubCategories: ["Custom Stickers", "Wall Decals", "Vehicle Magnets"],
      image: getImageUrl("Tradeshows-Expos/popup1.jpg"),
      popular: true
    },
    {
      category: ProductCategory.BANNERS_FLAGS,
      title: "Banners/Flags",
      featuredSubCategories: ["Vinyl Banners", "Custom Flags", "Event Banners"],
      image: getImageUrl("Banners/MAIN - Banner.jpg"),
      popular: true
    },
    {
      category: ProductCategory.SIGNS,
      title: "Signs",
      featuredSubCategories: ["Channel Letters", "Monument Signs", "Custom Signs"],
      image: getImageUrl("Business Signage/Performance.jpg"),
      popular: true
    },
    {
      category: ProductCategory.PRIVACY_SECURITY,
      title: "Privacy & Security Films",
      featuredSubCategories: ["Window Privacy Films", "Security Films", "Decorative Films"],
      image: getImageUrl("Window Tint & Frost/IMG_20230503_200206_01.jpg"),
      popular: false
    },
    {
      category: ProductCategory.MARKETING,
      title: "Marketing",
      featuredSubCategories: ["Business Branding", "Multi-Location Programs", "Sign Design"],
      image: getImageUrl("Business Signage/Dancology.jpg"),
      popular: false
    },
    {
      category: ProductCategory.PROMO,
      title: "Promotional",
      featuredSubCategories: ["Custom Products", "Trophies & Awards", "Promotional Items"],
      image: getImageUrl("Clothes/FullSizeR.jpg"),
      popular: false
    },
    {
      category: ProductCategory.ELECTRIC_SIGNS,
      title: "Electric Signs",
      featuredSubCategories: ["LED Signs", "Neon Signs", "Digital Displays"],
      image: getImageUrl("Channel Letters/20241112_194813.jpg"),
      popular: true
    },
    {
      category: ProductCategory.VEHICLE_TRAILER,
      title: "Vehicle & Trailer",
      featuredSubCategories: ["Vehicle Wraps", "Trailer Graphics", "Fleet Branding"],
      image: getImageUrl("Vehicle Graphics/20240309_133150.jpg"),
      popular: false
    },
    {
      category: ProductCategory.INDOOR_SIGNS,
      title: "Indoor Signs",
      featuredSubCategories: ["Office Signs", "Retail Signs", "Healthcare Signs"],
      image: getImageUrl("Office Signage/20230120_165654.jpg"),
      popular: false
    },
    {
      category: ProductCategory.OUTDOOR_SIGNS,
      title: "Outdoor Signs",
      featuredSubCategories: ["Monument Signs", "Building Signs", "Safety Signs"],
      image: getImageUrl("Monument Signs/Monument Sign.JPG"),
      popular: true
    },
    {
      category: ProductCategory.ACCESSORIES,
      title: "Accessories",
      featuredSubCategories: ["Mounting Hardware", "Display Stands", "Installation Tools"],
      image: getImageUrl("Fabricated Signs/20230616_154312.jpg"),
      popular: false
    }
  ];

  // Get featured products from Supabase data
  useEffect(() => {
    if (products.length > 0) {
      // Get one featured product from each category
      const featured = allCategories.map(cat => {
        const categoryProducts = products.filter(p => p.category === cat.category);
        return categoryProducts[0] || null;
      }).filter(Boolean);
      
      setFeaturedProducts(featured);
    }
  }, [products]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of professional signage solutions, 
            from custom banners to illuminated signs and everything in between.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {allCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="group cursor-pointer h-full"
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              onClick={() => window.location.href = `/products?category=${encodeURIComponent(category.category)}`}
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
                {category.popular && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="relative overflow-hidden flex-shrink-0">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4 flex-1">
                    {category.featuredSubCategories.map((sub, idx) => (
                      <div key={idx} className="flex items-center text-xs mb-1">
                        <ChevronRight className="h-3 w-3 text-blue-500 mr-1" />
                        {sub}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <motion.div 
            className="mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <motion.div 
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onClick={() => window.location.href = `/product/${product.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.images?.[0] || category.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {product.sub_category}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating || 4.5}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.short_description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.pricing?.base_price || 99.99}
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse our complete product catalog or get in touch for custom solutions 
              tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => window.location.href = '/products'}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Browse All Products
              </Button>
              <Button 
                size="lg" 
                onClick={() => {
                  const element = document.getElementById('quote');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Get Custom Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}