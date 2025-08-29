import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface PricingRequest {
  productId: string;
  quantity: number;
  size?: {
    width: number;
    height: number;
    unit: string;
  };
  letterCount?: number;
  options?: Array<{
    optionId: string;
    value: string;
  }>;
  rushRequested?: boolean;
  zipCode?: string;
}

interface PricingResponse {
  success: boolean;
  basePrice: number;
  sizePrice: number;
  optionsPrice: number;
  quantityDiscount: number;
  rushFee: number;
  subtotal: number;
  total: number;
  breakdown: {
    base: number;
    size: number;
    options: number;
    quantityDiscount: number;
    rushFee: number;
    subtotal: number;
    total: number;
  };
  error?: string;
}

export const calculateProductPrice = async (
  data: PricingRequest,
  context: functions.https.CallableContext
): Promise<PricingResponse> => {
  try {
    // Validate request
    if (!data.productId || !data.quantity) {
      return {
        success: false,
        basePrice: 0,
        sizePrice: 0,
        optionsPrice: 0,
        quantityDiscount: 0,
        rushFee: 0,
        subtotal: 0,
        total: 0,
        breakdown: {
          base: 0,
          size: 0,
          options: 0,
          quantityDiscount: 0,
          rushFee: 0,
          subtotal: 0,
          total: 0
        },
        error: 'Product ID and quantity are required'
      };
    }

    // Get product data
    const productDoc = await db.collection('products').doc(data.productId).get();
    if (!productDoc.exists) {
      return {
        success: false,
        basePrice: 0,
        sizePrice: 0,
        optionsPrice: 0,
        quantityDiscount: 0,
        rushFee: 0,
        subtotal: 0,
        total: 0,
        breakdown: {
          base: 0,
          size: 0,
          options: 0,
          quantityDiscount: 0,
          rushFee: 0,
          subtotal: 0,
          total: 0
        },
        error: 'Product not found'
      };
    }

    const product = productDoc.data()!;
    const pricing = product.pricing || {};
    const sizeConstraints = product.sizeConstraints || {};
    const customizableOptions = product.customizableOptions || [];
    const quantityDiscounts = product.quantityDiscounts || [];
    const turnaroundTime = product.turnaroundTime || {};

    // Calculate base price
    let basePrice = pricing.basePrice || 0;
    let sizePrice = 0;

    // Calculate size-based pricing
    if (data.size && sizeConstraints.allowCustomSize) {
      const { width, height, unit } = data.size;
      
      switch (pricing.pricingModel) {
        case 'per_sq_ft':
          const areaSqFt = (width * height) / 144; // Convert square inches to square feet
          sizePrice = areaSqFt * (pricing.pricePerSqFt || 0);
          break;
          
        case 'per_linear_ft':
          const perimeterFt = (2 * (width + height)) / 12; // Convert inches to feet
          sizePrice = perimeterFt * (pricing.pricePerLinearFt || 0);
          break;
          
        case 'per_letter':
          if (data.letterCount) {
            sizePrice = data.letterCount * (pricing.pricePerLetter || 0);
          }
          break;
          
        default:
          sizePrice = 0; // Fixed pricing
      }
    }

    // Calculate options pricing
    let optionsPrice = 0;
    if (data.options && data.options.length > 0) {
      for (const selectedOption of data.options) {
        const option = customizableOptions.find(opt => opt.id === selectedOption.optionId);
        if (option) {
          const optionValue = option.values.find(val => val.value === selectedOption.value);
          if (optionValue && optionValue.priceImpact) {
            optionsPrice += optionValue.priceImpact;
          }
        }
      }
    }

    // Calculate quantity discounts
    let quantityDiscount = 0;
    let discountPercentage = 0;
    
    for (const discount of quantityDiscounts) {
      if (data.quantity >= discount.minQuantity && 
          (!discount.maxQuantity || data.quantity <= discount.maxQuantity)) {
        if (discount.discountPercentage) {
          discountPercentage = discount.discountPercentage;
        } else if (discount.discountAmount) {
          quantityDiscount = discount.discountAmount * data.quantity;
        }
        break;
      }
    }

    // Calculate subtotal before quantity discount
    const subtotalBeforeDiscount = (basePrice + sizePrice + optionsPrice) * data.quantity;
    
    // Apply quantity discount
    if (discountPercentage > 0) {
      quantityDiscount = subtotalBeforeDiscount * (discountPercentage / 100);
    }

    // Calculate rush fee
    let rushFee = 0;
    if (data.rushRequested && turnaroundTime.rushAvailable) {
      const rushMultiplier = turnaroundTime.rushFeeMultiplier || 1.5;
      rushFee = subtotalBeforeDiscount * (rushMultiplier - 1);
    }

    // Calculate final totals
    const subtotal = subtotalBeforeDiscount - quantityDiscount;
    const total = subtotal + rushFee;

    return {
      success: true,
      basePrice,
      sizePrice,
      optionsPrice,
      quantityDiscount,
      rushFee,
      subtotal,
      total,
      breakdown: {
        base: basePrice,
        size: sizePrice,
        options: optionsPrice,
        quantityDiscount,
        rushFee,
        subtotal,
        total
      }
    };

  } catch (error) {
    console.error('Error calculating product price:', error);
    return {
      success: false,
      basePrice: 0,
      sizePrice: 0,
      optionsPrice: 0,
      quantityDiscount: 0,
      rushFee: 0,
      subtotal: 0,
      total: 0,
      breakdown: {
        base: 0,
        size: 0,
        options: 0,
        quantityDiscount: 0,
        rushFee: 0,
        subtotal: 0,
        total: 0
      },
      error: 'Failed to calculate price'
    };
  }
};

