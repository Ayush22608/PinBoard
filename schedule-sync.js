/**
 * Scheduled Synchronization Script
 * 
 * This script is designed to be deployed as a cron job to regularly
 * synchronize data between Firestore and MongoDB Atlas.
 * 
 * Deploy this file to a service like Render.com or Railway.app that
 * supports scheduled jobs.
 */

import mongoose from 'mongoose';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import config from './config.js';

// Time interval in milliseconds (1 hour = 3600000 ms)
const SYNC_INTERVAL = process.env.SYNC_INTERVAL || 3600000;

async function syncToAtlas() {
  console.log(`[${new Date().toISOString()}] Starting Firestore to MongoDB Atlas sync...`);
  
  try {
    // Initialize Firebase
    const app = initializeApp(config.firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    
    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    console.log(`Using connection URL: ${config.MONGODB_ATLAS_URI}`);
    
    await mongoose.connect(config.MONGODB_ATLAS_URI);
    console.log('Connected to MongoDB Atlas successfully');
    
    // Define schemas
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      lastUpdated: { type: Date, default: Date.now }
    });
    
    const serverSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
      category: String,
      inStock: Boolean,
      lastUpdated: { type: Date, default: Date.now }
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
    
    // Get data from Firestore
    console.log('Fetching posters from Firestore "posters" collection...');
    const postersCollection = collection(firestore, 'posters');
    const snapshot = await getDocs(postersCollection);
    
    if (snapshot.empty) {
      console.log('No posters found in Firestore "posters" collection.');
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
        
        // Update or create in Product collection
        await Product.findOneAndUpdate(
          { customId: posterId },
          {
            customId: posterId,
            name,
            description,
            price,
            image,
            category,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
        
        // Update or create in ServerProduct collection
        await ServerProduct.findOneAndUpdate(
          { customId: posterId },
          {
            customId: posterId,
            name,
            description,
            price,
            imageUrl: image,
            category,
            inStock: true,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
        
        successCount++;
        console.log(`Synced: ${name}`);
      } catch (err) {
        console.error(`Error syncing poster: ${err.message}`);
      }
    }
    
    console.log(`Sync complete. Successfully synced ${successCount} of ${snapshot.size} posters to MongoDB Atlas.`);
    
    // Verify the results
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    console.log(`MongoDB Atlas now contains ${productCount} products and ${serverProductCount} server products.`);
    
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    // Close the MongoDB connection
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        console.log('MongoDB Atlas connection closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}

// For deployment as a scheduled job
if (process.env.RUN_AS_SCHEDULED_JOB) {
  // Run immediately on startup
  syncToAtlas();
  
  // Then run at the specified interval
  setInterval(syncToAtlas, SYNC_INTERVAL);
} else {
  // For manual/one-time execution
  syncToAtlas();
}

export default syncToAtlas;

/**
 * PRODUCTION IMPLEMENTATION:
 * 
 * For production, you would:
 * 1. Set up a dedicated server or serverless function for this task
 * 2. Use proper environment variables for configuration
 * 3. Implement monitoring and error notifications
 * 4. Use a more robust scheduling mechanism like cron jobs
 * 
 * Example services to consider:
 * - Heroku Scheduler
 * - Google Cloud Functions with Cloud Scheduler
 * - AWS Lambda with EventBridge
 * - Azure Functions with Timer triggers
 */ 
 
 
 * Scheduled Synchronization Script
 * 
 * This script is designed to be deployed as a cron job to regularly
 * synchronize data between Firestore and MongoDB Atlas.
 * 
 * Deploy this file to a service like Render.com or Railway.app that
 * supports scheduled jobs.
 */

import mongoose from 'mongoose';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import config from './config.js';

// Time interval in milliseconds (1 hour = 3600000 ms)
const SYNC_INTERVAL = process.env.SYNC_INTERVAL || 3600000;

async function syncToAtlas() {
  console.log(`[${new Date().toISOString()}] Starting Firestore to MongoDB Atlas sync...`);
  
  try {
    // Initialize Firebase
    const app = initializeApp(config.firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    
    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    console.log(`Using connection URL: ${config.MONGODB_ATLAS_URI}`);
    
    await mongoose.connect(config.MONGODB_ATLAS_URI);
    console.log('Connected to MongoDB Atlas successfully');
    
    // Define schemas
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      lastUpdated: { type: Date, default: Date.now }
    });
    
    const serverSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
      category: String,
      inStock: Boolean,
      lastUpdated: { type: Date, default: Date.now }
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
    
    // Get data from Firestore
    console.log('Fetching posters from Firestore "posters" collection...');
    const postersCollection = collection(firestore, 'posters');
    const snapshot = await getDocs(postersCollection);
    
    if (snapshot.empty) {
      console.log('No posters found in Firestore "posters" collection.');
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
        
        // Update or create in Product collection
        await Product.findOneAndUpdate(
          { customId: posterId },
          {
            customId: posterId,
            name,
            description,
            price,
            image,
            category,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
        
        // Update or create in ServerProduct collection
        await ServerProduct.findOneAndUpdate(
          { customId: posterId },
          {
            customId: posterId,
            name,
            description,
            price,
            imageUrl: image,
            category,
            inStock: true,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
        
        successCount++;
        console.log(`Synced: ${name}`);
      } catch (err) {
        console.error(`Error syncing poster: ${err.message}`);
      }
    }
    
    console.log(`Sync complete. Successfully synced ${successCount} of ${snapshot.size} posters to MongoDB Atlas.`);
    
    // Verify the results
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    console.log(`MongoDB Atlas now contains ${productCount} products and ${serverProductCount} server products.`);
    
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    // Close the MongoDB connection
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        console.log('MongoDB Atlas connection closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}

// For deployment as a scheduled job
if (process.env.RUN_AS_SCHEDULED_JOB) {
  // Run immediately on startup
  syncToAtlas();
  
  // Then run at the specified interval
  setInterval(syncToAtlas, SYNC_INTERVAL);
} else {
  // For manual/one-time execution
  syncToAtlas();
}

export default syncToAtlas;

/**
 * PRODUCTION IMPLEMENTATION:
 * 
 * For production, you would:
 * 1. Set up a dedicated server or serverless function for this task
 * 2. Use proper environment variables for configuration
 * 3. Implement monitoring and error notifications
 * 4. Use a more robust scheduling mechanism like cron jobs
 * 
 * Example services to consider:
 * - Heroku Scheduler
 * - Google Cloud Functions with Cloud Scheduler
 * - AWS Lambda with EventBridge
 * - Azure Functions with Timer triggers
 */ 
 
 
 * Scheduled Synchronization Script
 * 
 * This script is designed to be deployed as a cron job to regularly
 * synchronize data between Firestore and MongoDB Atlas.
 * 
 * Deploy this file to a service like Render.com or Railway.app that
 * supports scheduled jobs.
 */

import mongoose from 'mongoose';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import config from './config.js';

// Time interval in milliseconds (1 hour = 3600000 ms)
const SYNC_INTERVAL = process.env.SYNC_INTERVAL || 3600000;

async function syncToAtlas() {
  console.log(`[${new Date().toISOString()}] Starting Firestore to MongoDB Atlas sync...`);
  
  try {
    // Initialize Firebase
    const app = initializeApp(config.firebaseConfig);
    const firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
    
    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    console.log(`Using connection URL: ${config.MONGODB_ATLAS_URI}`);
    
    await mongoose.connect(config.MONGODB_ATLAS_URI);
    console.log('Connected to MongoDB Atlas successfully');
    
    // Define schemas
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      lastUpdated: { type: Date, default: Date.now }
    });
    
    const serverSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
      category: String,
      inStock: Boolean,
      lastUpdated: { type: Date, default: Date.now }
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
    
    // Get data from Firestore
    console.log('Fetching posters from Firestore "posters" collection...');
    const postersCollection = collection(firestore, 'posters');
    const snapshot = await getDocs(postersCollection);
    
    if (snapshot.empty) {
      console.log('No posters found in Firestore "posters" collection.');
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
        
        // Update or create in Product collection
        await Product.findOneAndUpdate(
          { customId: posterId },
          {
            customId: posterId,
            name,
            description,
            price,
            image,
            category,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
        
        // Update or create in ServerProduct collection
        await ServerProduct.findOneAndUpdate(
          { customId: posterId },
          {
            customId: posterId,
            name,
            description,
            price,
            imageUrl: image,
            category,
            inStock: true,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
        
        successCount++;
        console.log(`Synced: ${name}`);
      } catch (err) {
        console.error(`Error syncing poster: ${err.message}`);
      }
    }
    
    console.log(`Sync complete. Successfully synced ${successCount} of ${snapshot.size} posters to MongoDB Atlas.`);
    
    // Verify the results
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    console.log(`MongoDB Atlas now contains ${productCount} products and ${serverProductCount} server products.`);
    
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    // Close the MongoDB connection
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        console.log('MongoDB Atlas connection closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}

// For deployment as a scheduled job
if (process.env.RUN_AS_SCHEDULED_JOB) {
  // Run immediately on startup
  syncToAtlas();
  
  // Then run at the specified interval
  setInterval(syncToAtlas, SYNC_INTERVAL);
} else {
  // For manual/one-time execution
  syncToAtlas();
}

export default syncToAtlas;

/**
 * PRODUCTION IMPLEMENTATION:
 * 
 * For production, you would:
 * 1. Set up a dedicated server or serverless function for this task
 * 2. Use proper environment variables for configuration
 * 3. Implement monitoring and error notifications
 * 4. Use a more robust scheduling mechanism like cron jobs
 * 
 * Example services to consider:
 * - Heroku Scheduler
 * - Google Cloud Functions with Cloud Scheduler
 * - AWS Lambda with EventBridge
 * - Azure Functions with Timer triggers
 */ 
 
 