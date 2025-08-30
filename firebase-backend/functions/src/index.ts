import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Import function modules
import { calculateProductPrice } from './pricing/calculatePrice';
import { calculateShippingCost } from './shipping/calculateShipping';
import { processOrder } from './orders/processOrder';
import { calculateTurnaroundTime } from './turnaround/calculateTurnaround';

// Import product functions
import {
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategory
} from './products/getProducts';

// Import category functions
import { 
  getCategories, 
  getCategoryById, 
  getSubCategories, 
  getCategoryWithSubCategories, 
  getAllCategoriesWithSubCategories 
} from './products/getCategories';

// Export HTTP functions
export const calculatePrice = functions.https.onCall(calculateProductPrice);
export const calculateShipping = functions.https.onCall(calculateShippingCost);
export const processOrderFunction = functions.https.onCall(processOrder);
export const calculateTurnaround = functions.https.onCall(calculateTurnaroundTime);

// Export product functions
export const getProductsFunction = getProducts;
export const getProductByIdFunction = getProductById;
export const searchProductsFunction = searchProducts;
export const getProductsByCategoryFunction = getProductsByCategory;

// Export category functions
export const getCategoriesFunction = getCategories;
export const getCategoryByIdFunction = getCategoryById;
export const getSubCategoriesFunction = getSubCategories;
export const getCategoryWithSubCategoriesFunction = getCategoryWithSubCategories;
export const getAllCategoriesWithSubCategoriesFunction = getAllCategoriesWithSubCategories;

// Export scheduled functions
export const updateInventory = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  // Update inventory levels daily
  console.log('Running daily inventory update');
  return null;
});

export const sendOrderReminders = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
  // Send order status reminders
  console.log('Running hourly order reminders');
  return null;
});

