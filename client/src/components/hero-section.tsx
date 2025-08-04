import { motion } from "framer-motion";
import { MapPin, Zap, Car, Settings, Palette, Quote, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, magneticHover, floatingAnimation, glowAnimation } from "@/lib/animations";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-20 h-20 bg-white bg-opacity-10 rounded-full"
        {...floatingAnimation}
      />
      <motion.div 
        className="absolute top-40 right-32 w-16 h-16 bg-[var(--master-blue)] bg-opacity-20 rounded-xl"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 180, 360],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-white bg-opacity-15 rounded-lg"
        animate={{
          y: [-15, 15, -15],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Location Badge */}
          <motion.div 
            className="inline-flex items-center space-x-2 glassmorphism rounded-full px-6 py-3 mb-8"
            variants={fadeInUp}
          >
            <MapPin className="h-5 w-5 text-[var(--master-blue)]" />
            <span className="text-white font-medium">Proudly Serving Downtown & Surrounding Areas</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            Transform Your <span className="text-[var(--master-blue)]">Vision</span><br />
            Into Powerful <span className="text-[var(--master-blue)]">Signs</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Faith-driven, family-owned signage experts delivering innovative LED displays, 
            premium vehicle wraps, precision laser engraving, and custom solutions that make your business stand out.
          </motion.p>

          {/* Feature Icons */}
          <motion.div 
            className="flex justify-center items-center space-x-8 mb-12"
            variants={staggerContainer}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 glassmorphism rounded-2xl flex items-center justify-center mb-2 mx-auto">
                <Zap className="h-8 w-8 text-[var(--master-blue)]" />
              </div>
              <span className="text-white text-sm">LED Signs</span>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 glassmorphism rounded-2xl flex items-center justify-center mb-2 mx-auto">
                <Car className="h-8 w-8 text-[var(--master-blue)]" />
              </div>
              <span className="text-white text-sm">Vehicle Wraps</span>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 glassmorphism rounded-2xl flex items-center justify-center mb-2 mx-auto">
                <Settings className="h-8 w-8 text-[var(--master-blue)]" />
              </div>
              <span className="text-white text-sm">Laser Engraving</span>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 glassmorphism rounded-2xl flex items-center justify-center mb-2 mx-auto">
                <Palette className="h-8 w-8 text-[var(--master-blue)]" />
              </div>
              <span className="text-white text-sm">Custom Design</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={staggerContainer}
          >
            <motion.div variants={magneticHover}>
              <Button 
                onClick={scrollToQuote}
                className="ripple bg-[var(--master-blue)] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                data-testid="button-hero-quote"
              >
                <Quote className="h-5 w-5 mr-2" />
                Get Your Free Quote
              </Button>
            </motion.div>
            <motion.div variants={magneticHover}>
              <Button 
                onClick={scrollToServices}
                variant="outline"
                className="ripple glassmorphism text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 border-white border-opacity-30"
                data-testid="button-hero-services"
              >
                <Play className="h-5 w-5 mr-2" />
                See Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex justify-center items-center space-x-8 mt-12 text-white"
            variants={staggerContainer}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold text-[var(--master-blue)]">15+</div>
              <div className="text-sm">Years Experience</div>
            </motion.div>
            <div className="w-px h-12 bg-white bg-opacity-30"></div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold text-[var(--master-blue)]">500+</div>
              <div className="text-sm">Happy Clients</div>
            </motion.div>
            <div className="w-px h-12 bg-white bg-opacity-30"></div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-3xl font-bold text-[var(--master-blue)]">24/7</div>
              <div className="text-sm">Support</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
