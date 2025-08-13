import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Quote, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertQuoteRequestSchema } from "@shared/schema";
import { fadeInUp, staggerContainer, magneticHover } from "@/lib/animations";

const formSchema = insertQuoteRequestSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  serviceType: z.string().min(1, "Please select a service type"),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "",
      timeline: "",
      budget: "",
      description: "",
      files: [],
    },
  });

  const createQuoteMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/quote-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll respond within 24 hours with your personalized quote.",
      });
      form.reset();
      setUploadedFiles([]);
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
      console.error("Quote submission error:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    createQuoteMutation.mutate(data);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="quote" className="py-24 bg-[var(--master-black)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-[var(--master-blue)] bg-opacity-20 rounded-full px-6 py-3 mb-6"
            variants={fadeInUp}
          >
                                        <Quote className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Free Quote</span>
          </motion.div>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Ready to Transform Your Vision?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Get a personalized quote for your signage project. Our team will work with you to bring your vision to life.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="glassmorphism-dark rounded-3xl p-8">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold">Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="John Smith"
                              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--master-blue)]"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold">Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="email"
                              placeholder="john@company.com"
                              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--master-blue)]"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              value={field.value ?? ""}
                              type="tel"
                              placeholder="(555) 123-4567"
                              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--master-blue)]"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold">Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Your Company"
                              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--master-blue)]"
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Project Details */}
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold">Service Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white focus:ring-2 focus:ring-[var(--master-blue)]"
                              data-testid="select-service-type"
                            >
                              <SelectValue placeholder="Select a service..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="led-signs">LED Digital Signs</SelectItem>
                            <SelectItem value="vehicle-wraps">Vehicle Wraps</SelectItem>
                            <SelectItem value="laser-engraving">Laser Engraving</SelectItem>
                            <SelectItem value="banners">Custom Banners</SelectItem>
                            <SelectItem value="architectural">Architectural Signage</SelectItem>
                            <SelectItem value="other">Other / Multiple Services</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold">Project Timeline</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                            <FormControl>
                              <SelectTrigger 
                                className="bg-white bg-opacity-10 border-white border-opacity-20 text-white focus:ring-2 focus:ring-[var(--master-blue)]"
                                data-testid="select-timeline"
                              >
                                <SelectValue placeholder="Select timeline..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                              <SelectItem value="1month">1 month</SelectItem>
                              <SelectItem value="2-3months">2-3 months</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold">Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                            <FormControl>
                              <SelectTrigger 
                                className="bg-white bg-opacity-10 border-white border-opacity-20 text-white focus:ring-2 focus:ring-[var(--master-blue)]"
                                data-testid="select-budget"
                              >
                                <SelectValue placeholder="Select budget..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-1k">Under $1,000</SelectItem>
                              <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                              <SelectItem value="over-25k">Over $25,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold">Project Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            value={field.value ?? ""}
                            rows={4}
                            placeholder="Tell us about your project requirements, size, location, and any specific needs..."
                            className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[var(--master-blue)] resize-none"
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* File Upload */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Upload Files (Optional)</label>
                    <div className="border-2 border-dashed border-white border-opacity-30 rounded-xl p-8 text-center hover:border-[var(--master-blue)] hover:border-opacity-50 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white mb-2">Drag and drop files here or click to browse</p>
                      <p className="text-gray-400 text-sm mb-4">Supported formats: JPG, PNG, PDF, AI, EPS (Max 10MB each)</p>
                      <input 
                        type="file" 
                        multiple 
                        accept=".jpg,.jpeg,.png,.pdf,.ai,.eps"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        data-testid="input-file-upload"
                      />
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10"
                      >
                        Choose Files
                      </Button>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
                            <span className="text-white text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <motion.div {...magneticHover}>
                      <Button 
                        type="submit"
                        disabled={createQuoteMutation.isPending}
                        className="ripple bg-[var(--master-blue)] text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        data-testid="button-submit-quote"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        {createQuoteMutation.isPending ? "Sending..." : "Send My Quote Request"}
                      </Button>
                    </motion.div>
                    <p className="text-gray-400 text-sm mt-4">We'll respond within 24 hours with your personalized quote</p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
