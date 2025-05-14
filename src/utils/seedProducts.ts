import { connectDB } from './db.js';
import { Product } from '../models/Product.js';

const sampleProducts = [
  {
    name: 'The Dark Knight',
    description: 'Iconic movie poster featuring Batman in Gotham City',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'movies'
  },
  {
    name: 'Breaking Bad',
    description: 'Dramatic poster from the hit TV series',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'shows'
  },
  {
    name: 'Attack on Titan',
    description: 'Action-packed anime poster',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'anime'
  },
  {
    name: 'The Beatles',
    description: 'Classic music poster featuring the Fab Four',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'music'
  },
  {
    name: 'NBA Finals',
    description: 'Exciting sports poster capturing the championship moment',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'sports'
  },
  {
    name: 'Success Mindset',
    description: 'Inspirational motivational poster',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'motivation'
  },
  {
    name: 'The Last of Us',
    description: 'Gaming poster from the acclaimed video game',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    category: 'games'
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Sample products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 