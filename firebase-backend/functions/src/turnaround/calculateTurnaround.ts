import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface TurnaroundRequest {
  productId: string;
  rushRequested?: boolean;
  orderDate?: string; // ISO date string
}

interface TurnaroundResponse {
  success: boolean;
  standardDays: number;
  rushDays: number;
  rushAvailable: boolean;
  rushFeePercentage: number;
  orderCutoffTime: string;
  nextShipDate: string;
  estimatedDeliveryDate: string;
  rushDeliveryDate?: string;
  error?: string;
}

export const calculateTurnaroundTime = async (
  data: TurnaroundRequest,
  context: functions.https.CallableContext
): Promise<TurnaroundResponse> => {
  try {
    // Validate request
    if (!data.productId) {
      return {
        success: false,
        standardDays: 0,
        rushDays: 0,
        rushAvailable: false,
        rushFeePercentage: 0,
        orderCutoffTime: '',
        nextShipDate: '',
        estimatedDeliveryDate: '',
        error: 'Product ID is required'
      };
    }

    // Get product data
    const productDoc = await db.collection('products').doc(data.productId).get();
    if (!productDoc.exists) {
      return {
        success: false,
        standardDays: 0,
        rushDays: 0,
        rushAvailable: false,
        rushFeePercentage: 0,
        orderCutoffTime: '',
        nextShipDate: '',
        estimatedDeliveryDate: '',
        error: 'Product not found'
      };
    }

    const product = productDoc.data()!;
    const turnaroundTime = product.turnaroundTime || {};

    // Get current date and time
    const now = new Date();
    const orderDate = data.orderDate ? new Date(data.orderDate) : now;
    
    // Calculate next business day
    const nextBusinessDay = getNextBusinessDay(orderDate);
    
    // Calculate delivery dates
    const standardDays = turnaroundTime.estimatedDays || 5;
    const rushDays = turnaroundTime.rushTurnaroundDays || Math.ceil(standardDays * 0.5);
    
    const estimatedDeliveryDate = addBusinessDays(nextBusinessDay, standardDays);
    const rushDeliveryDate = data.rushRequested && turnaroundTime.rushAvailable 
      ? addBusinessDays(nextBusinessDay, rushDays)
      : undefined;

    // Get order cutoff time
    const orderCutoffTime = turnaroundTime.orderCutoffTime || '2:00 PM';
    const cutoffHour = parseInt(orderCutoffTime.split(':')[0]);
    const cutoffMinute = parseInt(orderCutoffTime.split(':')[1].split(' ')[0]);
    const isPM = orderCutoffTime.includes('PM');
    
    const cutoffTime = new Date(orderDate);
    cutoffTime.setHours(isPM && cutoffHour !== 12 ? cutoffHour + 12 : cutoffHour, cutoffMinute, 0, 0);

    // Check if order is within cutoff time
    const isWithinCutoff = orderDate < cutoffTime;
    const nextShipDate = isWithinCutoff ? nextBusinessDay : getNextBusinessDay(nextBusinessDay);

    return {
      success: true,
      standardDays,
      rushDays,
      rushAvailable: turnaroundTime.rushAvailable || false,
      rushFeePercentage: turnaroundTime.rushFeePercentage || 50,
      orderCutoffTime,
      nextShipDate: nextShipDate.toISOString().split('T')[0],
      estimatedDeliveryDate: estimatedDeliveryDate.toISOString().split('T')[0],
      rushDeliveryDate: rushDeliveryDate?.toISOString().split('T')[0]
    };

  } catch (error) {
    console.error('Error calculating turnaround time:', error);
    return {
      success: false,
      standardDays: 0,
      rushDays: 0,
      rushAvailable: false,
      rushFeePercentage: 0,
      orderCutoffTime: '',
      nextShipDate: '',
      estimatedDeliveryDate: '',
      error: 'Failed to calculate turnaround time'
    };
  }
};

// Helper function to get next business day
function getNextBusinessDay(date: Date): Date {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  
  // Skip weekends
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
}

// Helper function to add business days
function addBusinessDays(date: Date, businessDays: number): Date {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < businessDays) {
    result.setDate(result.getDate() + 1);
    
    // Skip weekends
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result;
}

