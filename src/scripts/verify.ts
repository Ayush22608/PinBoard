import { connectDB } from '../utils/db';
import { Product } from '../models/Product';

interface IProduct {
  name: string;
  category: string;
  price: number;
  image: string;
}

const verifyData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Fetch all products
    const products = await Product.find({});
    
    console.log('\n=== Database Products ===');
    console.log(`Total products: ${products.length}\n`);
    
    // Display each product
    products.forEach((product: IProduct, index: number) => {
      console.log(`Product ${index + 1}:`);
      console.log(`Name: ${product.name}`);
      console.log(`Category: ${product.category}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log('------------------------\n');
    });

  } catch (error) {
    console.error('Error verifying data:', error);
  } finally {
    // Close the database connection
    process.exit(0);
  }
};

verifyData(); 