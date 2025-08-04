import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Star, Facebook, Instagram, Linkedin, Youtube, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Footer() {
  const services = [
    "LED Digital Signs",
    "Vehicle Wraps", 
    "Laser Engraving",
    "Custom Banners",
    "Architectural Signs",
    "Installation & Service"
  ];

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Portfolio", href: "#services" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Job Opportunities", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[var(--master-black)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Company Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[var(--master-blue)] rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Master Signs</h3>
                <p className="text-gray-400">Faith-Driven Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for professional signage solutions. From LED displays to vehicle wraps, 
              we bring your vision to life with faith-driven excellence and innovative technology.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[var(--master-blue)]" />
                <span>(555) 123-SIGN</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[var(--master-blue)]" />
                <span>hello@mastersigns.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[var(--master-blue)]" />
                <span>123 Business District, Your City, State 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3 text-gray-300">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    className="hover:text-[var(--master-blue)] transition-colors text-left"
                    data-testid={`footer-service-${index}`}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-300">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-[var(--master-blue)] transition-colors text-left"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Media & Legal */}
        <motion.div 
          className="border-t border-gray-800 pt-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 bg-gray-800 rounded-xl hover:bg-[var(--master-blue)] transition-colors"
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span>&copy; 2024 Master Signs. All rights reserved.</span>
              <button 
                className="hover:text-[var(--master-blue)] transition-colors"
                data-testid="footer-privacy"
              >
                Privacy Policy
              </button>
              <button 
                className="hover:text-[var(--master-blue)] transition-colors"
                data-testid="footer-terms"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          size="icon"
          className="w-16 h-16 bg-[var(--master-blue)] rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 animate-glow"
          data-testid="button-floating-chat"
        >
          <MessageSquare className="h-8 w-8 text-white" />
        </Button>
      </motion.div>
    </footer>
  );
}
