import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product';

dotenv.config();

const products = [
  {
    name: 'Abstract Waves',
    description: 'A beautiful abstract poster featuring flowing waves in blue and white.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    category: 'abstract',
    inStock: true
  },
  {
    name: 'Mountain Sunset',
    description: 'Stunning mountain landscape at sunset with vibrant orange and purple hues.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    category: 'nature',
    inStock: true
  },
  {
    name: 'City Lights',
    description: 'Urban cityscape at night with glowing lights and modern architecture.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    category: 'movies',
    inStock: true
  },
  {
    name: 'Minimalist Lines',
    description: 'Clean and modern minimalist design with geometric lines.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
    category: 'anime',
    inStock: true
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/poster-website', {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Seeded products successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 