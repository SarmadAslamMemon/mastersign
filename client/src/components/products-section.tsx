import { motion } from "framer-motion";
import { ArrowRight, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ProductCategory, PRODUCT_SUBCATEGORIES } from "@/types/products";
import appLogo from "@/assets/app-logo-sub.png";

// Local asset images for categories
import expoDisplayImg from "@/assets/Tradeshows-Expos/popup1.jpg";
import laserEngravingImg from "@/assets/Laser Engraving/fish.jpg";
import bannersFlagsImg from "@/assets/Banners/MAIN - Banner.jpg";
import signsImg from "@/assets/Business Signage/Performance.jpg";
import privacySecurityImg from "@/assets/Indoor-Outdoor Displays/IMG_20230621_000909.jpg";
import marketingImg from "@/assets/Business Signage/Dancology.jpg";
import promoImg from "@/assets/Clothes/FullSizeR.jpg";
import electricSignsImg from "@/assets/Channel Letters/20241112_194813.jpg";
import vehicleTrailerImg from "@/assets/Vehicle Graphics/20240309_133150.jpg";
import indoorSignsImg from "@/assets/Office Signage/20230120_165654.jpg";
import outdoorSignsImg from "@/assets/Indoor-Outdoor Displays/Exterior Sign.jpg";
import accessoriesImg from "@/assets/Fabricated Signs/20230616_154312.jpg";

export default function ProductsSection() {
  // All parent categories with their featured sub-categories
  const allCategories = [
    {
      category: ProductCategory.EXPO_DISPLAY,
      title: "Expo/Display",
      featuredSubCategories: ["Trade Show Displays", "Banner Stands", "Custom Table Covers"],
      image: expoDisplayImg,
      popular: true
    },
    {
      category: ProductCategory.LASER_ENGRAVING,
      title: "Laser Engraving",
      featuredSubCategories: ["Engraved Signs", "Laser Engraved Plaques", "Custom Promotional Products"],
      image: laserEngravingImg,
      popular: false
    },
    {
      category: ProductCategory.DECALS_STICKERS,
      title: "Decals/Stickers",
      featuredSubCategories: ["Custom Stickers", "Wall Decals", "Vehicle Magnets"],
      image: expoDisplayImg,
      popular: true
    },
    {
      category: ProductCategory.BANNERS_FLAGS,
      title: "Banners/Flags",
      featuredSubCategories: ["Vinyl Banners", "Custom Flags", "Event Banners"],
      image: bannersFlagsImg,
      popular: true
    },
    {
      category: ProductCategory.SIGNS,
      title: "Signs",
      featuredSubCategories: ["Channel Letters", "Monument Signs", "Custom Signs"],
      image: signsImg,
      popular: true
    },
    {
      category: ProductCategory.PRIVACY_SECURITY,
      title: "Privacy/Security Films",
      featuredSubCategories: ["Window Privacy Films", "Security Window Films", "Decorative Films"],
      image: privacySecurityImg,
      popular: false
    },
    {
      category: ProductCategory.MARKETING,
      title: "Marketing",
      featuredSubCategories: ["Branding for Businesses", "Digital Printing", "Marketing Signage"],
      image: marketingImg,
      popular: true
    },
    {
      category: ProductCategory.PROMO,
      title: "Promo",
      featuredSubCategories: ["Custom Promotional Products", "Trophies & Awards", "Wearables"],
      image: promoImg,
      popular: false
    },
    {
      category: ProductCategory.ELECTRIC_SIGNS,
      title: "Electric Signs",
      featuredSubCategories: ["LED Digital Signs", "Neon Signs", "Backlit Signs"],
      image: electricSignsImg,
      popular: true
    },
    {
      category: ProductCategory.VEHICLE_TRAILER,
      title: "Vehicle & Trailer",
      featuredSubCategories: ["Vehicle Graphics and Wraps", "Vehicle Decals", "Trailer Graphics"],
      image: vehicleTrailerImg,
      popular: true
    },
    {
      category: ProductCategory.INDOOR_SIGNS,
      title: "Indoor Signs",
      featuredSubCategories: ["Wall Murals", "Lobby Signs", "Floor Graphics"],
      image: indoorSignsImg,
      popular: false
    },
    {
      category: ProductCategory.OUTDOOR_SIGNS,
      title: "Outdoor Signs",
      featuredSubCategories: ["Yard Signs", "Real Estate Signs", "Pylon Signs"],
      image: outdoorSignsImg,
      popular: true
    },
    {
      category: ProductCategory.ACCESSORIES,
      title: "Accessories",
      featuredSubCategories: ["Mounting Hardware", "Display Stands", "Flag Poles"],
      image: accessoriesImg,
      popular: false
    }
  ];

  const customerFavorites = [
    {
      title: "Retractable Banners",
      category: ProductCategory.EXPO_DISPLAY,
      reviews: 3769,
      image: bannersFlagsImg,
      rating: 4.8
    },
    {
      title: "Real Estate Signs",
      category: ProductCategory.OUTDOOR_SIGNS,
      reviews: 4728,
      image: outdoorSignsImg,
      rating: 4.9
    },
    {
      title: "LED Digital Signs",
      category: ProductCategory.ELECTRIC_SIGNS,
      reviews: 2231,
      image: electricSignsImg,
      rating: 4.7
    },
    {
      title: "Vehicle Wraps",
      category: ProductCategory.VEHICLE_TRAILER,
      reviews: 2438,
      image: vehicleTrailerImg,
      rating: 4.9
    },
    {
      title: "Custom Banners",
      category: ProductCategory.BANNERS_FLAGS,
      reviews: 1699,
      image: bannersFlagsImg,
      rating: 4.6
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Products Grid */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex items-center justify-center gap-3 mb-4" variants={fadeInUp}>
            <img src={appLogo} alt="Master Signs" className="h-8 w-auto" />
            <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Our Products</span>
          </motion.div>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-black mb-3"
            variants={fadeInUp}
          >
            Complete Signage Solutions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Professional signage solutions for every business need. Trusted by thousands of customers for over 15 years.
          </motion.p>
        </motion.div>

        {/* All Categories Grid */}
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
                  <h3 className="font-bold text-black mb-3 text-sm">{category.title}</h3>
                  
                  {/* Featured Sub-categories */}
                  <div className="space-y-1 mb-3 flex-1">
                    {category.featuredSubCategories.map((subCategory: string, subIndex: number) => (
                      <div key={subIndex} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 truncate">{subCategory}</span>
                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-1" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Product count */}
                  <div className="text-xs text-blue-600 font-medium mt-auto">
                    {PRODUCT_SUBCATEGORIES[category.category]?.length || 0} products
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Customer Favorites */}
        <motion.div 
          className="mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h3 
            className="text-3xl font-bold text-black text-center mb-12"
            variants={fadeInUp}
          >
            Customer Favorites
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {customerFavorites.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-blue-600 font-medium mb-1">{item.category}</div>
                  <h4 className="font-semibold text-black mb-2 text-sm">{item.title}</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{item.rating}</span>
                    </div>
                    <span className="text-gray-500">({item.reviews.toLocaleString()})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Overview */}
        <motion.div 
          className="bg-gray-50 rounded-3xl p-8 lg:p-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h3 className="text-3xl font-bold text-black mb-4">
              Why Choose Master Signs?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide end-to-end signage solutions with professional design, quality materials, and expert installation.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "Design & Consultation",
                description: "Professional design services with expert consultation",
                icon: "🎨"
              },
              {
                title: "Quality Materials",
                description: "Premium materials built to last in any environment",
                icon: "🏆"
              },
              {
                title: "Expert Installation",
                description: "Professional installation by certified technicians",
                icon: "🔧"
              },
              {
                title: "Fast Turnaround",
                description: "Quick production and delivery times",
                icon: "⚡"
              },
              {
                title: "Warranty & Support",
                description: "Comprehensive warranty and ongoing support",
                icon: "🛡️"
              },
              {
                title: "Local Service",
                description: "Family-owned business serving the community",
                icon: "🏠"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h4 className="font-bold text-black mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button 
              size="lg"
              className="btn-primary bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
              data-testid="button-view-all-products"
            >
              Get Your Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Expert Services Call-out */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-3xl font-bold mb-4">The Experts in Custom Signs</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            For over 15 years, Master Signs has fulfilled custom, affordable signs for thousands of customers. 
            Our mission is to empower you to spread your message with quality craftsmanship and innovative solutions.
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-white/10 backdrop-blur-sm"
            data-testid="button-shop-custom-signs"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}