import mongoose from 'mongoose';

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017/poster-website';
console.log('Connecting to MongoDB...');

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  family: 4
}).then(async () => {
  console.log('Connected to MongoDB');
  
  // Define product schema
  const productSchema = new mongoose.Schema({
    customId: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String
  }, {
    timestamps: true
  });
  
  // Create model
  const Product = mongoose.model('Product', productSchema);
  
  // Check if product already exists
  const existingProduct = await Product.findOne({ customId: 'Wk2I1Pzco79xkOBsAmHR' });
  
  if (existingProduct) {
    console.log('Product already exists:', existingProduct);
    process.exit(0);
  }
  
  // Define the missing product (replace with actual details from your Firestore)
  const missingProduct = {
    customId: 'Wk2I1Pzco79xkOBsAmHR',
    name: 'Interstellar',
    description: 'Epic sci-fi poster from the Christopher Nolan film',
    price: 29.99,
    image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/interstellar.jpg?alt=media',
    category: 'movies'
  };
  
  // Add the product to MongoDB
  try {
    const newProduct = new Product(missingProduct);
    await newProduct.save();
    console.log('Successfully added missing product:', missingProduct.name);
    
    // Verify product is now in the database
    const verifyProduct = await Product.findOne({ customId: 'Wk2I1Pzco79xkOBsAmHR' });
    if (verifyProduct) {
      console.log('Verified product in database:');
      console.log(JSON.stringify(verifyProduct, null, 2));
    }
  } catch (error) {
    console.error('Error adding product:', error);
  }
  
  // Close connection and exit
  console.log('\nDone');
  process.exit(0);
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 