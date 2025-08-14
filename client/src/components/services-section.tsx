import { motion } from "framer-motion";
import { Star, Zap, Car, Settings, Flag, Building, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, magneticHover } from "@/lib/animations";

import { getImageUrl } from "@/lib/image-utils";

const services = [
  {
    icon: Zap,
    title: "LED Digital Signs",
    subtitle: "High-Impact Displays",
    description: "Eye-catching LED displays that attract customers 24/7. From outdoor billboards to indoor screens, our digital solutions deliver dynamic content that drives engagement and sales.",
    tags: ["Outdoor LED", "Indoor Displays", "Interactive Kiosks"],
    image: getImageUrl("Channel Letters/24330.jpeg")
  },
  {
    icon: Car,
    title: "Vehicle Wraps",
    subtitle: "Mobile Advertising",
    description: "Transform your vehicles into powerful marketing tools. Our premium wraps combine durability with stunning graphics that generate thousands of impressions daily.",
    tags: ["Full Wraps", "Partial Graphics", "Fleet Branding"],
    image: getImageUrl("Vehicle Graphics/20240309_133150.jpg")
  },
  {
    icon: Settings,
    title: "Laser Engraving",
    subtitle: "Precision Crafting",
    description: "Precision laser engraving for awards, plaques, architectural signage, and custom products. Create lasting impressions with intricate detail and professional finish.",
    tags: ["Awards", "Plaques", "Architectural"],
    image: getImageUrl("Laser Engraving/fish.jpg")
  },
  {
    icon: Flag,
    title: "Custom Banners",
    subtitle: "Event & Promotion",
    description: "High-quality vinyl banners perfect for events, promotions, and temporary advertising. Weather-resistant materials ensure your message stays vibrant indoors and outdoors.",
    tags: ["Vinyl Banners", "Mesh Banners", "Fabric Displays"],
    image: getImageUrl("Banners/MAIN - Banner.jpg")
  },
  {
    icon: Building,
    title: "Architectural Signs",
    subtitle: "Building Identity",
    description: "Sophisticated architectural signage that integrates seamlessly with your building design. From lobby displays to exterior monuments, we create lasting brand impressions.",
    tags: ["Monument Signs", "Lobby Displays", "Wayfinding"],
    image: getImageUrl("Business Signage/Performance.jpg")
  },
  {
    icon: Wrench,
    title: "Installation & Service",
    subtitle: "Complete Support",
    description: "Professional installation and ongoing maintenance services ensure your signs perform at their best. Our certified technicians handle everything from permits to long-term care.",
    tags: ["Installation", "Maintenance", "Permits"],
    image: getImageUrl("Fabricated Signs/20230616_154312.jpg")
  },
  {
    icon: Settings,
    title: "Design Your Own",
    subtitle: "Interactive Editor",
    description: "Use our professional design tool to create custom signs exactly how you want them. Add text, shapes, images, and more with our easy-to-use online editor.",
    tags: ["Custom Design", "Online Tool", "Real-time Preview"],
    image: getImageUrl("Banners/MAIN - Banner.jpg")
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-blue-600 bg-opacity-10 rounded-full px-6 py-3 mb-6"
            variants={fadeInUp}
          >
            <Star className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Our Services</span>
          </motion.div>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-black mb-6"
            variants={fadeInUp}
          >
            Professional Signage Services
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            From concept to installation, we deliver exceptional signage that drives results and builds your brand presence.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="glassmorphism rounded-3xl p-8 animate-magnetic group h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-2xl w-full h-48 object-cover mb-6"
                  />
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                      <p className="text-blue-600 font-semibold">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {service.title === "Design Your Own" ? (
                    <Button 
                      asChild
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                      data-testid={`button-service-${index}`}
                    >
                      <a href="/products">
                        Start Designing
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                      data-testid={`button-service-${index}`}
                    >
                      Learn More
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
