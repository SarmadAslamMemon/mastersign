import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ProductCategory } from "@/types/products";
import { getImageUrl } from "@/lib/image-utils";
import { useFirebaseCategories } from "@/hooks/useFirebaseData";

export default function ProductsSection() {
  const { categories, loading: categoriesLoading } = useFirebaseCategories();

  // Use categories from Firebase instead of hardcoded data
  const allCategories = categories.map(cat => ({
    category: cat.categoryId,
    title: cat.name,
    featuredSubCategories: cat.featuredSubCategories || [],
    image: cat.image || '/images/placeholder-category.jpg',
    popular: cat.popular || false
  }));

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
          {categoriesLoading ? (
            // Loading skeleton
            Array.from({ length: 10 }).map((_, index) => (
              <motion.div 
                key={`skeleton-${index}`}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-full"
                variants={fadeInUp}
              >
                <div className="animate-pulse">
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            allCategories.map((category, index) => (
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
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )))}
        </motion.div>



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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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
            
            {/* Start Designing CTA */}
            <div className="border-t border-white/20 pt-6">
              <p className="text-blue-100 mb-4">
                Or create your own custom design with our professional tools
              </p>
              <a 
                href="https://animated-cheesecake-a81f47.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors font-semibold"
              >
                <span>🎨</span>
                <span>Start Designing Your Own Template</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}