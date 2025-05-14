import { connectDB } from '../utils/db';
import { Product } from '../models/Product';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration - replace with your actual config
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
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Get all products from Firestore
    const productsCollection = collection(firestore, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    
    if (productsSnapshot.empty) {
      console.log('No products found in Firestore!');
      process.exit(1);
    }
    
    console.log(`Found ${productsSnapshot.size} products in Firestore.`);
    
    // First, let's list all existing products in MongoDB
    const existingProducts = await Product.find({});
    console.log(`Found ${existingProducts.length} existing products in MongoDB.`);
    
    // Map of existing customIds in MongoDB to avoid duplicates
    const existingCustomIds = new Map();
    existingProducts.forEach(product => {
      if (product.customId) {
        existingCustomIds.set(product.customId, product);
      }
    });
    
    // Process each Firestore product
    let added = 0;
    let updated = 0;
    let skipped = 0;
    
    const migrationPromises = productsSnapshot.docs.map(async (doc) => {
      const firestoreProduct = doc.data();
      const firestoreId = doc.id;
      
      // Check if product already exists in MongoDB
      if (existingCustomIds.has(firestoreId)) {
        console.log(`Product with ID ${firestoreId} already exists, updating...`);
        
        // Update existing product
        const existingProduct = existingCustomIds.get(firestoreId);
        existingProduct.name = firestoreProduct.name;
        existingProduct.description = firestoreProduct.description;
        existingProduct.price = firestoreProduct.price;
        existingProduct.image = firestoreProduct.image;
        existingProduct.category = firestoreProduct.category;
        
        await existingProduct.save();
        updated++;
        return;
      }
      
      // Create new product in MongoDB
      try {
        // Map Firestore data to MongoDB schema
        const newProduct = new Product({
          customId: firestoreId,
          name: firestoreProduct.name,
          description: firestoreProduct.description,
          price: firestoreProduct.price,
          image: firestoreProduct.image,
          category: firestoreProduct.category || 'movies' // Default category if missing
        });
        
        await newProduct.save();
        console.log(`Migrated product: ${firestoreProduct.name}`);
        added++;
      } catch (error) {
        console.error(`Error migrating product ${firestoreId}:`, error);
        skipped++;
      }
    });
    
    await Promise.all(migrationPromises);
    
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