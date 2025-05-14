/**
 * Frontend Configuration
 * 
 * This file centralizes all configuration settings for the frontend application.
 * It uses environment variables loaded through Vite's import.meta.env
 */

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDCepQ1Bd0gIKMeiXthqKL9s5NKJP54kaY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "poster-website-e5b1c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "poster-website-e5b1c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "poster-website-e5b1c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "436550064243",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:436550064243:web:01d03f25d7a80cd8c6b206",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7X7PPMEC12"
};

// Environment settings
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
const isDevelopment = !isProduction;

// API Endpoints
const apiEndpoints = {
  products: `${API_URL}/api/products`,
  auth: `${API_URL}/api/auth`,
  users: `${API_URL}/api/users`,
  cart: `${API_URL}/api/cart`,
  orders: `${API_URL}/api/orders`,
};

// Export the configuration
const config = {
  apiUrl: API_URL,
  endpoints: apiEndpoints,
  firebase: firebaseConfig,
  isProduction,
  isDevelopment
};

export default config; 
 
 
 * Frontend Configuration
 * 
 * This file centralizes all configuration settings for the frontend application.
 * It uses environment variables loaded through Vite's import.meta.env
 */

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDCepQ1Bd0gIKMeiXthqKL9s5NKJP54kaY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "poster-website-e5b1c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "poster-website-e5b1c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "poster-website-e5b1c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "436550064243",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:436550064243:web:01d03f25d7a80cd8c6b206",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7X7PPMEC12"
};

// Environment settings
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
const isDevelopment = !isProduction;

// API Endpoints
const apiEndpoints = {
  products: `${API_URL}/api/products`,
  auth: `${API_URL}/api/auth`,
  users: `${API_URL}/api/users`,
  cart: `${API_URL}/api/cart`,
  orders: `${API_URL}/api/orders`,
};

// Export the configuration
const config = {
  apiUrl: API_URL,
  endpoints: apiEndpoints,
  firebase: firebaseConfig,
  isProduction,
  isDevelopment
};

export default config; 
 
 
 * Frontend Configuration
 * 
 * This file centralizes all configuration settings for the frontend application.
 * It uses environment variables loaded through Vite's import.meta.env
 */

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDCepQ1Bd0gIKMeiXthqKL9s5NKJP54kaY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "poster-website-e5b1c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "poster-website-e5b1c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "poster-website-e5b1c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "436550064243",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:436550064243:web:01d03f25d7a80cd8c6b206",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7X7PPMEC12"
};

// Environment settings
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
const isDevelopment = !isProduction;

// API Endpoints
const apiEndpoints = {
  products: `${API_URL}/api/products`,
  auth: `${API_URL}/api/auth`,
  users: `${API_URL}/api/users`,
  cart: `${API_URL}/api/cart`,
  orders: `${API_URL}/api/orders`,
};

// Export the configuration
const config = {
  apiUrl: API_URL,
  endpoints: apiEndpoints,
  firebase: firebaseConfig,
  isProduction,
  isDevelopment
};

export default config; 
 
 