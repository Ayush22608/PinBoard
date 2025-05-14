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
    
    // Sample posters data with real-life image URLs
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers in the final battle against Thanos',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster featuring the main cast',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster with Eren, Mikasa and the Colossal Titan',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album artwork poster from "The Wall"',
        price: 22.99,
        image: 'https://m.media-amazon.com/images/I/61nXj1oWFOL._AC_SL1000_.jpg',
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball legends poster featuring Michael Jordan, Kobe Bryant, and LeBron James',
        price: 17.99,
        image: 'https://m.media-amazon.com/images/I/813WwJCcGmL._AC_SL1500_.jpg',
        category: 'sports'
      },
      {
        customId: '6',
        name: 'Pulp Fiction',
        description: 'Classic Quentin Tarantino movie poster with Uma Thurman',
        price: 21.99,
        image: 'https://m.media-amazon.com/images/I/61OQycGGMdL._AC_SL1000_.jpg',
        category: 'movies'
      },
      {
        customId: '7',
        name: 'Breaking Bad',
        description: 'Breaking Bad TV series poster featuring Walter White and Jesse Pinkman',
        price: 23.99,
        image: 'https://m.media-amazon.com/images/I/71R+uR3ly-L._AC_SL1000_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '8',
        name: 'Demon Slayer',
        description: 'Demon Slayer anime poster with Tanjiro and Nezuko',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/61vQWc0K6BL._AC_SL1000_.jpg',
        category: 'anime'
      },
      {
        customId: '9',
        name: 'The Beatles - Abbey Road',
        description: 'Iconic Abbey Road album cover poster by The Beatles',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/713EF5eQtGL._AC_SL1060_.jpg',
        category: 'music'
      },
      {
        customId: '10',
        name: 'World Cup Soccer',
        description: 'FIFA World Cup soccer poster celebrating global football',
        price: 16.99,
        image: 'https://m.media-amazon.com/images/I/61DllukMXpL._AC_SL1000_.jpg',
        category: 'sports'
      }
    ];
    
    // Log out all posters for debugging
    console.log('Poster data loaded:');
    posters.forEach((p, i) => console.log(`${i+1}. ${p.name} (${p.category})`));
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    console.log(`Total posters to add: ${posters.length}`);
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name} (${poster.category})`);
      
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
    
    // Sample posters data with real-life image URLs
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers in the final battle against Thanos',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster featuring the main cast',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster with Eren, Mikasa and the Colossal Titan',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album artwork poster from "The Wall"',
        price: 22.99,
        image: 'https://m.media-amazon.com/images/I/61nXj1oWFOL._AC_SL1000_.jpg',
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball legends poster featuring Michael Jordan, Kobe Bryant, and LeBron James',
        price: 17.99,
        image: 'https://m.media-amazon.com/images/I/813WwJCcGmL._AC_SL1500_.jpg',
        category: 'sports'
      },
      {
        customId: '6',
        name: 'Pulp Fiction',
        description: 'Classic Quentin Tarantino movie poster with Uma Thurman',
        price: 21.99,
        image: 'https://m.media-amazon.com/images/I/61OQycGGMdL._AC_SL1000_.jpg',
        category: 'movies'
      },
      {
        customId: '7',
        name: 'Breaking Bad',
        description: 'Breaking Bad TV series poster featuring Walter White and Jesse Pinkman',
        price: 23.99,
        image: 'https://m.media-amazon.com/images/I/71R+uR3ly-L._AC_SL1000_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '8',
        name: 'Demon Slayer',
        description: 'Demon Slayer anime poster with Tanjiro and Nezuko',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/61vQWc0K6BL._AC_SL1000_.jpg',
        category: 'anime'
      },
      {
        customId: '9',
        name: 'The Beatles - Abbey Road',
        description: 'Iconic Abbey Road album cover poster by The Beatles',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/713EF5eQtGL._AC_SL1060_.jpg',
        category: 'music'
      },
      {
        customId: '10',
        name: 'World Cup Soccer',
        description: 'FIFA World Cup soccer poster celebrating global football',
        price: 16.99,
        image: 'https://m.media-amazon.com/images/I/61DllukMXpL._AC_SL1000_.jpg',
        category: 'sports'
      }
    ];
    
    // Log out all posters for debugging
    console.log('Poster data loaded:');
    posters.forEach((p, i) => console.log(`${i+1}. ${p.name} (${p.category})`));
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    console.log(`Total posters to add: ${posters.length}`);
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name} (${poster.category})`);
      
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
    
    // Sample posters data with real-life image URLs
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers in the final battle against Thanos',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster featuring the main cast',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster with Eren, Mikasa and the Colossal Titan',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album artwork poster from "The Wall"',
        price: 22.99,
        image: 'https://m.media-amazon.com/images/I/61nXj1oWFOL._AC_SL1000_.jpg',
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball legends poster featuring Michael Jordan, Kobe Bryant, and LeBron James',
        price: 17.99,
        image: 'https://m.media-amazon.com/images/I/813WwJCcGmL._AC_SL1500_.jpg',
        category: 'sports'
      },
      {
        customId: '6',
        name: 'Pulp Fiction',
        description: 'Classic Quentin Tarantino movie poster with Uma Thurman',
        price: 21.99,
        image: 'https://m.media-amazon.com/images/I/61OQycGGMdL._AC_SL1000_.jpg',
        category: 'movies'
      },
      {
        customId: '7',
        name: 'Breaking Bad',
        description: 'Breaking Bad TV series poster featuring Walter White and Jesse Pinkman',
        price: 23.99,
        image: 'https://m.media-amazon.com/images/I/71R+uR3ly-L._AC_SL1000_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '8',
        name: 'Demon Slayer',
        description: 'Demon Slayer anime poster with Tanjiro and Nezuko',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/61vQWc0K6BL._AC_SL1000_.jpg',
        category: 'anime'
      },
      {
        customId: '9',
        name: 'The Beatles - Abbey Road',
        description: 'Iconic Abbey Road album cover poster by The Beatles',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/713EF5eQtGL._AC_SL1060_.jpg',
        category: 'music'
      },
      {
        customId: '10',
        name: 'World Cup Soccer',
        description: 'FIFA World Cup soccer poster celebrating global football',
        price: 16.99,
        image: 'https://m.media-amazon.com/images/I/61DllukMXpL._AC_SL1000_.jpg',
        category: 'sports'
      }
    ];
    
    // Log out all posters for debugging
    console.log('Poster data loaded:');
    posters.forEach((p, i) => console.log(`${i+1}. ${p.name} (${p.category})`));
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    console.log(`Total posters to add: ${posters.length}`);
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name} (${poster.category})`);
      
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
    
    // Sample posters data with real-life image URLs
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers in the final battle against Thanos',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster featuring the main cast',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster with Eren, Mikasa and the Colossal Titan',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album artwork poster from "The Wall"',
        price: 22.99,
        image: 'https://m.media-amazon.com/images/I/61nXj1oWFOL._AC_SL1000_.jpg',
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball legends poster featuring Michael Jordan, Kobe Bryant, and LeBron James',
        price: 17.99,
        image: 'https://m.media-amazon.com/images/I/813WwJCcGmL._AC_SL1500_.jpg',
        category: 'sports'
      },
      {
        customId: '6',
        name: 'Pulp Fiction',
        description: 'Classic Quentin Tarantino movie poster with Uma Thurman',
        price: 21.99,
        image: 'https://m.media-amazon.com/images/I/61OQycGGMdL._AC_SL1000_.jpg',
        category: 'movies'
      },
      {
        customId: '7',
        name: 'Breaking Bad',
        description: 'Breaking Bad TV series poster featuring Walter White and Jesse Pinkman',
        price: 23.99,
        image: 'https://m.media-amazon.com/images/I/71R+uR3ly-L._AC_SL1000_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '8',
        name: 'Demon Slayer',
        description: 'Demon Slayer anime poster with Tanjiro and Nezuko',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/61vQWc0K6BL._AC_SL1000_.jpg',
        category: 'anime'
      },
      {
        customId: '9',
        name: 'The Beatles - Abbey Road',
        description: 'Iconic Abbey Road album cover poster by The Beatles',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/713EF5eQtGL._AC_SL1060_.jpg',
        category: 'music'
      },
      {
        customId: '10',
        name: 'World Cup Soccer',
        description: 'FIFA World Cup soccer poster celebrating global football',
        price: 16.99,
        image: 'https://m.media-amazon.com/images/I/61DllukMXpL._AC_SL1000_.jpg',
        category: 'sports'
      }
    ];
    
    // Log out all posters for debugging
    console.log('Poster data loaded:');
    posters.forEach((p, i) => console.log(`${i+1}. ${p.name} (${p.category})`));
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    console.log(`Total posters to add: ${posters.length}`);
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name} (${poster.category})`);
      
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
    
    // Sample posters data with real-life image URLs
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers in the final battle against Thanos',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster featuring the main cast',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster with Eren, Mikasa and the Colossal Titan',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album artwork poster from "The Wall"',
        price: 22.99,
        image: 'https://m.media-amazon.com/images/I/61nXj1oWFOL._AC_SL1000_.jpg',
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball legends poster featuring Michael Jordan, Kobe Bryant, and LeBron James',
        price: 17.99,
        image: 'https://m.media-amazon.com/images/I/813WwJCcGmL._AC_SL1500_.jpg',
        category: 'sports'
      },
      {
        customId: '6',
        name: 'Pulp Fiction',
        description: 'Classic Quentin Tarantino movie poster with Uma Thurman',
        price: 21.99,
        image: 'https://m.media-amazon.com/images/I/61OQycGGMdL._AC_SL1000_.jpg',
        category: 'movies'
      },
      {
        customId: '7',
        name: 'Breaking Bad',
        description: 'Breaking Bad TV series poster featuring Walter White and Jesse Pinkman',
        price: 23.99,
        image: 'https://m.media-amazon.com/images/I/71R+uR3ly-L._AC_SL1000_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '8',
        name: 'Demon Slayer',
        description: 'Demon Slayer anime poster with Tanjiro and Nezuko',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/61vQWc0K6BL._AC_SL1000_.jpg',
        category: 'anime'
      },
      {
        customId: '9',
        name: 'The Beatles - Abbey Road',
        description: 'Iconic Abbey Road album cover poster by The Beatles',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/713EF5eQtGL._AC_SL1060_.jpg',
        category: 'music'
      },
      {
        customId: '10',
        name: 'World Cup Soccer',
        description: 'FIFA World Cup soccer poster celebrating global football',
        price: 16.99,
        image: 'https://m.media-amazon.com/images/I/61DllukMXpL._AC_SL1000_.jpg',
        category: 'sports'
      }
    ];
    
    // Log out all posters for debugging
    console.log('Poster data loaded:');
    posters.forEach((p, i) => console.log(`${i+1}. ${p.name} (${p.category})`));
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    console.log(`Total posters to add: ${posters.length}`);
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name} (${poster.category})`);
      
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
    
    // Sample posters data with real-life image URLs
    const posters = [
      {
        customId: '1',
        name: 'Avengers: Endgame',
        description: 'Epic movie poster featuring the Avengers in the final battle against Thanos',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
        category: 'movies'
      },
      {
        customId: '2',
        name: 'Stranger Things',
        description: 'Vintage style Stranger Things TV show poster featuring the main cast',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/71jOXSIKQML._AC_SL1001_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '3',
        name: 'Attack on Titan',
        description: 'Attack on Titan anime poster with Eren, Mikasa and the Colossal Titan',
        price: 18.99,
        image: 'https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_SL1500_.jpg',
        category: 'anime'
      },
      {
        customId: '4',
        name: 'Pink Floyd - The Wall',
        description: 'Iconic Pink Floyd album artwork poster from "The Wall"',
        price: 22.99,
        image: 'https://m.media-amazon.com/images/I/61nXj1oWFOL._AC_SL1000_.jpg',
        category: 'music'
      },
      {
        customId: '5',
        name: 'NBA Legends',
        description: 'Basketball legends poster featuring Michael Jordan, Kobe Bryant, and LeBron James',
        price: 17.99,
        image: 'https://m.media-amazon.com/images/I/813WwJCcGmL._AC_SL1500_.jpg',
        category: 'sports'
      },
      {
        customId: '6',
        name: 'Pulp Fiction',
        description: 'Classic Quentin Tarantino movie poster with Uma Thurman',
        price: 21.99,
        image: 'https://m.media-amazon.com/images/I/61OQycGGMdL._AC_SL1000_.jpg',
        category: 'movies'
      },
      {
        customId: '7',
        name: 'Breaking Bad',
        description: 'Breaking Bad TV series poster featuring Walter White and Jesse Pinkman',
        price: 23.99,
        image: 'https://m.media-amazon.com/images/I/71R+uR3ly-L._AC_SL1000_.jpg',
        category: 'tv-shows'
      },
      {
        customId: '8',
        name: 'Demon Slayer',
        description: 'Demon Slayer anime poster with Tanjiro and Nezuko',
        price: 19.99,
        image: 'https://m.media-amazon.com/images/I/61vQWc0K6BL._AC_SL1000_.jpg',
        category: 'anime'
      },
      {
        customId: '9',
        name: 'The Beatles - Abbey Road',
        description: 'Iconic Abbey Road album cover poster by The Beatles',
        price: 24.99,
        image: 'https://m.media-amazon.com/images/I/713EF5eQtGL._AC_SL1060_.jpg',
        category: 'music'
      },
      {
        customId: '10',
        name: 'World Cup Soccer',
        description: 'FIFA World Cup soccer poster celebrating global football',
        price: 16.99,
        image: 'https://m.media-amazon.com/images/I/61DllukMXpL._AC_SL1000_.jpg',
        category: 'sports'
      }
    ];
    
    // Log out all posters for debugging
    console.log('Poster data loaded:');
    posters.forEach((p, i) => console.log(`${i+1}. ${p.name} (${p.category})`));
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    await ServerProduct.deleteMany({});
    
    // Add posters to database
    console.log('Adding sample posters...');
    console.log(`Total posters to add: ${posters.length}`);
    
    for (const poster of posters) {
      console.log(`Adding: ${poster.name} (${poster.category})`);
      
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
 