import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables if available
dotenv.config();

async function checkMongoDB() {
  try {
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
    
    // Get counts
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection: ${productCount}`);
    console.log(`Products in server collection: ${serverProductCount}`);
    
    // List all products
    console.log('\nListing all products:');
    const products = await Product.find({}).lean();
    
    products.forEach((product, index) => {
      console.log(`\n[${index + 1}] ${product.name} (${product.category})`);
      console.log(`   Price: $${product.price}`);
      console.log(`   ID: ${product.customId}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking MongoDB:', error);
    process.exit(1);
  }
}

// Run the function
checkMongoDB(); 
 
 
import dotenv from 'dotenv';

// Load environment variables if available
dotenv.config();

async function checkMongoDB() {
  try {
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
    
    // Get counts
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection: ${productCount}`);
    console.log(`Products in server collection: ${serverProductCount}`);
    
    // List all products
    console.log('\nListing all products:');
    const products = await Product.find({}).lean();
    
    products.forEach((product, index) => {
      console.log(`\n[${index + 1}] ${product.name} (${product.category})`);
      console.log(`   Price: $${product.price}`);
      console.log(`   ID: ${product.customId}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking MongoDB:', error);
    process.exit(1);
  }
}

// Run the function
checkMongoDB(); 
 
 
import dotenv from 'dotenv';

// Load environment variables if available
dotenv.config();

async function checkMongoDB() {
  try {
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
    
    // Get counts
    const productCount = await Product.countDocuments();
    const serverProductCount = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection: ${productCount}`);
    console.log(`Products in server collection: ${serverProductCount}`);
    
    // List all products
    console.log('\nListing all products:');
    const products = await Product.find({}).lean();
    
    products.forEach((product, index) => {
      console.log(`\n[${index + 1}] ${product.name} (${product.category})`);
      console.log(`   Price: $${product.price}`);
      console.log(`   ID: ${product.customId}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking MongoDB:', error);
    process.exit(1);
  }
}

// Run the function
checkMongoDB(); 
 
 