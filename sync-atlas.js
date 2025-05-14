const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const mongoose = require('mongoose');
const config = require('./config');

async function syncFirestoreToAtlas() {
  console.log('Starting Firestore to MongoDB Atlas sync...');
  
  try {
    // Initialize Firebase
    const app = initializeApp(config.firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    
    // Try connecting to MongoDB Atlas first, fallback to local if it fails
    let mongoUri = config.MONGODB_ATLAS_URI;
    try {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas successfully');
    } catch (atlasError) {
      console.warn('Failed to connect to MongoDB Atlas:', atlasError.message);
      console.log('Falling back to local MongoDB...');
      mongoUri = config.MONGODB_LOCAL_URI;
      await mongoose.connect(mongoUri);
      console.log('Connected to local MongoDB instead');
    }
    
    // Define schemas
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
    
    // Define models
    let Product, ServerProduct;
    try {
      Product = mongoose.model('Product');
      ServerProduct = mongoose.model('ServerProduct');
    } catch (e) {
      Product = mongoose.model('Product', productSchema);
      ServerProduct = mongoose.model('ServerProduct', serverSchema);
    }
    
    // Clear existing data
    console.log('Clearing existing posters from MongoDB...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Get data from Firestore
    console.log('Fetching posters from Firestore "posters" collection...');
    const postersCollection = collection(firestore, 'posters');
    const snapshot = await getDocs(postersCollection);
    
    if (snapshot.empty) {
      console.log('No posters found in Firestore.');
      return;
    }
    
    console.log(`Found ${snapshot.size} posters in Firestore.`);
    
    // Import each poster to MongoDB
    let successCount = 0;
    for (const doc of snapshot.docs) {
      try {
        const poster = doc.data();
        const posterId = doc.id;
        
        // Extract data with fallbacks
        const name = poster.name || 'Unnamed Poster';
        const description = poster.description || '';
        const price = poster.price || 0;
        const image = poster.image || poster.imageUrl || '';
        const category = poster.category || 'uncategorized';
        
        // Save to Product collection
        await new Product({
          customId: posterId,
          name,
          description,
          price,
          image,
          category
        }).save();
        
        // Save to ServerProduct collection
        await new ServerProduct({
          customId: posterId,
          name,
          description,
          price,
          imageUrl: image,
          category,
          inStock: true
        }).save();
        
        successCount++;
        console.log(`Imported: ${name}`);
      } catch (err) {
        console.error(`Error importing poster: ${err.message}`);
      }
    }
    
    console.log(`Sync complete. Successfully imported ${successCount} of ${snapshot.size} posters.`);
    
    // Verify the results
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    console.log(`MongoDB now contains ${productCount} products and ${serverProductCount} server products.`);
    console.log(`Data synchronized to: ${mongoUri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
    
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    // Close the MongoDB connection
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}

// Run the sync function
syncFirestoreToAtlas();

module.exports = { syncFirestoreToAtlas }; 
 
 
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const mongoose = require('mongoose');
const config = require('./config');

async function syncFirestoreToAtlas() {
  console.log('Starting Firestore to MongoDB Atlas sync...');
  
  try {
    // Initialize Firebase
    const app = initializeApp(config.firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    
    // Try connecting to MongoDB Atlas first, fallback to local if it fails
    let mongoUri = config.MONGODB_ATLAS_URI;
    try {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas successfully');
    } catch (atlasError) {
      console.warn('Failed to connect to MongoDB Atlas:', atlasError.message);
      console.log('Falling back to local MongoDB...');
      mongoUri = config.MONGODB_LOCAL_URI;
      await mongoose.connect(mongoUri);
      console.log('Connected to local MongoDB instead');
    }
    
    // Define schemas
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
    
    // Define models
    let Product, ServerProduct;
    try {
      Product = mongoose.model('Product');
      ServerProduct = mongoose.model('ServerProduct');
    } catch (e) {
      Product = mongoose.model('Product', productSchema);
      ServerProduct = mongoose.model('ServerProduct', serverSchema);
    }
    
    // Clear existing data
    console.log('Clearing existing posters from MongoDB...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Get data from Firestore
    console.log('Fetching posters from Firestore "posters" collection...');
    const postersCollection = collection(firestore, 'posters');
    const snapshot = await getDocs(postersCollection);
    
    if (snapshot.empty) {
      console.log('No posters found in Firestore.');
      return;
    }
    
    console.log(`Found ${snapshot.size} posters in Firestore.`);
    
    // Import each poster to MongoDB
    let successCount = 0;
    for (const doc of snapshot.docs) {
      try {
        const poster = doc.data();
        const posterId = doc.id;
        
        // Extract data with fallbacks
        const name = poster.name || 'Unnamed Poster';
        const description = poster.description || '';
        const price = poster.price || 0;
        const image = poster.image || poster.imageUrl || '';
        const category = poster.category || 'uncategorized';
        
        // Save to Product collection
        await new Product({
          customId: posterId,
          name,
          description,
          price,
          image,
          category
        }).save();
        
        // Save to ServerProduct collection
        await new ServerProduct({
          customId: posterId,
          name,
          description,
          price,
          imageUrl: image,
          category,
          inStock: true
        }).save();
        
        successCount++;
        console.log(`Imported: ${name}`);
      } catch (err) {
        console.error(`Error importing poster: ${err.message}`);
      }
    }
    
    console.log(`Sync complete. Successfully imported ${successCount} of ${snapshot.size} posters.`);
    
    // Verify the results
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    console.log(`MongoDB now contains ${productCount} products and ${serverProductCount} server products.`);
    console.log(`Data synchronized to: ${mongoUri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
    
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    // Close the MongoDB connection
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}

// Run the sync function
syncFirestoreToAtlas();

module.exports = { syncFirestoreToAtlas }; 
 
 
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const mongoose = require('mongoose');
const config = require('./config');

async function syncFirestoreToAtlas() {
  console.log('Starting Firestore to MongoDB Atlas sync...');
  
  try {
    // Initialize Firebase
    const app = initializeApp(config.firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    
    // Try connecting to MongoDB Atlas first, fallback to local if it fails
    let mongoUri = config.MONGODB_ATLAS_URI;
    try {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas successfully');
    } catch (atlasError) {
      console.warn('Failed to connect to MongoDB Atlas:', atlasError.message);
      console.log('Falling back to local MongoDB...');
      mongoUri = config.MONGODB_LOCAL_URI;
      await mongoose.connect(mongoUri);
      console.log('Connected to local MongoDB instead');
    }
    
    // Define schemas
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
    
    // Define models
    let Product, ServerProduct;
    try {
      Product = mongoose.model('Product');
      ServerProduct = mongoose.model('ServerProduct');
    } catch (e) {
      Product = mongoose.model('Product', productSchema);
      ServerProduct = mongoose.model('ServerProduct', serverSchema);
    }
    
    // Clear existing data
    console.log('Clearing existing posters from MongoDB...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Get data from Firestore
    console.log('Fetching posters from Firestore "posters" collection...');
    const postersCollection = collection(firestore, 'posters');
    const snapshot = await getDocs(postersCollection);
    
    if (snapshot.empty) {
      console.log('No posters found in Firestore.');
      return;
    }
    
    console.log(`Found ${snapshot.size} posters in Firestore.`);
    
    // Import each poster to MongoDB
    let successCount = 0;
    for (const doc of snapshot.docs) {
      try {
        const poster = doc.data();
        const posterId = doc.id;
        
        // Extract data with fallbacks
        const name = poster.name || 'Unnamed Poster';
        const description = poster.description || '';
        const price = poster.price || 0;
        const image = poster.image || poster.imageUrl || '';
        const category = poster.category || 'uncategorized';
        
        // Save to Product collection
        await new Product({
          customId: posterId,
          name,
          description,
          price,
          image,
          category
        }).save();
        
        // Save to ServerProduct collection
        await new ServerProduct({
          customId: posterId,
          name,
          description,
          price,
          imageUrl: image,
          category,
          inStock: true
        }).save();
        
        successCount++;
        console.log(`Imported: ${name}`);
      } catch (err) {
        console.error(`Error importing poster: ${err.message}`);
      }
    }
    
    console.log(`Sync complete. Successfully imported ${successCount} of ${snapshot.size} posters.`);
    
    // Verify the results
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    console.log(`MongoDB now contains ${productCount} products and ${serverProductCount} server products.`);
    console.log(`Data synchronized to: ${mongoUri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
    
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    // Close the MongoDB connection
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}

// Run the sync function
syncFirestoreToAtlas();

module.exports = { syncFirestoreToAtlas }; 
 
 