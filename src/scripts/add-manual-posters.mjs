import mongoose from 'mongoose';
import readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for user input
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function addManualPosters() {
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
    
    console.log('\n===== Add Your Actual Posters =====\n');
    
    let addMore = true;
    let posterCount = 0;
    
    while (addMore) {
      console.log('\n----- Add New Poster -----');
      
      // Get poster details
      const name = await question('Poster Name: ');
      const description = await question('Description: ');
      const priceStr = await question('Price (e.g. 19.99): ');
      const price = parseFloat(priceStr);
      const image = await question('Image URL: ');
      
      console.log('\nAvailable categories: movies, tv-shows, anime, music, sports, art');
      const category = await question('Category: ');
      
      const customId = (posterCount + 1).toString();
      
      // Confirm details
      console.log('\nPoster Details:');
      console.log(`Name: ${name}`);
      console.log(`Description: ${description}`);
      console.log(`Price: $${price}`);
      console.log(`Image URL: ${image}`);
      console.log(`Category: ${category}`);
      
      const confirm = await question('\nAdd this poster? (y/n): ');
      
      if (confirm.toLowerCase() === 'y') {
        // Create in main collection
        await new Product({
          customId,
          name,
          description,
          price,
          image,
          category
        }).save();
        
        // Create in server collection
        await new ServerProduct({
          customId,
          name,
          description,
          price,
          imageUrl: image,
          category,
          inStock: true
        }).save();
        
        console.log(`\nPoster "${name}" added successfully!`);
        posterCount++;
        
        const addAnother = await question('\nAdd another poster? (y/n): ');
        if (addAnother.toLowerCase() !== 'y') {
          addMore = false;
        }
      } else {
        console.log('Poster not added.');
        const tryAgain = await question('\nTry again? (y/n): ');
        if (tryAgain.toLowerCase() !== 'y') {
          addMore = false;
        }
      }
    }
    
    console.log(`\nTotal posters added: ${posterCount}`);
    
    // List all posters in the database
    const allProducts = await Product.find({});
    console.log('\nAll posters in database:');
    allProducts.forEach((p, i) => {
      console.log(`[${i+1}] ${p.name} (${p.category}) - $${p.price}`);
    });
    
    console.log('\nDone!');
    rl.close();
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error adding posters:', error);
    rl.close();
  }
}

// Run the function
addManualPosters(); 
 
 
import readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for user input
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function addManualPosters() {
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
    
    console.log('\n===== Add Your Actual Posters =====\n');
    
    let addMore = true;
    let posterCount = 0;
    
    while (addMore) {
      console.log('\n----- Add New Poster -----');
      
      // Get poster details
      const name = await question('Poster Name: ');
      const description = await question('Description: ');
      const priceStr = await question('Price (e.g. 19.99): ');
      const price = parseFloat(priceStr);
      const image = await question('Image URL: ');
      
      console.log('\nAvailable categories: movies, tv-shows, anime, music, sports, art');
      const category = await question('Category: ');
      
      const customId = (posterCount + 1).toString();
      
      // Confirm details
      console.log('\nPoster Details:');
      console.log(`Name: ${name}`);
      console.log(`Description: ${description}`);
      console.log(`Price: $${price}`);
      console.log(`Image URL: ${image}`);
      console.log(`Category: ${category}`);
      
      const confirm = await question('\nAdd this poster? (y/n): ');
      
      if (confirm.toLowerCase() === 'y') {
        // Create in main collection
        await new Product({
          customId,
          name,
          description,
          price,
          image,
          category
        }).save();
        
        // Create in server collection
        await new ServerProduct({
          customId,
          name,
          description,
          price,
          imageUrl: image,
          category,
          inStock: true
        }).save();
        
        console.log(`\nPoster "${name}" added successfully!`);
        posterCount++;
        
        const addAnother = await question('\nAdd another poster? (y/n): ');
        if (addAnother.toLowerCase() !== 'y') {
          addMore = false;
        }
      } else {
        console.log('Poster not added.');
        const tryAgain = await question('\nTry again? (y/n): ');
        if (tryAgain.toLowerCase() !== 'y') {
          addMore = false;
        }
      }
    }
    
    console.log(`\nTotal posters added: ${posterCount}`);
    
    // List all posters in the database
    const allProducts = await Product.find({});
    console.log('\nAll posters in database:');
    allProducts.forEach((p, i) => {
      console.log(`[${i+1}] ${p.name} (${p.category}) - $${p.price}`);
    });
    
    console.log('\nDone!');
    rl.close();
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error adding posters:', error);
    rl.close();
  }
}

// Run the function
addManualPosters(); 
 
 
import readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for user input
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function addManualPosters() {
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
    
    console.log('\n===== Add Your Actual Posters =====\n');
    
    let addMore = true;
    let posterCount = 0;
    
    while (addMore) {
      console.log('\n----- Add New Poster -----');
      
      // Get poster details
      const name = await question('Poster Name: ');
      const description = await question('Description: ');
      const priceStr = await question('Price (e.g. 19.99): ');
      const price = parseFloat(priceStr);
      const image = await question('Image URL: ');
      
      console.log('\nAvailable categories: movies, tv-shows, anime, music, sports, art');
      const category = await question('Category: ');
      
      const customId = (posterCount + 1).toString();
      
      // Confirm details
      console.log('\nPoster Details:');
      console.log(`Name: ${name}`);
      console.log(`Description: ${description}`);
      console.log(`Price: $${price}`);
      console.log(`Image URL: ${image}`);
      console.log(`Category: ${category}`);
      
      const confirm = await question('\nAdd this poster? (y/n): ');
      
      if (confirm.toLowerCase() === 'y') {
        // Create in main collection
        await new Product({
          customId,
          name,
          description,
          price,
          image,
          category
        }).save();
        
        // Create in server collection
        await new ServerProduct({
          customId,
          name,
          description,
          price,
          imageUrl: image,
          category,
          inStock: true
        }).save();
        
        console.log(`\nPoster "${name}" added successfully!`);
        posterCount++;
        
        const addAnother = await question('\nAdd another poster? (y/n): ');
        if (addAnother.toLowerCase() !== 'y') {
          addMore = false;
        }
      } else {
        console.log('Poster not added.');
        const tryAgain = await question('\nTry again? (y/n): ');
        if (tryAgain.toLowerCase() !== 'y') {
          addMore = false;
        }
      }
    }
    
    console.log(`\nTotal posters added: ${posterCount}`);
    
    // List all posters in the database
    const allProducts = await Product.find({});
    console.log('\nAll posters in database:');
    allProducts.forEach((p, i) => {
      console.log(`[${i+1}] ${p.name} (${p.category}) - $${p.price}`);
    });
    
    console.log('\nDone!');
    rl.close();
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error adding posters:', error);
    rl.close();
  }
}

// Run the function
addManualPosters(); 
 
 