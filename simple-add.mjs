import mongoose from 'mongoose';

async function addPosters() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/poster-website');
    console.log('Connected to MongoDB');
    
    // Create schema and model for products
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String
    });
    
    // Create models
    const Product = mongoose.model('Product', productSchema);
    
    // Clear existing data
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    // Sample data
    const products = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'TV show poster',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Anime poster',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      }
    ];
    
    // Add products
    console.log('Adding products:');
    for (const product of products) {
      console.log(`Adding ${product.name}`);
      await new Product(product).save();
    }
    
    // Verify
    const count = await Product.countDocuments();
    console.log(`Added ${count} products`);
    
    const allProducts = await Product.find({});
    console.log('Products in database:');
    allProducts.forEach(p => console.log(`- ${p.name} (${p.category})`));
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

addPosters(); 
 
 

async function addPosters() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/poster-website');
    console.log('Connected to MongoDB');
    
    // Create schema and model for products
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String
    });
    
    // Create models
    const Product = mongoose.model('Product', productSchema);
    
    // Clear existing data
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    // Sample data
    const products = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'TV show poster',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Anime poster',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      }
    ];
    
    // Add products
    console.log('Adding products:');
    for (const product of products) {
      console.log(`Adding ${product.name}`);
      await new Product(product).save();
    }
    
    // Verify
    const count = await Product.countDocuments();
    console.log(`Added ${count} products`);
    
    const allProducts = await Product.find({});
    console.log('Products in database:');
    allProducts.forEach(p => console.log(`- ${p.name} (${p.category})`));
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

addPosters(); 
 
 

async function addPosters() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/poster-website');
    console.log('Connected to MongoDB');
    
    // Create schema and model for products
    const productSchema = new mongoose.Schema({
      customId: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String
    });
    
    // Create models
    const Product = mongoose.model('Product', productSchema);
    
    // Clear existing data
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    // Sample data
    const products = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'TV show poster',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Anime poster',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      }
    ];
    
    // Add products
    console.log('Adding products:');
    for (const product of products) {
      console.log(`Adding ${product.name}`);
      await new Product(product).save();
    }
    
    // Verify
    const count = await Product.countDocuments();
    console.log(`Added ${count} products`);
    
    const allProducts = await Product.find({});
    console.log('Products in database:');
    allProducts.forEach(p => console.log(`- ${p.name} (${p.category})`));
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

addPosters(); 
 
 