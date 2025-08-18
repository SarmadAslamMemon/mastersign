import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ProductCategory } from "@/types/products";
import { useProducts } from "@/hooks/useSupabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Clock, CheckCircle } from "lucide-react";

// Product detail type matching Supabase schema
interface ProductDetailType {
  id: string;
  name: string;
  category: string;
  sub_category: string;
  short_description: string;
  long_description: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
  }>;
  rating: number;
  review_count: number;
  question_count: number;
  features: string[];
  specifications: any;
    pricing: {
    base_price: number;
    currency: string;
    unit: string;
  };
  tags: string[];
  availability: string;
  estimated_delivery: string;
  created_at: string;
  updated_at: string;
}

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const { fetchProductById, loading } = useProducts();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    if (!productId) return;
    
    try {
      const productData = await fetchProductById(productId);
      if (productData) {
        // Transform Supabase data to match ProductDetailType interface
        const transformedProduct: ProductDetailType = {
          id: productData.id,
          name: productData.name,
          category: productData.category,
          sub_category: productData.sub_category,
          short_description: productData.short_description || productData.long_description,
          long_description: productData.long_description || productData.short_description,
          images: (productData.images || []).map((url: string, index: number) => ({
            id: `img-${index}`,
            url: url,
            alt: `${productData.name} - Image ${index + 1}`
          })),
          rating: productData.rating || 4.5,
          review_count: productData.review_count || 0,
          question_count: productData.question_count || 0,
          features: productData.features ? Object.values(productData.features) : ['Professional Grade', 'Custom Design', 'High Quality Materials'],
          specifications: productData.specifications || {},
          pricing: productData.pricing || { base_price: 99.99, currency: 'USD', unit: 'piece' },
          tags: productData.tags || [],
          availability: productData.availability || 'In Stock',
          estimated_delivery: productData.estimated_delivery || '3-5 business days',
          created_at: productData.created_at,
          updated_at: productData.updated_at
        };
        setProduct(transformedProduct);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to load product');
      console.error('Error loading product:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error loading product</p>
              <p>{error || 'Product not found'}</p>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/products" className="text-gray-700 hover:text-blue-600">Products</a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href={`/products?category=${encodeURIComponent(product.category)}`} className="text-gray-700 hover:text-blue-600">
                  {product.category.replace('_', ' ')}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]?.url || '/placeholder-image.jpg'}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'
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
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-blue-600 font-medium">
                  {product.sub_category}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {product.category.replace('_', ' ')}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
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
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>
                
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.pricing.base_price}
                </span>
                <span className="text-gray-500">per {product.pricing.unit}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{product.availability}</span>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery & Support */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Fast Delivery</h4>
                <p className="text-xs text-gray-600">{product.estimated_delivery}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Quality Guaranteed</h4>
                <p className="text-xs text-gray-600">Professional grade materials</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Quick Turnaround</h4>
                <p className="text-xs text-gray-600">Fast production times</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              {product.long_description}
            </p>
          </div>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
} 