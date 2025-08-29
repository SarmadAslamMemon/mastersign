import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQsSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: "materials",
      question: "What materials do you use for signs?",
      answer: "We use a wide variety of high-quality materials including vinyl, acrylic, aluminum, LED components, and premium substrates. Our material selection depends on the specific application, environment, and durability requirements. We always recommend the best materials for your specific needs to ensure longevity and visual impact.",
      category: "Materials"
    },
    {
      id: "custom-quote",
      question: "Can I get a custom quote for my project?",
      answer: "Absolutely! We provide custom quotes for all projects. Simply contact us with your project details, specifications, and requirements, and our team will provide you with a detailed, personalized quote. We take into account materials, size, complexity, installation requirements, and any special features you need.",
      category: "Pricing"
    },
    {
      id: "services",
      question: "What services does Master Signs offer?",
      answer: "We offer a comprehensive range of signage and promotional services including LED digital signs, vehicle wraps, laser engraving, custom banners, architectural signs, indoor/outdoor signage, promotional products, privacy films, and installation services. Our expertise covers everything from small business signs to large-scale commercial projects.",
      category: "Services"
    },
    {
      id: "timeline",
      question: "How long does it take to complete an order?",
      answer: "Production timelines vary based on project complexity and current workload. Simple projects like banners or decals typically take 3-5 business days, while complex projects like vehicle wraps or LED signs may take 1-2 weeks. We always provide specific timelines during the quoting process and keep you updated throughout production.",
      category: "Timeline"
    },
    {
      id: "design-assistance",
      question: "Do you offer design assistance?",
      answer: "Yes! Our experienced design team provides comprehensive design assistance. We can create custom designs from scratch, modify existing artwork, or provide design consultation. Our designers work closely with you to ensure your vision is perfectly executed, whether you have a complete concept or just a basic idea.",
      category: "Design"
    },
    {
      id: "installation",
      question: "Do you provide installation services?",
      answer: "Yes, we offer professional installation services for all our signage products. Our certified installers have years of experience and are equipped to handle installations of any size or complexity. We ensure proper installation that meets safety standards and manufacturer warranties.",
      category: "Services"
    },
    {
      id: "warranty",
      question: "What warranty do you provide?",
      answer: "We stand behind our work with comprehensive warranties. Our products come with manufacturer warranties, and we provide additional workmanship warranties. Specific warranty terms depend on the product and installation type. We're committed to your satisfaction and will address any issues promptly.",
      category: "Support"
    },
    {
      id: "payment",
      question: "What payment options do you accept?",
      answer: "We accept all major credit cards, bank transfers, and cash payments. For larger projects, we offer flexible payment terms including deposits and milestone payments. We're happy to work with you to find a payment solution that fits your budget and project timeline.",
      category: "Pricing"
    }
  ];

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <section id="faqs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about our services, materials, and processes
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Contact Us
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Request Quote
              </button>
            </div>
            
            {/* Start Designing CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-[var(--master-blue)] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">
                Ready to Start Designing?
              </h3>
              <p className="text-blue-100 mb-4">
                Create your own professional signage with our easy-to-use design tools
              </p>
              <a 
                href="https://animated-cheesecake-a81f47.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                <span>🎨</span>
                <span>Start Designing Your Own Template</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 