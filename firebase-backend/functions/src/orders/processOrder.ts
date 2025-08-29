import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface OrderItem {
  productId: string;
  quantity: number;
  size?: {
    width: number;
    height: number;
    unit: string;
  };
  options?: Array<{
    optionId: string;
    value: string;
  }>;
  artworkFileUrl?: string;
  designMode?: string;
  calculatedPrice: number;
}

interface OrderRequest {
  userId: string;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  shippingMethod: string;
  rushRequested?: boolean;
  specialInstructions?: string;
}

interface OrderResponse {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  totalAmount?: number;
  estimatedDeliveryDate?: string;
  error?: string;
}

export const processOrder = async (
  data: OrderRequest,
  context: functions.https.CallableContext
): Promise<OrderResponse> => {
  try {
    // Validate authentication
    if (!context.auth) {
      return {
        success: false,
        error: 'Authentication required'
      };
    }

    // Validate request
    if (!data.userId || !data.items || data.items.length === 0 || !data.shippingAddress) {
      return {
        success: false,
        error: 'Invalid order data'
      };
    }

    // Verify user owns the order
    if (context.auth.uid !== data.userId) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of data.items) {
      totalAmount += item.calculatedPrice * item.quantity;
    }

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order document
    const orderData = {
      userId: data.userId,
      orderNumber,
      items: data.items.map(item => ({
        ...item,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      })),
      totalAmount,
      status: 'pending',
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress || data.shippingAddress,
      shippingMethod: data.shippingMethod,
      rushRequested: data.rushRequested || false,
      specialInstructions: data.specialInstructions || '',
      paymentStatus: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Save order to Firestore
    const orderRef = await db.collection('orders').add(orderData);
    const orderId = orderRef.id;

    // Update inventory (if applicable)
    await updateInventory(data.items);

    // Calculate estimated delivery date
    const estimatedDeliveryDate = await calculateDeliveryDate(data.items, data.rushRequested);

    // Create cart items for tracking
    for (const item of data.items) {
      await db.collection('cartItems').add({
        userId: data.userId,
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        options: item.options,
        artworkFileUrl: item.artworkFileUrl,
        designMode: item.designMode,
        calculatedPrice: item.calculatedPrice,
        status: 'ordered',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Send confirmation email (you can implement this later)
    // await sendOrderConfirmationEmail(data.userId, orderNumber, totalAmount);

    return {
      success: true,
      orderId,
      orderNumber,
      totalAmount,
      estimatedDeliveryDate
    };

  } catch (error) {
    console.error('Error processing order:', error);
    return {
      success: false,
      error: 'Failed to process order'
    };
  }
};

// Helper function to generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `MS-${timestamp.slice(-6)}-${random}`;
}

// Helper function to update inventory
async function updateInventory(items: OrderItem[]): Promise<void> {
  for (const item of items) {
    const productRef = db.collection('products').doc(item.productId);
    
    // Use transaction to safely update inventory
    await db.runTransaction(async (transaction) => {
      const productDoc = await transaction.get(productRef);
      if (productDoc.exists) {
        const product = productDoc.data()!;
        const inventory = product.inventory || {};
        
        if (inventory.stockQuantity !== undefined) {
          const newStock = Math.max(0, inventory.stockQuantity - item.quantity);
          transaction.update(productRef, {
            'inventory.stockQuantity': newStock,
            'inventory.inStock': newStock > 0,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      }
    });
  }
}

// Helper function to calculate delivery date
async function calculateDeliveryDate(items: OrderItem[], rushRequested: boolean = false): Promise<string> {
  // This is a simplified calculation - you can enhance it based on your business logic
  const baseDays = rushRequested ? 2 : 5;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + baseDays);
  
  // Skip weekends
  while (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }
  
  return deliveryDate.toISOString().split('T')[0];
}

