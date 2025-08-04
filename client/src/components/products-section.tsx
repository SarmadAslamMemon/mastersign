import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ProductsSection() {
  const mainProducts = [
    {
      id: 1,
      title: "Signs",
      description: "Custom indoor and outdoor signs for any business need",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: true
    },
    {
      id: 2,
      title: "Real Estate Signs",
      description: "Professional yard signs and directional displays",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: false
    },
    {
      id: 3,
      title: "Banners",
      description: "Durable vinyl banners for events and promotions",
      image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: false
    },
    {
      id: 4,
      title: "Retractable Banners",
      description: "Portable trade show and presentation displays",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: true
    },
    {
      id: 5,
      title: "Vehicle Wraps",
      description: "Mobile advertising with professional vehicle graphics",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: false
    },
    {
      id: 6,
      title: "Window Graphics",
      description: "Eye-catching window displays and privacy films",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: false
    },
    {
      id: 7,
      title: "LED Digital Signs",
      description: "Dynamic electronic displays for maximum impact",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: true
    },
    {
      id: 8,
      title: "Monument Signs",
      description: "Impressive entrance signs for businesses and communities",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      popular: false
    }
  ];

  const customerFavorites = [
    {
      title: "Retractable Banners",
      reviews: 3769,
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      rating: 4.8
    },
    {
      title: "Real Estate Signs",
      reviews: 4728,
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      rating: 4.9
    },
    {
      title: "LED Digital Signs",
      reviews: 2231,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      rating: 4.7
    },
    {
      title: "Vehicle Wraps",
      reviews: 2438,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      rating: 4.9
    },
    {
      title: "Custom Banners",
      reviews: 1699,
      image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
      rating: 4.6
    }
  ];

  const businessProducts = [
    {
      title: "Menu Boards",
      description: "Digital and traditional menu display solutions",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      title: "Safety Signs",
      description: "OSHA compliant workplace safety signage",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      title: "Trade Show Displays",
      description: "Professional booth graphics and displays",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      title: "Wayfinding Systems",
      description: "Complete directional signage solutions",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      title: "Channel Letters",
      description: "Illuminated dimensional building signage",
      image: "https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      title: "ADA Signs",
      description: "Compliant accessibility and room identification",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
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
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-[var(--master-black)] mb-6"
            variants={fadeInUp}
          >
            Custom Signs for Every Need
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Fast. Reliable. Built to Last. Trusted by thousands of customers for over 15 years.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {mainProducts.map((product) => (
            <motion.div 
              key={product.id}
              className="group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {product.popular && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[var(--master-black)] mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
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
            className="text-3xl font-bold text-[var(--master-black)] text-center mb-12"
            variants={fadeInUp}
          >
            Our Customer Favorites
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {customerFavorites.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-[var(--master-black)] mb-2">{item.title}</h4>
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

        {/* Business Growth Products */}
        <motion.div 
          className="bg-gray-50 rounded-3xl p-8 lg:p-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h3 className="text-3xl font-bold text-[var(--master-black)] mb-4">
              Products Designed to Grow Your Business
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional signage solutions that drive customer engagement and business success.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {businessProducts.map((product, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-[var(--master-black)] mb-2">{product.title}</h4>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-[var(--master-blue)] group-hover:text-white transition-colors"
                    data-testid={`product-${index}`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button 
              size="lg"
              className="bg-[var(--master-blue)] text-white hover:bg-blue-700 px-8 py-3"
              data-testid="button-view-all-products"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Expert Services Call-out */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-[var(--master-blue)] to-blue-600 rounded-3xl p-8 lg:p-12 text-white"
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
            className="border-2 border-white text-white hover:bg-white hover:text-[var(--master-blue)] px-8 py-3"
            data-testid="button-shop-custom-signs"
          >
            Shop Custom Signs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}