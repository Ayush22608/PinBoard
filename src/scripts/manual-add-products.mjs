import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Set up ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/poster-website';
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Define Product model directly in this file
const productSchema = new mongoose.Schema({
  customId: {
    type: String,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['movies', 'shows', 'music', 'anime', 'sports', 'motivation', 'games']
  }
}, {
  timestamps: true
});

// List of all 9 products from Firestore (replace with your actual data)
const firestoreProducts = [
  {
    id: 'poster1', // Replace with actual Firestore ID
    name: 'The Dark Knight',
    description: 'Iconic movie poster featuring Batman in Gotham City',
    price: 29.99,
    image: 'https://example.com/dark-knight.jpg', // Replace with actual image URL
    category: 'movies'
  },
  {
    id: 'poster2', // Replace with actual Firestore ID
    name: 'Breaking Bad',
    description: 'Dramatic poster from the hit TV series',
    price: 24.99,
    image: 'https://example.com/breaking-bad.jpg', // Replace with actual image URL
    category: 'shows'
  },
  {
    id: 'poster3', // Replace with actual Firestore ID 
    name: 'Attack on Titan',
    description: 'Action-packed anime poster',
    price: 19.99,
    image: 'https://example.com/attack-on-titan.jpg', // Replace with actual image URL
    category: 'anime'
  },
  {
    id: 'poster4', // Replace with actual Firestore ID
    name: 'The Beatles',
    description: 'Classic music poster featuring the Fab Four',
    price: 22.99,
    image: 'https://example.com/beatles.jpg', // Replace with actual image URL
    category: 'music'
  },
  {
    id: 'poster5', // Replace with actual Firestore ID
    name: 'NBA Finals',
    description: 'Exciting sports poster capturing the championship moment',
    price: 27.99,
    image: 'https://example.com/nba.jpg', // Replace with actual image URL
    category: 'sports'
  },
  {
    id: 'poster6', // Replace with actual Firestore ID
    name: 'Success Mindset',
    description: 'Inspirational motivational poster',
    price: 18.99,
    image: 'https://example.com/success.jpg', // Replace with actual image URL
    category: 'motivation'
  },
  {
    id: 'poster7', // Replace with actual Firestore ID
    name: 'The Last of Us',
    description: 'Gaming poster from the acclaimed video game',
    price: 25.99,
    image: 'https://example.com/last-of-us.jpg', // Replace with actual image URL
    category: 'games'
  },
  {
    id: 'poster8', // Replace with actual Firestore ID
    name: 'Star Wars',
    description: 'Epic space saga movie poster',
    price: 32.99,
    image: 'https://example.com/star-wars.jpg', // Replace with actual image URL
    category: 'movies'
  },
  {
    id: 'poster9', // Replace with actual Firestore ID
    name: 'Stranger Things',
    description: 'Popular Netflix series poster',
    price: 21.99,
    image: 'https://example.com/stranger-things.jpg', // Replace with actual image URL
    category: 'shows'
  }
];

const addFirestoreProducts = async () => {
  try {
    // Connect to MongoDB
    const conn = await connectDB();
    const Product = mongoose.model('Product', productSchema);
    
    // First check what's already in the database
    const existingProducts = await Product.find({});
    console.log(`Found ${existingProducts.length} existing products in MongoDB.`);
    
    // Map of existing customIds in MongoDB
    const existingCustomIds = new Map();
    existingProducts.forEach(product => {
      if (product.customId) {
        existingCustomIds.set(product.customId, product);
      }
    });
    
    // Process each product in our list
    let added = 0;
    let updated = 0;
    let skipped = 0;
    
    for (const firestoreProduct of firestoreProducts) {
      console.log(`Processing product: ${firestoreProduct.name} (${firestoreProduct.id})`);
      
      // Check if product already exists
      if (existingCustomIds.has(firestoreProduct.id)) {
        console.log(`Product with ID ${firestoreProduct.id} already exists, updating...`);
        
        // Update existing product
        const existingProduct = existingCustomIds.get(firestoreProduct.id);
        existingProduct.name = firestoreProduct.name;
        existingProduct.description = firestoreProduct.description;
        existingProduct.price = firestoreProduct.price;
        existingProduct.image = firestoreProduct.image;
        existingProduct.category = firestoreProduct.category;
        
        await existingProduct.save();
        updated++;
        continue;
      }
      
      // Create new product in MongoDB
      try {
        // Map data to MongoDB schema
        const newProduct = new Product({
          customId: firestoreProduct.id,
          name: firestoreProduct.name,
          description: firestoreProduct.description,
          price: Number(firestoreProduct.price),
          image: firestoreProduct.image,
          category: firestoreProduct.category
        });
        
        await newProduct.save();
        console.log(`Added product: ${firestoreProduct.name}`);
        added++;
      } catch (error) {
        console.error(`Error adding product ${firestoreProduct.id}:`, error);
        skipped++;
      }
    }
    
    console.log('\n==== Summary ====');
    console.log(`Total products in list: ${firestoreProducts.length}`);
    console.log(`Products added: ${added}`);
    console.log(`Products updated: ${updated}`);
    console.log(`Products skipped due to errors: ${skipped}`);
    
    // Verify final count
    const finalProducts = await Product.find({});
    console.log(`\nFinal product count in MongoDB: ${finalProducts.length}`);
    
    console.log('\nProduct import completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
};

// Run the function
addFirestoreProducts(); 