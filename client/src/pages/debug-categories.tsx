import React from 'react';
import { ProductCategory } from '@/types/products';
import { DUMMY_PRODUCTS, getProductsByCategory } from '@/data/dummy-products';

export default function DebugCategoriesPage() {
  console.log('🔍 Debug Categories Page Loaded');
  console.log('🔍 All Products:', DUMMY_PRODUCTS);
  console.log('🔍 Product Categories:', [...new Set(DUMMY_PRODUCTS.map(p => p.category))]);
  console.log('🔍 Enum Values:', Object.values(ProductCategory));
  
  // Test each category
  Object.values(ProductCategory).forEach(category => {
    const products = getProductsByCategory(category);
    console.log(`🔍 Category: ${category} - Found ${products.length} products`);
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Category Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">All Available Products</h2>
          <p>Total Products: {DUMMY_PRODUCTS.length}</p>
          <p>Available Categories: {[...new Set(DUMMY_PRODUCTS.map(p => p.category))].join(', ')}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Enum Values</h2>
          <p>Enum Categories: {Object.values(ProductCategory).join(', ')}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Category Test Results</h2>
          {Object.values(ProductCategory).map(category => {
            const products = getProductsByCategory(category);
            return (
              <div key={category} className="border p-2 mb-2">
                <strong>{category}</strong>: {products.length} products found
                {products.length > 0 && (
                  <ul className="ml-4 mt-1">
                    {products.map(p => (
                      <li key={p.id}>- {p.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
