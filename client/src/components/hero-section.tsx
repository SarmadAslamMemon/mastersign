import { motion } from "framer-motion";
import { ArrowRight, Play, Star, CheckCircle, Zap, Car, Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, magneticHover } from "@/lib/animations";

export default function HeroSection() {
  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[var(--master-blue)] via-blue-600 to-blue-800 min-h-screen flex items-center pt-32">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--master-blue)] bg-opacity-90"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-white"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6"
              variants={fadeInUp}
            >
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">Top-Rated Custom Signs Near You</span>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
            >
              You have a <span className="text-yellow-400">vision</span>,<br />
              we're here to help!
            </motion.h1>

            <motion.p 
              className="text-xl text-blue-100 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              Your business deserves to be seen. At Master Signs, we provide custom sign and visual 
              solutions that handle all your business needs - from content development to graphic design 
              and project management.
            </motion.p>

            {/* Key Benefits */}
            <motion.div className="space-y-3 mb-8" variants={staggerContainer}>
              {[
                "Faith-driven, family-owned excellence",
                "15+ years of proven expertise",
                "Complete design to installation service",
                "Local community focus with professional results"
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  variants={fadeInUp}
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={staggerContainer}
            >
              <motion.div variants={magneticHover}>
                <Button 
                  onClick={scrollToQuote}
                  size="lg"
                  className="bg-yellow-400 text-[var(--master-blue)] hover:bg-yellow-300 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  data-testid="button-hero-quote"
                >
                  Get Your Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div variants={magneticHover}>
                <Button 
                  onClick={scrollToServices}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[var(--master-blue)] font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300"
                  data-testid="button-hero-services"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Our Products
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional business woman in modern office with custom signage"
                className="w-full h-auto"
              />
              
              {/* Floating Stats Card */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--master-blue)]">500+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--master-blue)]">4.9★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Services Preview Bar */}
        <motion.div 
          className="mt-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-white text-lg font-semibold mb-2">Complete Signage Solutions</h3>
            <p className="text-blue-100 text-sm">From concept to installation, we deliver results</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: "LED Digital Signs", desc: "Eye-catching displays" },
              { icon: Car, label: "Vehicle Wraps", desc: "Mobile advertising" },
              { icon: Settings, label: "Laser Engraving", desc: "Precision crafting" },
              { icon: Palette, label: "Custom Design", desc: "Creative solutions" }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-opacity-30 transition-all duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-medium text-sm">{service.label}</div>
                <div className="text-blue-200 text-xs">{service.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
