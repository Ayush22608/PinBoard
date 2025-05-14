import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

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

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const migrateFirestoreProducts = async () => {
  try {
    // Connect to MongoDB
    const conn = await connectDB();
    const Product = mongoose.model('Product', productSchema);
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    
    // Check existing products in MongoDB
    const existingProducts = await Product.find({});
    console.log(`Found ${existingProducts.length} existing products in MongoDB.`);
    
    // Map of existing customIds in MongoDB
    const existingCustomIds = new Map();
    existingProducts.forEach(product => {
      if (product.customId) {
        existingCustomIds.set(product.customId, product);
      }
    });
    
    // Get all products from Firestore
    const productsCollection = collection(firestore, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    
    if (productsSnapshot.empty) {
      console.log('No products found in Firestore!');
      process.exit(1);
    }
    
    console.log(`Found ${productsSnapshot.size} products in Firestore.`);
    
    // Process each Firestore product
    let added = 0;
    let updated = 0;
    let skipped = 0;
    
    // Process each Firestore product
    for (const doc of productsSnapshot.docs) {
      const firestoreProduct = doc.data();
      const firestoreId = doc.id;
      
      console.log(`Processing product: ${firestoreProduct.name} (${firestoreId})`);
      
      // Check if product already exists
      if (existingCustomIds.has(firestoreId)) {
        console.log(`Product with ID ${firestoreId} already exists, updating...`);
        
        // Update existing product
        const existingProduct = existingCustomIds.get(firestoreId);
        existingProduct.name = firestoreProduct.name;
        existingProduct.description = firestoreProduct.description;
        existingProduct.price = firestoreProduct.price;
        existingProduct.image = firestoreProduct.image || firestoreProduct.imageUrl;
        existingProduct.category = firestoreProduct.category || 'movies';
        
        await existingProduct.save();
        updated++;
        continue;
      }
      
      // Create new product in MongoDB
      try {
        // Use the image field from Firestore, or fallback to imageUrl if image is missing
        const imageField = firestoreProduct.image || firestoreProduct.imageUrl;
        
        // Map Firestore data to MongoDB schema
        const newProduct = new Product({
          customId: firestoreId,
          name: firestoreProduct.name,
          description: firestoreProduct.description,
          price: Number(firestoreProduct.price),
          image: imageField,
          category: firestoreProduct.category || 'movies'
        });
        
        await newProduct.save();
        console.log(`Migrated product: ${firestoreProduct.name}`);
        added++;
      } catch (error) {
        console.error(`Error migrating product ${firestoreId}:`, error);
        skipped++;
      }
    }
    
    console.log('\n==== Migration Summary ====');
    console.log(`Total Firestore products: ${productsSnapshot.size}`);
    console.log(`Products added: ${added}`);
    console.log(`Products updated: ${updated}`);
    console.log(`Products skipped due to errors: ${skipped}`);
    
    console.log('\nMigration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

// Run the migration
migrateFirestoreProducts(); 