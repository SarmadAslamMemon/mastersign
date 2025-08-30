import { useState, useEffect, useCallback } from 'react';
import { 
  getProductsFunction,
  getProductByIdFunction,
  searchProductsFunction,
  getProductsByCategoryFunction,
  getCategoriesFunction,
  getCategoryByIdFunction,
  getSubCategoriesFunction,
  getCategoryWithSubCategoriesFunction,
  getAllCategoriesWithSubCategoriesFunction
} from '@/lib/firebase';
import { ProductCategory, Product, CategoryData } from '@/types/products';

// Products hook
export function useFirebaseProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductsFunction({});
      const response = result.data as any;
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (category: ProductCategory) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductsByCategoryFunction({ category });
      const response = result.data as any;
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products by category');
      }
    } catch (err) {
      console.error('Error fetching products by category:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductByIdFunction({ productId: id });
      const response = result.data as any;
      
      if (response.success) {
        return response.data;
      } else {
        setError('Failed to fetch product');
        return null;
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await searchProductsFunction({ query });
      const response = result.data as any;
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to search products');
      }
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to search products');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductById,
    searchProducts,
    refetch: fetchProducts
  };
}

// Categories hook
export function useFirebaseCategories() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategoriesFunction({});
      const response = result.data as any;
      
      if (response.success) {
        setCategories(response.data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategoryById = useCallback(async (categoryId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategoryByIdFunction({ categoryId });
      const response = result.data as any;
      
      if (response.success) {
        return response.data;
      } else {
        setError('Failed to fetch category');
        return null;
      }
    } catch (err) {
      console.error('Error fetching category:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch category');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubCategories = useCallback(async (categoryId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSubCategoriesFunction({ categoryId });
      const response = result.data as any;
      
      if (response.success) {
        return response.data;
      } else {
        setError('Failed to fetch sub-categories');
        return [];
      }
    } catch (err) {
      console.error('Error fetching sub-categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sub-categories');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategoryWithSubCategories = useCallback(async (categoryId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategoryWithSubCategoriesFunction({ categoryId });
      const response = result.data as any;
      
      if (response.success) {
        return response.data;
      } else {
        setError('Failed to fetch category with sub-categories');
        return null;
      }
    } catch (err) {
      console.error('Error fetching category with sub-categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch category with sub-categories');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllCategoriesWithSubCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllCategoriesWithSubCategoriesFunction({});
      const response = result.data as any;
      
      if (response.success) {
        setCategories(response.data);
      } else {
        setError('Failed to fetch categories with sub-categories');
      }
    } catch (err) {
      console.error('Error fetching categories with sub-categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories with sub-categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategoryById,
    fetchSubCategories,
    fetchCategoryWithSubCategories,
    fetchAllCategoriesWithSubCategories
  };
}

// Individual product hook
export function useFirebaseProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await getProductByIdFunction({ productId });
      const response = result.data as any;
      
      if (response.success) {
        setProduct(response.data);
      } else {
        setError('Failed to fetch product');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct
  };
}
