import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function PortfolioSection() {
  const portfolioItems = [
    {
      id: 1,
      title: "Apartment & Campus Signage",
      description: "Complete wayfinding system for luxury apartment complex with ADA-compliant directories and building identification.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Real Estate",
      tags: ["LED Signs", "Wayfinding", "ADA Compliant"]
    },
    {
      id: 2,
      title: "Restaurant Chain Rebrand",
      description: "Full exterior and interior signage package including illuminated channel letters, menu boards, and promotional displays.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Restaurant",
      tags: ["Channel Letters", "Menu Boards", "Interior Signs"]
    },
    {
      id: 3,
      title: "Medical Center Directory",
      description: "Digital directory system with touch-screen navigation and integrated appointment scheduling for busy medical facility.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Healthcare",
      tags: ["Digital Displays", "Interactive", "Healthcare"]
    },
    {
      id: 4,
      title: "Automotive Dealership",
      description: "Monument sign with LED lighting, vehicle wraps for sales team, and indoor promotional displays.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Automotive",
      tags: ["Monument Signs", "Vehicle Wraps", "LED Lighting"]
    },
    {
      id: 5,
      title: "Construction Site Safety",
      description: "Comprehensive safety signage system including OSHA-compliant warning signs and project identification banners.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Construction",
      tags: ["Safety Signs", "Banners", "OSHA Compliant"]
    },
    {
      id: 6,
      title: "Banking Branch Identity",
      description: "Complete corporate identity package including exterior monument sign, interior graphics, and ATM wraps.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Financial",
      tags: ["Corporate Identity", "Monument Signs", "Interior Graphics"]
    }
  ];

  const industries = [
    "Apartment & Campus", "Automotive", "Banking & Financial", "Construction",
    "Education", "Event & Convention", "Healthcare", "Hotel & Hospitality",
    "Manufacturing", "Religious Organizations", "Restaurants", "Retail & Sales"
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Discover the Power of Comprehensive Visual Solutions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Our customers trust us because we provide cutting-edge products and services. 
            Browse our case studies to see how Master Signs has helped businesses in all industries.
          </motion.p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {portfolioItems.map((item) => (
            <motion.div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--master-blue)] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--master-black)] mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-[var(--master-blue)] px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-[var(--master-blue)] group-hover:text-white transition-colors"
                  data-testid={`portfolio-item-${item.id}`}
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industries We Serve */}
        <motion.div 
          className="bg-white rounded-3xl p-8 lg:p-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h3 className="text-3xl font-bold text-[var(--master-black)] mb-4">
              Signage Solutions by Industry
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've helped businesses across every major industry with their visual communication needs.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
          >
            {industries.map((industry, index) => (
              <motion.button
                key={index}
                className="bg-gray-50 hover:bg-[var(--master-blue)] hover:text-white p-4 rounded-xl text-center transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                data-testid={`industry-${index}`}
              >
                <div className="font-medium text-sm">{industry}</div>
                <ArrowRight className="h-4 w-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button 
              size="lg"
              className="btn-primary bg-[var(--master-blue)] text-white hover:bg-blue-700 px-8 py-3"
              data-testid="button-view-all-cases"
            >
              Read All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Customer Success Quote */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-[var(--master-blue)] to-blue-600 rounded-3xl p-8 lg:p-12 text-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl lg:text-3xl font-bold mb-6 italic">
            "Brainstorming with Master Signs really helped in the process of getting where we are today."
          </blockquote>
          <cite className="text-blue-100">- Business Owner, Local Restaurant Chain</cite>
        </motion.div>
      </div>
    </section>
  );
}