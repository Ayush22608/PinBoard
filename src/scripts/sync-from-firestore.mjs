import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, listCollections } from 'firebase/firestore';

// Load environment variables
dotenv.config();

// Firebase configuration with provided credentials
const firebaseConfig = {
  apiKey: "AIzaSyDCepQ1Bd0gIKMeiXthqKL9s5NKJP54kaY",
  authDomain: "poster-website-e5b1c.firebaseapp.com",
  projectId: "poster-website-e5b1c",
  storageBucket: "poster-website-e5b1c.firebasestorage.app",
  messagingSenderId: "436550064243",
  appId: "1:436550064243:web:01d03f25d7a80cd8c6b206",
  measurementId: "G-7X7PPMEC12"
};

async function sync() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    console.log(`Project ID: ${firebaseConfig.projectId}`);
    
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/poster-website');
    console.log('Connected to MongoDB');
    
    // Create schemas for both collections
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String
    });
    
    const serverSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
      category: String,
      inStock: Boolean
    });
    
    // Create models
    const Product = mongoose.model('Product', productSchema);
    const ServerProduct = mongoose.model('ServerProduct', serverSchema);
    
    // Clear existing data
    console.log('Clearing existing products from MongoDB...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Check different collection names that might contain posters
    console.log('Trying to find products in Firestore...');
    
    const possibleCollections = [
      'products', 'posters', 'items', 'Products', 'Posters', 'Items'
    ];
    
    let foundProducts = false;
    
    try {
      for (const collectionName of possibleCollections) {
        console.log(`Checking collection: ${collectionName}`);
        
        const productsCollection = collection(firestore, collectionName);
        const snapshot = await getDocs(productsCollection);
        
        if (!snapshot.empty) {
          console.log(`Found ${snapshot.size} products in collection "${collectionName}"`);
          foundProducts = true;
          
          // Import each product to MongoDB
          let count = 0;
          for (const doc of snapshot.docs) {
            const firestoreProduct = doc.data();
            const productId = doc.id;
            
            console.log(`Importing: ${firestoreProduct.name || 'Unnamed product'} (${productId})`);
            
            // Make sure we have all required fields, use defaults if missing
            const name = firestoreProduct.name || 'Unnamed Poster';
            const description = firestoreProduct.description || 'No description available';
            const price = firestoreProduct.price || 19.99;
            const image = firestoreProduct.image || firestoreProduct.imageUrl || '';
            const category = firestoreProduct.category || 'movies';
            
            // Create in main collection
            await new Product({
              customId: productId,
              name: name,
              description: description,
              price: price,
              image: image,
              category: category
            }).save();
            
            // Create in server collection
            await new ServerProduct({
              customId: productId,
              name: name,
              description: description,
              price: price,
              imageUrl: image,
              category: category,
              inStock: true
            }).save();
            
            count++;
          }
          
          console.log(`Successfully imported ${count} products from Firestore collection "${collectionName}" to MongoDB`);
          break; // Exit once we've found and processed a collection with products
        } else {
          console.log(`No items found in collection "${collectionName}"`);
        }
      }
      
      if (!foundProducts) {
        console.log('\nNo products found in any of the common collection names.');
        console.log('Please ensure your Firestore database has products and verify the collection name.');
      }
      
      // List all imported products
      const allProducts = await Product.find({});
      console.log('\nImported products:');
      if (allProducts.length > 0) {
        allProducts.forEach((product, i) => {
          console.log(`[${i+1}] ${product.name} (${product.category}) - $${product.price}`);
        });
      } else {
        console.log('No products were imported to MongoDB.');
      }
      
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      console.log('\nPlease check that:');
      console.log('1. Your Firebase configuration is correct');
      console.log('2. You have products in your Firestore collections');
      console.log('3. You have the necessary permissions to access the Firestore database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error syncing products:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the sync
sync(); 
    console.log(`Found ${snapshot.size} products in Firestore`);
    
    // Import each product to MongoDB
    let count = 0;
    for (const doc of snapshot.docs) {
      const firestoreProduct = doc.data();
      const productId = doc.id;
      
      console.log(`Importing: ${firestoreProduct.name} (${productId})`);
      
      // Create in main collection
      await new Product({
        customId: productId,
        name: firestoreProduct.name,
        description: firestoreProduct.description,
        price: firestoreProduct.price,
        image: firestoreProduct.image || firestoreProduct.imageUrl,
        category: firestoreProduct.category
      }).save();
      
      // Create in server collection
      const category = mapCategory(firestoreProduct.category);
      await new ServerProduct({
        customId: productId,
        name: firestoreProduct.name,
        description: firestoreProduct.description,
        price: firestoreProduct.price,
        imageUrl: firestoreProduct.image || firestoreProduct.imageUrl,
        category: category,
        inStock: true
      }).save();
      
      count++;
    }
    
    console.log(`Successfully imported ${count} products from Firestore to MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error('Error syncing products:', error);
    process.exit(1);
  }
}

// Helper function to map categories
function mapCategory(category) {
  if (!category) return 'movies';
  
  const categoryMap = {
    'shows': 'tv-shows',
    'music': 'movies',
    'sports': 'movies',
    'motivation': 'movies',
    'games': 'anime',
  };
  
  return categoryMap[category] || category;
}

// Run the sync
sync(); 
        console.log('Please ensure your Firestore database has products and verify the collection name.');
      }
      
      // List all imported products
      const allProducts = await Product.find({});
      console.log('\nImported products:');
      if (allProducts.length > 0) {
        allProducts.forEach((product, i) => {
          console.log(`[${i+1}] ${product.name} (${product.category}) - $${product.price}`);
        });
      } else {
        console.log('No products were imported to MongoDB.');
      }
      
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      console.log('\nPlease check that:');
      console.log('1. Your Firebase configuration is correct');
      console.log('2. You have products in your Firestore collections');
      console.log('3. You have the necessary permissions to access the Firestore database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error syncing products:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the sync
sync(); 
    console.log(`Found ${snapshot.size} products in Firestore`);
    
    // Import each product to MongoDB
    let count = 0;
    for (const doc of snapshot.docs) {
      const firestoreProduct = doc.data();
      const productId = doc.id;
      
      console.log(`Importing: ${firestoreProduct.name} (${productId})`);
      
      // Create in main collection
      await new Product({
        customId: productId,
        name: firestoreProduct.name,
        description: firestoreProduct.description,
        price: firestoreProduct.price,
        image: firestoreProduct.image || firestoreProduct.imageUrl,
        category: firestoreProduct.category
      }).save();
      
      // Create in server collection
      const category = mapCategory(firestoreProduct.category);
      await new ServerProduct({
        customId: productId,
        name: firestoreProduct.name,
        description: firestoreProduct.description,
        price: firestoreProduct.price,
        imageUrl: firestoreProduct.image || firestoreProduct.imageUrl,
        category: category,
        inStock: true
      }).save();
      
      count++;
    }
    
    console.log(`Successfully imported ${count} products from Firestore to MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error('Error syncing products:', error);
    process.exit(1);
  }
}

// Helper function to map categories
function mapCategory(category) {
  if (!category) return 'movies';
  
  const categoryMap = {
    'shows': 'tv-shows',
    'music': 'movies',
    'sports': 'movies',
    'motivation': 'movies',
    'games': 'anime',
  };
  
  return categoryMap[category] || category;
}

// Run the sync
sync(); 
        console.log('Please ensure your Firestore database has products and verify the collection name.');
      }
      
      // List all imported products
      const allProducts = await Product.find({});
      console.log('\nImported products:');
      if (allProducts.length > 0) {
        allProducts.forEach((product, i) => {
          console.log(`[${i+1}] ${product.name} (${product.category}) - $${product.price}`);
        });
      } else {
        console.log('No products were imported to MongoDB.');
      }
      
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      console.log('\nPlease check that:');
      console.log('1. Your Firebase configuration is correct');
      console.log('2. You have products in your Firestore collections');
      console.log('3. You have the necessary permissions to access the Firestore database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error syncing products:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the sync
sync(); 
    console.log(`Found ${snapshot.size} products in Firestore`);
    
    // Import each product to MongoDB
    let count = 0;
    for (const doc of snapshot.docs) {
      const firestoreProduct = doc.data();
      const productId = doc.id;
      
      console.log(`Importing: ${firestoreProduct.name} (${productId})`);
      
      // Create in main collection
      await new Product({
        customId: productId,
        name: firestoreProduct.name,
        description: firestoreProduct.description,
        price: firestoreProduct.price,
        image: firestoreProduct.image || firestoreProduct.imageUrl,
        category: firestoreProduct.category
      }).save();
      
      // Create in server collection
      const category = mapCategory(firestoreProduct.category);
      await new ServerProduct({
        customId: productId,
        name: firestoreProduct.name,
        description: firestoreProduct.description,
        price: firestoreProduct.price,
        imageUrl: firestoreProduct.image || firestoreProduct.imageUrl,
        category: category,
        inStock: true
      }).save();
      
      count++;
    }
    
    console.log(`Successfully imported ${count} products from Firestore to MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error('Error syncing products:', error);
    process.exit(1);
  }
}

// Helper function to map categories
function mapCategory(category) {
  if (!category) return 'movies';
  
  const categoryMap = {
    'shows': 'tv-shows',
    'music': 'movies',
    'sports': 'movies',
    'motivation': 'movies',
    'games': 'anime',
  };
  
  return categoryMap[category] || category;
}

// Run the sync
sync(); 