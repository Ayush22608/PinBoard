/**
 * API Service
 * 
 * Centralized service for making API calls to the backend with proper error handling.
 */

import axios from 'axios';
import config from '../config';

// Create an axios instance with default configs
const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle different error statuses
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error', response.data);
          break;
        default:
          console.error(`Error (${response.status}):`, response.data);
      }
    } else {
      // Network error or server not responding
      console.error('Network error or server not responding');
    }

    return Promise.reject(error);
  }
);

// API methods
const apiService = {
  // Products
  async getProducts() {
    return api.get('/api/products');
  },
  
  async getProductById(id: string) {
    return api.get(`/api/products/${id}`);
  },
  
  // Authentication
  async login(email: string, password: string) {
    return api.post('/api/auth/login', { email, password });
  },
  
  async register(userData: any) {
    return api.post('/api/auth/register', userData);
  },
  
  // User profile
  async getUserProfile() {
    return api.get('/api/users/profile');
  },
  
  async updateUserProfile(userData: any) {
    return api.put('/api/users/profile', userData);
  },
  
  // Cart
  async getCart() {
    return api.get('/api/cart');
  },
  
  async addToCart(productId: string, quantity: number = 1) {
    return api.post('/api/cart', { productId, quantity });
  },
  
  async updateCartItem(productId: string, quantity: number) {
    return api.put(`/api/cart/${productId}`, { quantity });
  },
  
  async removeFromCart(productId: string) {
    return api.delete(`/api/cart/${productId}`);
  },
  
  async clearCart() {
    return api.delete('/api/cart');
  },
  
  // Orders
  async getOrders() {
    return api.get('/api/orders');
  },
  
  async getOrderById(id: string) {
    return api.get(`/api/orders/${id}`);
  },
  
  async createOrder(orderData: any) {
    return api.post('/api/orders', orderData);
  },
  
  async updateOrderStatus(id: string, status: string) {
    return api.put(`/api/orders/${id}/status`, { status });
  }
};

export default apiService; 
 