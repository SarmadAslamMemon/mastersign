import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface ShippingRequest {
  productId: string;
  zipCode: string;
  shippingMethod: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

interface ShippingResponse {
  success: boolean;
  shippingCost: number;
  estimatedDays: number;
  method: string;
  description: string;
  error?: string;
}

export const calculateShippingCost = async (
  data: ShippingRequest,
  context: functions.https.CallableContext
): Promise<ShippingResponse> => {
  try {
    // Validate request
    if (!data.productId || !data.zipCode || !data.shippingMethod) {
      return {
        success: false,
        shippingCost: 0,
        estimatedDays: 0,
        method: '',
        description: '',
        error: 'Product ID, zip code, and shipping method are required'
      };
    }

    // Get product data
    const productDoc = await db.collection('products').doc(data.productId).get();
    if (!productDoc.exists) {
      return {
        success: false,
        shippingCost: 0,
        estimatedDays: 0,
        method: '',
        description: '',
        error: 'Product not found'
      };
    }

    const product = productDoc.data()!;
    const shippingOptions = product.shippingOptions || [];

    // Find the selected shipping method
    const selectedMethod = shippingOptions.find((option: any) => option.id === data.shippingMethod);
    if (!selectedMethod) {
      return {
        success: false,
        shippingCost: 0,
        estimatedDays: 0,
        method: '',
        description: '',
        error: 'Shipping method not found'
      };
    }

    let shippingCost = selectedMethod.basePrice || 0;

    // Calculate zip code based pricing if applicable
    if (selectedMethod.zipCodeRequired && selectedMethod.zipCodePricing) {
      const zipCode = data.zipCode;
      const zipPricing = selectedMethod.zipCodePricing;
      
      // Find matching zip code range
      for (const range of zipPricing.ranges || []) {
        if (zipCode >= range.start && zipCode <= range.end) {
          shippingCost += range.additionalCost || 0;
          break;
        }
      }
    }

    // Calculate weight-based pricing if applicable
    if (data.weight && selectedMethod.weightBasedPricing) {
      const weightPricing = selectedMethod.weightBasedPricing;
      if (data.weight > weightPricing.baseWeight) {
        const extraWeight = data.weight - weightPricing.baseWeight;
        const extraCost = Math.ceil(extraWeight / weightPricing.weightIncrement) * weightPricing.costPerIncrement;
        shippingCost += extraCost;
      }
    }

    // Calculate dimensional weight pricing if applicable
    if (data.dimensions && selectedMethod.dimensionalWeightPricing) {
      const { length, width, height } = data.dimensions;
      const dimensionalWeight = (length * width * height) / 166; // Standard dimensional weight divisor
      
      if (dimensionalWeight > (data.weight || 0)) {
        const dimWeightPricing = selectedMethod.dimensionalWeightPricing;
        const extraCost = Math.ceil(dimensionalWeight / dimWeightPricing.weightIncrement) * dimWeightPricing.costPerIncrement;
        shippingCost += extraCost;
      }
    }

    return {
      success: true,
      shippingCost: Math.max(0, shippingCost), // Ensure non-negative
      estimatedDays: selectedMethod.estimatedDays || 5,
      method: selectedMethod.name,
      description: selectedMethod.description || ''
    };

  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    return {
      success: false,
      shippingCost: 0,
      estimatedDays: 0,
      method: '',
      description: '',
      error: 'Failed to calculate shipping cost'
    };
  }
};

