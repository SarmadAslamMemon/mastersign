import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Import function modules
import { calculateProductPrice } from './pricing/calculatePrice';
import { calculateShippingCost } from './shipping/calculateShipping';
import { processOrder } from './orders/processOrder';
import { calculateTurnaroundTime } from './turnaround/calculateTurnaround';

// Export HTTP functions
export const calculatePrice = functions.https.onCall(calculateProductPrice);
export const calculateShipping = functions.https.onCall(calculateShippingCost);
export const processOrderFunction = functions.https.onCall(processOrder);
export const calculateTurnaround = functions.https.onCall(calculateTurnaroundTime);

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

