// Test Firebase connection and create initial collections
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQk6eD1PWv5UxwWzjHivW4l4EapSpxO2Y",
  authDomain: "mastersign-d8396.firebaseapp.com",
  projectId: "mastersign-d8396",
  storageBucket: "mastersign-d8396.firebasestorage.app",
  messagingSenderId: "688784364899",
  appId: "1:688784364899:web:b27c29f9d3a4e1f398ef56",
  measurementId: "G-3YV9XHP9PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🚀 Testing Firebase connection...');

// Test data to create collections
const testData = {
  categories: {
    'test-category': {
      id: 'test-category',
      name: 'Test Category',
      description: 'This is a test category to verify Firebase connection',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  products: {
    'test-product': {
      id: 'test-product',
      name: 'Test Product',
      description: 'This is a test product to verify Firebase connection',
      category: 'TEST',
      inStock: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
};

// Function to test connection and create collections
async function testConnection() {
  try {
    console.log('✅ Firebase initialized successfully');
    console.log('📝 Creating test collections...');
    
    // Create a test category
    await setDoc(doc(db, 'categories', 'test-category'), testData.categories['test-category']);
    console.log('✅ Created test category collection');
    
    // Create a test product
    await setDoc(doc(db, 'products', 'test-product'), testData.products['test-product']);
    console.log('✅ Created test product collection');
    
    console.log('\n🎉 SUCCESS! Firebase connection is working!');
    console.log('📊 Check your Firebase Console > Firestore Database');
    console.log('   You should now see "categories" and "products" collections');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure Firestore Database is enabled in Firebase Console');
    console.log('2. Check if Firestore rules allow write operations');
    console.log('3. Verify your project ID matches: mastersign-d8396');
  }
}

// Run the test
testConnection();
