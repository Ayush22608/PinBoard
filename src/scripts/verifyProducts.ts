import { connectDB } from '../utils/db';
import { Product } from '../models/Product';

const verifyProducts = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Fetch all products
    const products = await Product.find({});
    
    console.log('\n=== MongoDB Products ===');
    console.log(`Total products: ${products.length}\n`);
    
    // Display each product
    products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`);
      console.log(`ID: ${product._id}`);
      console.log(`Custom ID (Firebase): ${product.customId || 'Not set'}`);
      console.log(`Name: ${product.name}`);
      console.log(`Category: ${product.category}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log('------------------------\n');
    });

  } catch (error) {
    console.error('Error verifying products:', error);
  } finally {
    // Close the database connection
    process.exit(0);
  }
};

// Run the function
verifyProducts(); 