import mongoose from 'mongoose';

async function clearDatabase() {
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
    
    // Get counts before deletion
    const productCountBefore = await Product.countDocuments();
    const serverProductCountBefore = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection before deletion: ${productCountBefore}`);
    console.log(`Products in server collection before deletion: ${serverProductCountBefore}`);
    
    // Clear data
    console.log('Clearing all products from database...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Verify deletion
    const productCountAfter = await Product.countDocuments();
    const serverProductCountAfter = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection after deletion: ${productCountAfter}`);
    console.log(`Products in server collection after deletion: ${serverProductCountAfter}`);
    
    console.log('Database cleared successfully!');
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

// Run the function
clearDatabase(); 
 
 

async function clearDatabase() {
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
    
    // Get counts before deletion
    const productCountBefore = await Product.countDocuments();
    const serverProductCountBefore = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection before deletion: ${productCountBefore}`);
    console.log(`Products in server collection before deletion: ${serverProductCountBefore}`);
    
    // Clear data
    console.log('Clearing all products from database...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Verify deletion
    const productCountAfter = await Product.countDocuments();
    const serverProductCountAfter = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection after deletion: ${productCountAfter}`);
    console.log(`Products in server collection after deletion: ${serverProductCountAfter}`);
    
    console.log('Database cleared successfully!');
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

// Run the function
clearDatabase(); 
 
 

async function clearDatabase() {
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
    
    // Get counts before deletion
    const productCountBefore = await Product.countDocuments();
    const serverProductCountBefore = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection before deletion: ${productCountBefore}`);
    console.log(`Products in server collection before deletion: ${serverProductCountBefore}`);
    
    // Clear data
    console.log('Clearing all products from database...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Verify deletion
    const productCountAfter = await Product.countDocuments();
    const serverProductCountAfter = await ServerProduct.countDocuments();
    
    console.log(`Products in main collection after deletion: ${productCountAfter}`);
    console.log(`Products in server collection after deletion: ${serverProductCountAfter}`);
    
    console.log('Database cleared successfully!');
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

// Run the function
clearDatabase(); 
 
 