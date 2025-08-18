import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function TestimonialsSection() {
  // Static testimonials data - no API calls
  const testimonials = [
    {
      id: "1",
      name: "Sarah Mitchell",
      company: "Mitchell & Co. Law",
      content: "Master Signs transformed our office building with stunning LED signage. The quality and professionalism exceeded our expectations. Highly recommend!",
      rating: 5,
      avatar: "SM"
    },
    {
      id: "2", 
      name: "Michael Chen",
      company: "Chen's Restaurant",
      content: "Outstanding work on our vehicle wraps! The team was professional, creative, and delivered exactly what we envisioned. Our fleet looks amazing!",
      rating: 5,
      avatar: "MC"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      company: "Rodriguez Real Estate",
      content: "The laser engraving work on our office plaques is absolutely perfect. Attention to detail and craftsmanship is outstanding. Will definitely use again!",
      rating: 5,
      avatar: "ER"
    },
    {
      id: "4",
      name: "David Thompson",
      company: "Thompson Auto Parts",
      content: "Professional service from start to finish. Our storefront signs look incredible and have significantly increased our visibility. Great team!",
      rating: 5,
      avatar: "DT"
    },
    {
      id: "5",
      name: "Lisa Wang",
      company: "Wang Design Studio",
      content: "Master Signs helped us create a cohesive brand identity with beautiful signage throughout our studio. The quality and creativity are unmatched!",
      rating: 5,
      avatar: "LW"
    },
    {
      id: "6",
      name: "Robert Martinez",
      company: "Martinez Construction",
      content: "Reliable, professional, and exceptional quality. Our construction site safety signs are clear, durable, and perfectly executed. Highly satisfied!",
      rating: 5,
      avatar: "RM"
    }
  ];

  const trustStats = [
    { value: "4.9/5", label: "Average Rating" },
    { value: "150+", label: "5-Star Reviews" },
    { value: "98%", label: "Repeat Clients" }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-[var(--master-blue)] bg-opacity-10 rounded-full px-6 py-3 mb-6"
            variants={fadeInUp}
          >
                                        <MessageSquare className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Client Reviews</span>
          </motion.div>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-[var(--master-black)] mb-6"
            variants={fadeInUp}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Don't just take our word for it. Hear from the businesses we've helped transform their visibility and brand presence.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {testimonials?.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <Card className="glassmorphism rounded-3xl p-8 animate-magnetic h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">{testimonial.rating}.0</span>
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-[var(--master-blue)] text-white font-bold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="font-semibold text-[var(--master-black)]">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="flex justify-center items-center space-x-12 mt-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {trustStats.map((stat, index) => (
            <motion.div key={index} className="text-center" variants={fadeInUp}>
              <div className="text-4xl font-bold text-[var(--master-blue)] mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
