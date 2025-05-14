import mongoose from 'mongoose';

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017/poster-website';
console.log('Connecting to MongoDB...');

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  family: 4
}).then(async () => {
  console.log('Connected to MongoDB');
  
  // Define a minimal product schema
  const productSchema = new mongoose.Schema({
    customId: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String
  });
  
  // Create model
  const Product = mongoose.model('Product', productSchema);
  
  // Search for the specific product by customId
  console.log('Searching for product with customId: Wk2I1Pzco79xkOBsAmHR');
  const product = await Product.findOne({ customId: 'Wk2I1Pzco79xkOBsAmHR' });
  
  if (product) {
    console.log('Found product:');
    console.log(JSON.stringify(product, null, 2));
  } else {
    console.log('Product not found with customId: Wk2I1Pzco79xkOBsAmHR');
    
    // Let's look for products with similar IDs (partial match)
    console.log('\nSearching for products with similar IDs...');
    const similarProducts = await Product.find({
      customId: { $regex: 'Wk2I1', $options: 'i' }
    });
    
    if (similarProducts.length > 0) {
      console.log(`Found ${similarProducts.length} products with similar IDs:`);
      similarProducts.forEach(p => {
        console.log(`- ${p.name}: ${p.customId}`);
      });
    } else {
      console.log('No products with similar IDs found');
    }
    
    // List all products to see what's available
    console.log('\nListing all products in the database:');
    const allProducts = await Product.find({});
    console.log(`Total products: ${allProducts.length}`);
    
    allProducts.forEach((p, index) => {
      console.log(`${index+1}. ${p.name} (ID: ${p._id}, CustomID: ${p.customId || 'None'})`);
    });
  }
  
  // Close connection and exit
  console.log('\nDone');
  process.exit(0);
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 