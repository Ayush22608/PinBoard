import { Timestamp } from 'firebase/firestore';

export interface Poster {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  featured: boolean;
  dimensions: string;
  tags: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: {
    posterId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  orders: string[]; // Array of order IDs
  createdAt: Timestamp;
  updatedAt: Timestamp;
} 