import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ProductDetailComponent from "@/components/product-detail";
import { ProductDetail } from "@/types/products";
import { sampleProduct } from "@/data/sample-product";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      
      // For now, we'll use the sample product to test the enhanced features
      // Later, you can replace this with actual Firebase data fetching
      if (productId === "sample-sign-001") {
        setProduct(sampleProduct);
      } else {
        // TODO: Replace with actual Firebase product fetching
        // const productData = await fetchProductFromFirebase(productId);
        // setProduct(productData);
        
        // For now, show sample product for any ID to test the component
        setProduct(sampleProduct);
      }
    } catch (err) {
      setError('Failed to load product');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
            <p className="text-gray-600 mb-4">Unable to load the requested product.</p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-gray-600 text-xl mb-4">Product not found</div>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProductDetailComponent product={product} />
      <Footer />
    </div>
  );
} 