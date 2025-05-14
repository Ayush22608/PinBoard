const mongoose = require('mongoose');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function importPosters() {
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
    
    // Get products from Firestore "posters" collection
    console.log('Fetching posters from Firestore "posters" collection...');
    
    try {
      const postersCollection = collection(firestore, 'posters');
      const snapshot = await getDocs(postersCollection);
      
      if (snapshot.empty) {
        console.log('No posters found in Firestore "posters" collection.');
        console.log('Please add posters through your admin dashboard first.');
        mongoose.connection.close();
        return;
      }
      
      console.log(`Found ${snapshot.size} posters in Firestore`);
      
      // Import each poster to MongoDB
      let count = 0;
      for (const doc of snapshot.docs) {
        const firestorePoster = doc.data();
        const posterId = doc.id;
        
        console.log(`Importing: ${firestorePoster.name || 'Unnamed poster'} (${posterId})`);
        
        // Make sure we have all required fields, use defaults if missing
        const name = firestorePoster.name || 'Unnamed Poster';
        const description = firestorePoster.description || 'No description available';
        const price = firestorePoster.price || 19.99;
        const image = firestorePoster.image || firestorePoster.imageUrl || '';
        const category = firestorePoster.category || 'movies';
        
        // Create in main collection
        await new Product({
          customId: posterId,
          name: name,
          description: description,
          price: price,
          image: image,
          category: category
        }).save();
        
        // Create in server collection
        await new ServerProduct({
          customId: posterId,
          name: name,
          description: description,
          price: price,
          imageUrl: image,
          category: category,
          inStock: true
        }).save();
        
        count++;
      }
      
      console.log(`Successfully imported ${count} posters from Firestore to MongoDB`);
      
      // List all imported posters
      const allProducts = await Product.find({});
      console.log('\nImported posters:');
      if (allProducts.length > 0) {
        allProducts.forEach((product, i) => {
          console.log(`[${i+1}] ${product.name} (${product.category}) - $${product.price}`);
        });
      } else {
        console.log('No posters were imported to MongoDB.');
      }
      
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      console.log('\nPlease check that:');
      console.log('1. Your Firebase configuration is correct');
      console.log('2. You have posters in your Firestore "posters" collection');
      console.log('3. You have the necessary permissions to access the Firestore database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing posters:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the import
importPosters(); 
 
 
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function importPosters() {
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
    
    // Get products from Firestore "posters" collection
    console.log('Fetching posters from Firestore "posters" collection...');
    
    try {
      const postersCollection = collection(firestore, 'posters');
      const snapshot = await getDocs(postersCollection);
      
      if (snapshot.empty) {
        console.log('No posters found in Firestore "posters" collection.');
        console.log('Please add posters through your admin dashboard first.');
        mongoose.connection.close();
        return;
      }
      
      console.log(`Found ${snapshot.size} posters in Firestore`);
      
      // Import each poster to MongoDB
      let count = 0;
      for (const doc of snapshot.docs) {
        const firestorePoster = doc.data();
        const posterId = doc.id;
        
        console.log(`Importing: ${firestorePoster.name || 'Unnamed poster'} (${posterId})`);
        
        // Make sure we have all required fields, use defaults if missing
        const name = firestorePoster.name || 'Unnamed Poster';
        const description = firestorePoster.description || 'No description available';
        const price = firestorePoster.price || 19.99;
        const image = firestorePoster.image || firestorePoster.imageUrl || '';
        const category = firestorePoster.category || 'movies';
        
        // Create in main collection
        await new Product({
          customId: posterId,
          name: name,
          description: description,
          price: price,
          image: image,
          category: category
        }).save();
        
        // Create in server collection
        await new ServerProduct({
          customId: posterId,
          name: name,
          description: description,
          price: price,
          imageUrl: image,
          category: category,
          inStock: true
        }).save();
        
        count++;
      }
      
      console.log(`Successfully imported ${count} posters from Firestore to MongoDB`);
      
      // List all imported posters
      const allProducts = await Product.find({});
      console.log('\nImported posters:');
      if (allProducts.length > 0) {
        allProducts.forEach((product, i) => {
          console.log(`[${i+1}] ${product.name} (${product.category}) - $${product.price}`);
        });
      } else {
        console.log('No posters were imported to MongoDB.');
      }
      
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      console.log('\nPlease check that:');
      console.log('1. Your Firebase configuration is correct');
      console.log('2. You have posters in your Firestore "posters" collection');
      console.log('3. You have the necessary permissions to access the Firestore database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing posters:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the import
importPosters(); 
 
 
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function importPosters() {
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
    
    // Get products from Firestore "posters" collection
    console.log('Fetching posters from Firestore "posters" collection...');
    
    try {
      const postersCollection = collection(firestore, 'posters');
      const snapshot = await getDocs(postersCollection);
      
      if (snapshot.empty) {
        console.log('No posters found in Firestore "posters" collection.');
        console.log('Please add posters through your admin dashboard first.');
        mongoose.connection.close();
        return;
      }
      
      console.log(`Found ${snapshot.size} posters in Firestore`);
      
      // Import each poster to MongoDB
      let count = 0;
      for (const doc of snapshot.docs) {
        const firestorePoster = doc.data();
        const posterId = doc.id;
        
        console.log(`Importing: ${firestorePoster.name || 'Unnamed poster'} (${posterId})`);
        
        // Make sure we have all required fields, use defaults if missing
        const name = firestorePoster.name || 'Unnamed Poster';
        const description = firestorePoster.description || 'No description available';
        const price = firestorePoster.price || 19.99;
        const image = firestorePoster.image || firestorePoster.imageUrl || '';
        const category = firestorePoster.category || 'movies';
        
        // Create in main collection
        await new Product({
          customId: posterId,
          name: name,
          description: description,
          price: price,
          image: image,
          category: category
        }).save();
        
        // Create in server collection
        await new ServerProduct({
          customId: posterId,
          name: name,
          description: description,
          price: price,
          imageUrl: image,
          category: category,
          inStock: true
        }).save();
        
        count++;
      }
      
      console.log(`Successfully imported ${count} posters from Firestore to MongoDB`);
      
      // List all imported posters
      const allProducts = await Product.find({});
      console.log('\nImported posters:');
      if (allProducts.length > 0) {
        allProducts.forEach((product, i) => {
          console.log(`[${i+1}] ${product.name} (${product.category}) - $${product.price}`);
        });
      } else {
        console.log('No posters were imported to MongoDB.');
      }
      
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      console.log('\nPlease check that:');
      console.log('1. Your Firebase configuration is correct');
      console.log('2. You have posters in your Firestore "posters" collection');
      console.log('3. You have the necessary permissions to access the Firestore database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing posters:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the import
importPosters(); 
 
 