import mongoose from 'mongoose';

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017/poster-website';
console.log('Connecting to MongoDB...');

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  family: 4
}).then(async () => {
  console.log('Connected to MongoDB');
  
  // Define schema for both collections
  const productSchema = new mongoose.Schema({
    customId: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String
  });
  
  const serverProductSchema = new mongoose.Schema({
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
  const ServerProduct = mongoose.model('ServerProduct', serverProductSchema);
  
  // Your actual Firestore product IDs and data
  const firestoreProducts = [
    {
      id: '8yBWsARdKwV8eni950ws',
      name: 'Sci-Fi Cityscape',
      description: 'Futuristic cityscape with vibrant neon lights',
      price: 29.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/sci-fi-city.jpg?alt=media',
      category: 'movies'
    },
    {
      id: 'Wk2I1Pzco79xkOBsAmHR',
      name: 'Interstellar',
      description: 'Epic sci-fi poster from the Christopher Nolan film',
      price: 29.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/interstellar.jpg?alt=media',
      category: 'movies'
    },
    {
      id: 'jImw3XrCTFnK5CvrEkRq',
      name: 'Mountain Sunset',
      description: 'Beautiful mountain landscape at sunset',
      price: 24.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/mountain-sunset.jpg?alt=media',
      category: 'nature'
    },
    {
      id: 'Lw2Ja78Tpo90KmnbUtrs',
      name: 'Abstract Waves',
      description: 'Colorful abstract waves design',
      price: 19.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/abstract-waves.jpg?alt=media',
      category: 'abstract'
    },
    {
      id: 'Qp7YmN3rTl28ZxVbEsWd',
      name: 'Tokyo Nights',
      description: 'Neon cityscape of Tokyo at night',
      price: 27.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/tokyo-nights.jpg?alt=media',
      category: 'movies'
    },
    {
      id: 'Kb9UcV2xRn17JpZqFwGh',
      name: 'Attack on Titan',
      description: 'Epic anime poster featuring the Survey Corps',
      price: 22.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/attack-on-titan.jpg?alt=media',
      category: 'anime'
    },
    {
      id: 'X3dPm5nBs76FgJkRtLzY',
      name: 'Breaking Bad',
      description: 'Iconic poster from the award-winning TV series',
      price: 26.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/breaking-bad.jpg?alt=media',
      category: 'shows'
    },
    {
      id: 'V5cTp8bWx23SkLmFnZrQ',
      name: 'Minimal Geometry',
      description: 'Clean and elegant geometric abstract design',
      price: 18.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/minimal-geometry.jpg?alt=media',
      category: 'abstract'
    },
    {
      id: 'H7jRs2FdV34PmNbXzQcE',
      name: 'Starry Night',
      description: 'Beautiful night sky with stars over a mountain landscape',
      price: 23.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/starry-night.jpg?alt=media',
      category: 'nature'
    },
    {
      id: '8a35D0MCvJlrdDvcVtAF',
      name: 'Cyberpunk City',
      description: 'Dystopian cyberpunk cityscape with neon lights',
      price: 26.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/cyberpunk.jpg?alt=media',
      category: 'movies'
    },
    {
      id: 'HMVutd6XgoqRkGDewVhs',
      name: 'Ocean Sunset',
      description: 'Peaceful ocean view with beautiful sunset colors',
      price: 24.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/ocean-sunset.jpg?alt=media',
      category: 'nature'
    },
    {
      id: 'XxYGHw8axqwNJDdsyIuQ',
      name: 'Your Name',
      description: 'Beautiful anime poster from the hit movie',
      price: 27.99,
      image: 'https://firebasestorage.googleapis.com/v0/b/poster-website-9e097.appspot.com/o/your-name.jpg?alt=media',
      category: 'anime'
    }
  ];
  
  let addedToMain = 0;
  let addedToServer = 0;
  
  // Process each product
  for (const product of firestoreProducts) {
    try {
      // Check if product already exists in main collection
      const existingProduct = await Product.findOne({ customId: product.id });
      
      // Add or update in main collection
      if (existingProduct) {
        console.log(`Product ${product.name} already exists in main collection, updating...`);
        existingProduct.name = product.name;
        existingProduct.description = product.description;
        existingProduct.price = product.price;
        existingProduct.image = product.image;
        existingProduct.category = product.category;
        await existingProduct.save();
      } else {
        console.log(`Adding product ${product.name} to main collection...`);
        const newProduct = new Product({
          customId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category
        });
        await newProduct.save();
        addedToMain++;
      }
      
      // Now also add to server collection (which has slightly different schema)
      const existingServerProduct = await ServerProduct.findOne({ customId: product.id });
      
      if (existingServerProduct) {
        console.log(`Product ${product.name} already exists in server collection, updating...`);
        existingServerProduct.name = product.name;
        existingServerProduct.description = product.description;
        existingServerProduct.price = product.price;
        existingServerProduct.imageUrl = product.image; // Note the field name difference
        existingServerProduct.category = mapCategory(product.category);
        existingServerProduct.inStock = true;
        await existingServerProduct.save();
      } else {
        console.log(`Adding product ${product.name} to server collection...`);
        const newServerProduct = new ServerProduct({
          customId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.image, // Note the field name difference
          category: mapCategory(product.category),
          inStock: true
        });
        await newServerProduct.save();
        addedToServer++;
      }
    } catch (error) {
      console.error(`Error processing product ${product.name}:`, error);
    }
  }
  
  console.log(`\nAdded ${addedToMain} products to main collection`);
  console.log(`Added ${addedToServer} products to server collection`);
  
  console.log('\nDone');
  process.exit(0);
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Helper function to map categories
function mapCategory(category) {
  const categoryMap = {
    'shows': 'tv-shows',
    'music': 'movies',
    'sports': 'movies',
    'motivation': 'movies',
    'games': 'anime',
  };
  
  return categoryMap[category] || category;
} 