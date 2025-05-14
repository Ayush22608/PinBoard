import { connectDB } from './db';
import { Product } from '../models/Product';

/**
 * This utility script adds customId field to products that don't have it.
 * It can be used to match Firebase-style IDs with MongoDB products.
 */
const updateProductIds = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');
    
    // First, let's list all products to help identify them
    console.log('Listing all products in database:');
    const allProducts = await Product.find({});
    
    if (allProducts.length === 0) {
      console.log('No products found in database!');
      process.exit(1);
    }
    
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product._id})`);
    });
    
    // The specific Firebase ID we're trying to fix
    const targetFirebaseId = 'Wk2I1Pzco79xkOBsAmHR';
    
    // Option 1: Update the first product with this ID (if you just need a quick fix)
    console.log(`\nUpdating first product with Firebase ID: ${targetFirebaseId}`);
    
    if (allProducts.length > 0) {
      const firstProduct = allProducts[0];
      firstProduct.customId = targetFirebaseId;
      await firstProduct.save();
      console.log(`Updated product "${firstProduct.name}" with customId: ${targetFirebaseId}`);
    }
    
    // Option 2: Update specific products with mapped IDs
    // This is more precise but requires knowing the name mapping
    console.log('\nAttempting mapped updates:');
    const idMappings = [
      { firebaseId: targetFirebaseId, productName: 'Your Product Name Here' },
      // Add more mappings as needed
    ];
    
    for (const mapping of idMappings) {
      // Find the product by name (using case-insensitive regex for better matching)
      const product = await Product.findOne({ 
        name: { $regex: new RegExp(`^${mapping.productName}$`, 'i') } 
      });
      
      if (product) {
        // Update with the Firebase ID
        product.customId = mapping.firebaseId;
        await product.save();
        console.log(`Updated product "${mapping.productName}" with customId: ${mapping.firebaseId}`);
      } else {
        console.log(`Product not found: ${mapping.productName}`);
      }
    }
    
    // Option 3: Create a new product with this ID if none exist
    if (allProducts.length === 0) {
      console.log('\nNo products exist. Creating a sample product with the target ID.');
      const newProduct = new Product({
        customId: targetFirebaseId,
        name: 'Sample Poster',
        description: 'A beautiful poster created as a test',
        price: 79,
        image: '/placeholder.jpg',
        category: 'movies'
      });
      
      await newProduct.save();
      console.log(`Created new product with customId: ${targetFirebaseId}`);
    }
    
    console.log('\nProduct ID updates completed');
    process.exit(0);
  } catch (error) {
    console.error('Error updating product IDs:', error);
    process.exit(1);
  }
};

// Run the function
updateProductIds(); 