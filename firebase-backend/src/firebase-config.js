// Firebase configuration for SignFlow
// This file will be updated with your actual Firebase project credentials

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
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

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
