// Firebase configuration for SignFlow
// This file will be updated with your actual Firebase project credentials

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Get this from Firebase Console
  authDomain: "mastersign-d8396.firebaseapp.com",
  projectId: "mastersign-d8396",
  storageBucket: "mastersign-d8396.appspot.com",
  messagingSenderId: "688784364899",
  appId: "YOUR_APP_ID", // Get this from Firebase Console
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
