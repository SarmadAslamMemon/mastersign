import { DUMMY_PRODUCTS, CATEGORY_DATA, ProductCategory, Product, CategoryData } from './dummy-products';

export interface StaticProductsService {
  getAllProducts(): Product[];
  getProductsByCategory(category: ProductCategory): Product[];
  getProductsBySubCategory(category: ProductCategory, subCategory: string): Product[];
  getProductById(id: string): Product | undefined;
  searchProducts(query: string): Product[];
  getFeaturedProducts(): Product[];
  getCategories(): CategoryData[];
  getCategoryById(category: ProductCategory): CategoryData | undefined;
}

class LocalProductsService implements StaticProductsService {
  getAllProducts(): Product[] {
    return [...DUMMY_PRODUCTS];
  }

  getProductsByCategory(category: ProductCategory): Product[] {
    return DUMMY_PRODUCTS.filter(product => product.category === category);
  }

  getProductsBySubCategory(category: ProductCategory, subCategory: string): Product[] {
    return DUMMY_PRODUCTS.filter(product => 
      product.category === category && product.subCategory === subCategory
    );
  }

  getProductById(id: string): Product | undefined {
    return DUMMY_PRODUCTS.find(product => product.id === id);
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return DUMMY_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.subCategory.toLowerCase().includes(lowerQuery)
    );
  }

  getFeaturedProducts(): Product[] {
    return DUMMY_PRODUCTS.filter(product => 
      product.tags.includes('featured') || 
      product.rating >= 4.8
    );
  }

  getCategories(): CategoryData[] {
    return [...CATEGORY_DATA];
  }

  getCategoryById(category: ProductCategory): CategoryData | undefined {
    return CATEGORY_DATA.find(cat => cat.id === category);
  }
}

// Export singleton instance
export const staticProductsService = new LocalProductsService();

// Export individual functions for convenience
export const {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubCategory,
  getProductById,
  searchProducts,
  getFeaturedProducts,
  getCategories,
  getCategoryById
} = staticProductsService;
