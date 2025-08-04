import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User, HelpCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, magneticHover } from "@/lib/animations";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav 
        className="fixed top-0 w-full z-50 glassmorphism-dark py-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[var(--master-blue)]" />
                <span>(555) 123-SIGN</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[var(--master-blue)]" />
                <span>hello@mastersigns.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[var(--master-blue)]" />
                <span>Downtown Business District</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="text-white hover:text-[var(--master-blue)] transition-colors flex items-center space-x-1"
                data-testid="button-customer-login"
              >
                <User className="h-4 w-4" />
                <span>Customer Login</span>
              </button>
              <button 
                className="text-white hover:text-[var(--master-blue)] transition-colors flex items-center space-x-1"
                data-testid="button-help-center"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help Center</span>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Navigation */}
      <motion.nav 
        className="fixed top-10 w-full z-40 glassmorphism py-4 mt-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
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
                <p className="text-sm text-gray-600">Faith-Driven Excellence</p>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="link-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="link-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="link-testimonials"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="link-contact"
              >
                Contact
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <motion.div {...magneticHover}>
                <Button 
                  onClick={() => scrollToSection('quote')}
                  className="ripple bg-[var(--master-blue)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 animate-glow"
                  data-testid="button-get-quote"
                >
                  Get Free Quote
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden glassmorphism mt-4 mx-4 rounded-2xl p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="mobile-link-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="mobile-link-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
                data-testid="mobile-link-testimonials"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-[var(--master-black)] hover:text-[var(--master-blue)] transition-colors font-medium"
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
