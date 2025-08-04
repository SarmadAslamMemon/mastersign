import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User, Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, magneticHover } from "@/lib/animations";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const mainServices = [
    "LED Digital Signs", "Vehicle Wraps", "Laser Engraving", 
    "Custom Banners", "Architectural Signs", "Installation & Service",
    "Real Estate Signs", "Trade Show Displays", "Window Graphics",
    "ADA Compliant Signs", "Monument Signs", "Channel Letters",
    "Wayfinding Systems", "Safety Signs", "Promotional Products",
    "Menu Boards", "Event Signage", "Magnetic Signs", "Decals & Stickers", "Yard Signs"
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <motion.div 
        className="bg-[var(--master-blue)] text-white py-2 text-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>🎉 Free Quote + Design Consultation - Limited Time!</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-SIGN</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>hello@mastersigns.com</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        className="bg-white shadow-lg sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              {...fadeInUp}
            >
              <div className="w-12 h-12 bg-[var(--master-blue)] rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--master-black)]">Master Signs</h1>
                <p className="text-sm text-[var(--master-blue)]">Make Your Statement</p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input 
                  placeholder="Search for signs, services, or products..."
                  className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-[var(--master-blue)]"
                  data-testid="search-input"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <button 
                className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-[var(--master-blue)] transition-colors"
                data-testid="button-customer-login"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
              
              <motion.div {...magneticHover}>
                <Button 
                  onClick={() => scrollToSection('quote')}
                  className="bg-[var(--master-blue)] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
                  data-testid="button-get-quote"
                >
                  Get Quote
                </Button>
              </motion.div>
              
              <button 
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-gray-50 border-t hidden lg:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-8">
                <div 
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-[var(--master-blue)] font-medium transition-colors">
                    <span>Products</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Mega Menu */}
                  {isServicesOpen && (
                    <motion.div 
                      className="absolute top-full left-0 w-96 bg-white shadow-2xl rounded-lg border mt-2 p-6 z-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {mainServices.map((service, index) => (
                          <button
                            key={index}
                            className="text-left text-sm text-gray-600 hover:text-[var(--master-blue)] py-1 transition-colors"
                            data-testid={`service-${index}`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-700 hover:text-[var(--master-blue)] font-medium transition-colors"
                  data-testid="link-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-[var(--master-blue)] font-medium transition-colors"
                  data-testid="link-about"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="text-gray-700 hover:text-[var(--master-blue)] font-medium transition-colors"
                  data-testid="link-portfolio"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-700 hover:text-[var(--master-blue)] font-medium transition-colors"
                  data-testid="link-testimonials"
                >
                  Reviews
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-[var(--master-blue)] font-medium transition-colors"
                  data-testid="link-contact"
                >
                  Contact
                </button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Need help?</span>
                <div className="flex items-center space-x-2 text-[var(--master-blue)] font-semibold">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-SIGN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden bg-white border-t shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              <div className="relative mb-4">
                <Input 
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-gray-700 hover:text-[var(--master-blue)] font-medium py-2"
                data-testid="mobile-link-services"
              >
                Products & Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-700 hover:text-[var(--master-blue)] font-medium py-2"
                data-testid="mobile-link-about"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left text-gray-700 hover:text-[var(--master-blue)] font-medium py-2"
                data-testid="mobile-link-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-gray-700 hover:text-[var(--master-blue)] font-medium py-2"
                data-testid="mobile-link-testimonials"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-700 hover:text-[var(--master-blue)] font-medium py-2"
                data-testid="mobile-link-contact"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
