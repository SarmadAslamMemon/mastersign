// seed.js - Comprehensive database seeding for SignFlow
import { db } from "./src/firebase-config.js";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { COLLECTIONS, PRODUCT_CATEGORIES } from "./src/schema.js";

// Sample data for all collections
const sampleData = {
  categories: [
    {
      id: 'expo-display',
      categoryId: 'EXPO_DISPLAY',
      name: 'Expo & Display',
      description: 'Professional trade show displays and exhibition materials',
      icon: '🎪',
      image: '/images/categories/expo-display.jpg',
      featuredSubCategories: ['Booth Displays', 'Banner Stands', 'Table Covers'],
      popular: true,
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'signs',
      categoryId: 'SIGNS',
      name: 'Signs',
      description: 'Custom signs for indoor and outdoor use',
      icon: '🚦',
      image: '/images/categories/signs.jpg',
      featuredSubCategories: ['Metal Signs', 'Vinyl Signs', 'LED Signs'],
      popular: true,
      isActive: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'banners-flags',
      categoryId: 'BANNERS_FLAGS',
      name: 'Banners & Flags',
      description: 'High-quality banners and flags for any occasion',
      icon: '🏁',
      image: '/images/categories/banners-flags.jpg',
      featuredSubCategories: ['Vinyl Banners', 'Fabric Banners', 'Flags'],
      popular: true,
      isActive: true,
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'laser-engraving',
      categoryId: 'LASER_ENGRAVING',
      name: 'Laser Engraving',
      description: 'Precision laser engraving on various materials',
      icon: '⚡',
      image: '/images/categories/laser-engraving.jpg',
      featuredSubCategories: ['Wood Engraving', 'Metal Engraving', 'Glass Engraving'],
      popular: false,
      isActive: true,
      sortOrder: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  subCategories: [
    {
      id: 'metal-signs',
      categoryId: 'SIGNS',
      name: 'Metal Signs',
      description: 'Durable metal signs for long-lasting outdoor use',
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'vinyl-signs',
      categoryId: 'SIGNS',
      name: 'Vinyl Signs',
      description: 'Versatile vinyl signs for various applications',
      isActive: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'booth-displays',
      categoryId: 'EXPO_DISPLAY',
      name: 'Booth Displays',
      description: 'Professional trade show booth displays',
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'banner-stands',
      categoryId: 'EXPO_DISPLAY',
      name: 'Banner Stands',
      description: 'Retractable banner stands for exhibitions',
      isActive: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  products: [
    {
      id: 'metal-sign-basic',
      name: 'Basic Metal Sign',
      description: 'Standard metal sign for outdoor use',
      longDescription: 'High-quality aluminum metal sign perfect for outdoor applications. Weather-resistant and durable.',
      category: 'SIGNS',
      subcategory: 'Metal Signs',
      images: [
        {
          url: '/images/products/metal-sign-basic-1.jpg',
          alt: 'Basic Metal Sign Front View',
          id: 'img1'
        }
      ],
      features: ['Weather-Resistant', 'Durable', 'UV Protected'],
      rating: 4.5,
      reviewCount: 12,
      questionCount: 3,
      inStock: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['metal', 'outdoor', 'durable'],
      featured: false,
      reviews: [],
      pricing: {
        basePrice: 29.99,
        pricingModel: 'per_sq_ft',
        pricePerSqFt: 15.99,
        pricePerLinearFt: 0,
        pricePerLetter: 0,
        discountPercentage: 0,
        minPrice: 19.99,
        maxPrice: 199.99
      },
      sizeConstraints: {
        allowCustomSize: true,
        minWidth: 12,
        maxWidth: 48,
        defaultWidth: 18,
        minHeight: 12,
        maxHeight: 48,
        defaultHeight: 24,
        unit: 'inch',
        step: 1
      },
      specifications: [
        {
          id: 'material',
          name: 'Material',
          type: 'select',
          options: ['Aluminum', 'Steel', 'Brass'],
          defaultValue: 'Aluminum',
          priceImpact: {
            'Aluminum': 0,
            'Steel': 5.99,
            'Brass': 12.99
          }
        }
      ],
      customizableOptions: [
        {
          id: 'shape',
          name: 'Shape',
          type: 'dropdown',
          values: [
            {
              label: 'Rectangle (Standard)',
              value: 'rectangle',
              priceImpact: 0,
              description: 'Standard rectangular shape'
            },
            {
              label: 'Rounded Corners (1/4")',
              value: 'rounded_1_4',
              priceImpact: 2.99,
              description: 'Rounded corners for a softer look'
            }
          ],
          defaultValue: 'rectangle',
          isRequired: false
        }
      ],
      personalizationOptions: {
        allowArtworkUpload: true,
        allowDesignNow: true,
        allowDesignHelp: true,
        artworkPrice: 15.99,
        designNowPrice: 25.99,
        designHelpPrice: 35.99
      },
      shippingOptions: [
        {
          id: 'local-pickup',
          name: 'Local Pickup',
          type: 'pickup',
          basePrice: 0,
          description: 'Free pickup from our location',
          estimatedDays: 0,
          zipCodeRequired: false
        }
      ],
      turnaroundTime: {
        estimatedDays: 5,
        rushAvailable: true,
        rushFeePercentage: 50,
        rushFeeMultiplier: 1.5,
        rushTurnaroundDays: 2,
        orderCutoffTime: '2:00 PM',
        nextShipDate: '2024-01-15'
      },
      inventory: {
        inStock: true,
        stockQuantity: 100,
        lowStockThreshold: 10,
        backorderAllowed: true,
        estimatedRestockDate: new Date('2024-02-01')
      }
    },
    {
      id: 'vinyl-banner-standard',
      name: 'Standard Vinyl Banner',
      description: 'High-quality vinyl banner for indoor and outdoor use',
      longDescription: 'Professional vinyl banner perfect for events, promotions, and advertising.',
      category: 'BANNERS_FLAGS',
      subcategory: 'Vinyl Banners',
      images: [
        {
          url: '/images/products/vinyl-banner-1.jpg',
          alt: 'Standard Vinyl Banner',
          id: 'img1'
        }
      ],
      features: ['Weather-Resistant', 'High Resolution', 'Customizable'],
      rating: 4.3,
      reviewCount: 8,
      questionCount: 2,
      inStock: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['vinyl', 'banner', 'outdoor'],
      featured: true,
      reviews: [],
      pricing: {
        basePrice: 45.99,
        pricingModel: 'per_sq_ft',
        pricePerSqFt: 8.99,
        pricePerLinearFt: 0,
        pricePerLetter: 0,
        discountPercentage: 0,
        minPrice: 25.99,
        maxPrice: 299.99
      },
      sizeConstraints: {
        allowCustomSize: true,
        minWidth: 24,
        maxWidth: 120,
        defaultWidth: 48,
        minHeight: 24,
        maxHeight: 120,
        defaultHeight: 36,
        unit: 'inch',
        step: 6
      },
      specifications: [
        {
          id: 'material',
          name: 'Material',
          type: 'select',
          options: ['Standard Vinyl', 'Heavy Duty Vinyl', 'Mesh Vinyl'],
          defaultValue: 'Standard Vinyl',
          priceImpact: {
            'Standard Vinyl': 0,
            'Heavy Duty Vinyl': 2.99,
            'Mesh Vinyl': 1.99
          }
        }
      ],
      customizableOptions: [
        {
          id: 'finishing',
          name: 'Finishing',
          type: 'dropdown',
          values: [
            {
              label: 'Standard (Grommets)',
              value: 'standard',
              priceImpact: 0,
              description: 'Standard finishing with grommets'
            },
            {
              label: 'Hemmed Edges',
              value: 'hemmed',
              priceImpact: 1.99,
              description: 'Professional hemmed edges'
            }
          ],
          defaultValue: 'standard',
          isRequired: false
        }
      ],
      personalizationOptions: {
        allowArtworkUpload: true,
        allowDesignNow: true,
        allowDesignHelp: true,
        artworkPrice: 19.99,
        designNowPrice: 29.99,
        designHelpPrice: 39.99
      },
      shippingOptions: [
        {
          id: 'local-pickup',
          name: 'Local Pickup',
          type: 'pickup',
          basePrice: 0,
          description: 'Free pickup from our location',
          estimatedDays: 0,
          zipCodeRequired: false
        }
      ],
      turnaroundTime: {
        estimatedDays: 3,
        rushAvailable: true,
        rushFeePercentage: 40,
        rushFeeMultiplier: 1.4,
        rushTurnaroundDays: 1,
        orderCutoffTime: '3:00 PM',
        nextShipDate: '2024-01-15'
      },
      inventory: {
        inStock: true,
        stockQuantity: 50,
        lowStockThreshold: 5,
        backorderAllowed: true,
        estimatedRestockDate: new Date('2024-01-25')
      }
    }
  ],

  users: [
    {
      id: 'admin-user',
      email: 'admin@mastersign.com',
      fullName: 'Admin User',
      company: 'Master Signs',
      phone: '+1-555-0123',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImage: '/images/users/admin-avatar.jpg',
      isEmailVerified: true
    },
    {
      id: 'sample-customer',
      email: 'customer@example.com',
      fullName: 'Sample Customer',
      company: 'Sample Company',
      phone: '+1-555-0456',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImage: '/images/users/default-avatar.jpg',
      isEmailVerified: true
    }
  ],

  templates: [
    {
      id: 'template-metal-sign-1',
      name: 'Classic Metal Sign Template',
      description: 'Professional metal sign design template',
      category: 'SIGNS',
      subcategory: 'Metal Signs',
      thumbnail: '/images/templates/metal-sign-template-1.jpg',
      designData: {
        width: 18,
        height: 24,
        backgroundColor: '#ffffff',
        textElements: [
          {
            id: 'text1',
            text: 'Your Company Name',
            x: 9,
            y: 12,
            fontSize: 24,
            fontFamily: 'Arial',
            color: '#000000'
          }
        ]
      },
      isCustomizable: true,
      basePrice: 29.99,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['metal', 'sign', 'template', 'classic']
    }
  ],

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'John Smith',
      company: 'ABC Corporation',
      rating: 5,
      content: 'Excellent quality signs and fast turnaround time. Highly recommended!',
      avatar: '/images/testimonials/john-smith.jpg',
      featured: true,
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'testimonial-2',
      name: 'Sarah Johnson',
      company: 'XYZ Company',
      rating: 5,
      content: 'Professional service and outstanding product quality. Will use again!',
      avatar: '/images/testimonials/sarah-johnson.jpg',
      featured: true,
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  quoteRequests: [
    {
      id: 'quote-request-1',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+1-555-0789',
      company: 'Wilson Enterprises',
      serviceType: 'Custom Metal Signs',
      timeline: '2 weeks',
      budget: '$500-1000',
      description: 'Need custom metal signs for our new office building entrance.',
      files: [],
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

// Function to create all collections
async function createAllCollections() {
  try {
    console.log('🚀 Starting comprehensive database seeding...');
    
    // Create categories
    console.log('\n📁 Creating categories...');
    for (const category of sampleData.categories) {
      await setDoc(doc(db, COLLECTIONS.CATEGORIES, category.id), category);
      console.log(`✅ Created category: ${category.name}`);
    }

    // Create sub-categories
    console.log('\n📂 Creating sub-categories...');
    for (const subCategory of sampleData.subCategories) {
      await setDoc(doc(db, COLLECTIONS.SUB_CATEGORIES, subCategory.id), subCategory);
      console.log(`✅ Created sub-category: ${subCategory.name}`);
    }

    // Create products
    console.log('\n🛍️ Creating products...');
    for (const product of sampleData.products) {
      await setDoc(doc(db, COLLECTIONS.PRODUCTS, product.id), product);
      console.log(`✅ Created product: ${product.name}`);
    }

    // Create users
    console.log('\n👥 Creating users...');
    for (const user of sampleData.users) {
      await setDoc(doc(db, COLLECTIONS.USERS, user.id), user);
      console.log(`✅ Created user: ${user.fullName}`);
    }

    // Create templates
    console.log('\n🎨 Creating templates...');
    for (const template of sampleData.templates) {
      await setDoc(doc(db, COLLECTIONS.TEMPLATES, template.id), template);
      console.log(`✅ Created template: ${template.name}`);
    }

    // Create testimonials
    console.log('\n💬 Creating testimonials...');
    for (const testimonial of sampleData.testimonials) {
      await setDoc(doc(db, COLLECTIONS.TESTIMONIALS, testimonial.id), testimonial);
      console.log(`✅ Created testimonial from: ${testimonial.name}`);
    }

    // Create quote requests
    console.log('\n📋 Creating quote requests...');
    for (const quoteRequest of sampleData.quoteRequests) {
      await setDoc(doc(db, COLLECTIONS.QUOTE_REQUESTS, quoteRequest.id), quoteRequest);
      console.log(`✅ Created quote request from: ${quoteRequest.name}`);
    }

    // Create empty collections for future use
    console.log('\n📝 Creating empty collections...');
    await addDoc(collection(db, COLLECTIONS.USER_DESIGNS), {
      sample: "User designs collection placeholder"
    });
    console.log('✅ Created userDesigns collection');

    await addDoc(collection(db, COLLECTIONS.ORDERS), {
      sample: "Orders collection placeholder"
    });
    console.log('✅ Created orders collection');

    await addDoc(collection(db, COLLECTIONS.CART_ITEMS), {
      sample: "Cart items collection placeholder"
    });
    console.log('✅ Created cartItems collection');

    console.log('\n🎉 SUCCESS! All collections created successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${sampleData.categories.length} categories`);
    console.log(`   - ${sampleData.subCategories.length} sub-categories`);
    console.log(`   - ${sampleData.products.length} products`);
    console.log(`   - ${sampleData.users.length} users`);
    console.log(`   - ${sampleData.templates.length} templates`);
    console.log(`   - ${sampleData.testimonials.length} testimonials`);
    console.log(`   - ${sampleData.quoteRequests.length} quote requests`);
    console.log('   - 3 additional empty collections (userDesigns, orders, cartItems)');
    
    console.log('\n🔍 Check your Firebase Console > Firestore Database to see all collections!');

  } catch (error) {
    console.error('❌ Error creating collections:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure Firestore Database is enabled in Firebase Console');
    console.log('2. Check if Firestore rules allow write operations');
    console.log('3. Verify your Firebase configuration is correct');
  }
}

// Run the seeding
createAllCollections();
