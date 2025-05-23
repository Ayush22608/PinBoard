import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// List of routes that require authentication
const protectedRoutes = [
  '/cart',
  '/orders',
  '/profile',
  '/users'
];

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Only add token for protected routes
    if (protectedRoutes.some(route => config.url?.startsWith(route))) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 