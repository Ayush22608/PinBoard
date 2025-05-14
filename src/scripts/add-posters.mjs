import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables if available
dotenv.config();

async function addPosters() {
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
    
    // Sample posters data
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers',
        price: 19.99,
        image: 'https://example.com/avengers.jpg', // Replace with actual image URL
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster',
        price: 24.99,
        image: 'https://example.com/stranger-things.jpg', // Replace with actual image URL
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster',
        price: 18.99,
        image: 'https://example.com/aot.jpg', // Replace with actual image URL
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album poster',
        price: 22.99,
        image: 'https://example.com/pink-floyd.jpg', // Replace with actual image URL
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball stars poster featuring NBA legends',
        price: 17.99,
        image: 'https://example.com/nba.jpg', // Replace with actual image URL
        category: 'sports'
      }
    ];
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name}`);
      
      // Create in main collection
      await new Product({
        customId: poster.customId,
        name: poster.name,
        description: poster.description,
        price: poster.price,
        image: poster.image,
        category: poster.category
      }).save();
      
      // Create in server collection
      await new ServerProduct({
        customId: poster.customId,
        name: poster.name,
        description: poster.description,
        price: poster.price,
        imageUrl: poster.image,
        category: poster.category,
        inStock: true
      }).save();
    }
    
    console.log(`Successfully added ${posters.length} posters to MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding posters:', error);
    process.exit(1);
  }
}

// Run the function
addPosters(); 
 
import dotenv from 'dotenv';

// Load environment variables if available
dotenv.config();

async function addPosters() {
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
    
    // Sample posters data
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers',
        price: 19.99,
        image: 'https://example.com/avengers.jpg', // Replace with actual image URL
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster',
        price: 24.99,
        image: 'https://example.com/stranger-things.jpg', // Replace with actual image URL
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster',
        price: 18.99,
        image: 'https://example.com/aot.jpg', // Replace with actual image URL
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album poster',
        price: 22.99,
        image: 'https://example.com/pink-floyd.jpg', // Replace with actual image URL
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball stars poster featuring NBA legends',
        price: 17.99,
        image: 'https://example.com/nba.jpg', // Replace with actual image URL
        category: 'sports'
      }
    ];
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name}`);
      
      // Create in main collection
      await new Product({
        customId: poster.customId,
        name: poster.name,
        description: poster.description,
        price: poster.price,
        image: poster.image,
        category: poster.category
      }).save();
      
      // Create in server collection
      await new ServerProduct({
        customId: poster.customId,
        name: poster.name,
        description: poster.description,
        price: poster.price,
        imageUrl: poster.image,
        category: poster.category,
        inStock: true
      }).save();
    }
    
    console.log(`Successfully added ${posters.length} posters to MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding posters:', error);
    process.exit(1);
  }
}

// Run the function
addPosters(); 
 
import dotenv from 'dotenv';

// Load environment variables if available
dotenv.config();

async function addPosters() {
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
    
    // Sample posters data
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers',
        price: 19.99,
        image: 'https://example.com/avengers.jpg', // Replace with actual image URL
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster',
        price: 24.99,
        image: 'https://example.com/stranger-things.jpg', // Replace with actual image URL
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster',
        price: 18.99,
        image: 'https://example.com/aot.jpg', // Replace with actual image URL
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album poster',
        price: 22.99,
        image: 'https://example.com/pink-floyd.jpg', // Replace with actual image URL
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball stars poster featuring NBA legends',
        price: 17.99,
        image: 'https://example.com/nba.jpg', // Replace with actual image URL
        category: 'sports'
      }
    ];
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name}`);
      
      // Create in main collection
      await new Product({
        customId: poster.customId,
        name: poster.name,
        description: poster.description,
        price: poster.price,
        image: poster.image,
        category: poster.category
      }).save();
      
      // Create in server collection
      await new ServerProduct({
        customId: poster.customId,
        name: poster.name,
        description: poster.description,
        price: poster.price,
        imageUrl: poster.image,
        category: poster.category,
        inStock: true
      }).save();
    }
    
    console.log(`Successfully added ${posters.length} posters to MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding posters:', error);
    process.exit(1);
  }
}

// Run the function
addPosters(); 
 