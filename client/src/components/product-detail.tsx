import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Heart,
  Share2,
  MessageCircle,
  Truck,
  Shield,
  Palette,
  Settings,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ProductDetail as ProductDetailType, ProductSpecification } from "@/types/products";

interface ProductDetailProps {
  product: ProductDetailType;
}

export default function ProductDetailComponent({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSpecs, setExpandedSpecs] = useState<string[]>([]);
  const [specValues, setSpecValues] = useState<Record<string, string>>({});

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleSpecExpansion = (specId: string) => {
    setExpandedSpecs(prev => 
      prev.includes(specId) 
        ? prev.filter(id => id !== specId)
        : [...prev, specId]
    );
  };

  const handleSpecChange = (specId: string, value: string) => {
    setSpecValues(prev => ({
      ...prev,
      [specId]: value
    }));
  };

  const calculatePrice = () => {
    const basePrice = product.pricing.basePrice;
    const discount = product.pricing.discountPercentage || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    return {
      original: basePrice,
      discounted: discountedPrice,
      final: discountedPrice * quantity
    };
  };

  const price = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div 
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            <a href={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-600">
              {product.category}
            </a>
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Left Side - Image Gallery */}
          <motion.div variants={fadeInUp}>
            {/* Main Image */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg mb-6">
              <img 
                src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white text-gray-700"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white text-gray-700"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleImageChange(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex 
                      ? 'border-blue-600 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Product Description */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-md mt-8"
              variants={fadeInUp}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
              <div className="prose prose-sm text-gray-600">
                <p className="leading-relaxed">{product.longDescription}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* Product Title & Rating */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Questions & Answers ({product.questionCount})
                  </button>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {product.specifications.map((spec) => (
                    <div key={spec.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSpecExpansion(spec.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{spec.name}</span>
                        {expandedSpecs.includes(spec.id) ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      
                      {expandedSpecs.includes(spec.id) && (
                        <div className="px-4 pb-4">
                          {spec.type === 'select' ? (
                            <select
                              value={specValues[spec.id] || spec.options?.[0] || ''}
                              onChange={(e) => handleSpecChange(spec.id, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {spec.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : spec.type === 'number' ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={specValues[spec.id] || ''}
                                onChange={(e) => handleSpecChange(spec.id, e.target.value)}
                                placeholder={spec.name}
                                min={spec.min}
                                max={spec.max}
                                step={spec.step}
                                className="flex-1"
                              />
                              {spec.unit && <span className="text-gray-500">{spec.unit}</span>}
                            </div>
                          ) : (
                            <Input
                              type="text"
                              value={specValues[spec.id] || ''}
                              onChange={(e) => handleSpecChange(spec.id, e.target.value)}
                              placeholder={spec.name}
                              className="w-full"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-blue-600 mt-1">Buy More, Save More!</p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    ${price.final.toFixed(2)}
                  </span>
                  {product.pricing.discountPercentage && (
                    <span className="text-lg text-gray-500 line-through">
                      ${price.original.toFixed(2)}
                    </span>
                  )}
                  {product.pricing.discountPercentage && (
                    <span className="text-sm text-green-600 font-medium">
                      {product.pricing.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Price per unit: ${price.discounted.toFixed(2)}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.location.href = '/editor'}
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Design Custom {product.name}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => window.location.href = '/editor'}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Get Started with This One
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Warranty Included</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 