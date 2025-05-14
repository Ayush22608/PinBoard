import mongoose from 'mongoose';

// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017/poster-website';

// Connect to MongoDB
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  family: 4
}).then(async () => {
  console.log('Connected to MongoDB');
  
  // Define the source product schema (from src/models/Product.ts)
  const sourceSchema = new mongoose.Schema({
    customId: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String
  });
  
  // Define the target product schema (from server/src/models/Product.ts)
  const targetSchema = new mongoose.Schema({
    customId: String,
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    category: String,
    inStock: Boolean
  });
  
  // Create models using different model names to avoid conflicts
  const SourceProduct = mongoose.model('Product', sourceSchema);
  const TargetProduct = mongoose.model('ServerProduct', targetSchema);
  
  try {
    // Fetch all products from the source collection
    const sourceProducts = await SourceProduct.find({});
    console.log(`Found ${sourceProducts.length} products in source collection`);
    
    let added = 0;
    let updated = 0;
    let skipped = 0;
    
    // Process each source product
    for (const sourceProduct of sourceProducts) {
      try {
        // Check if product exists in target collection by customId
        let targetProduct = null;
        
        if (sourceProduct.customId) {
          targetProduct = await TargetProduct.findOne({ customId: sourceProduct.customId });
        }
        
        // If product exists, update it
        if (targetProduct) {
          // Map fields from source to target
          targetProduct.name = sourceProduct.name;
          targetProduct.description = sourceProduct.description;
          targetProduct.price = sourceProduct.price;
          targetProduct.imageUrl = sourceProduct.image; // Map image to imageUrl
          targetProduct.category = mapCategory(sourceProduct.category);
          targetProduct.inStock = true;
          
          await targetProduct.save();
          updated++;
          console.log(`Updated product "${sourceProduct.name}" in target collection`);
        }
        // If product doesn't exist, create it
        else {
          // Create new product in target collection
          const newProduct = new TargetProduct({
            customId: sourceProduct.customId,
            name: sourceProduct.name,
            description: sourceProduct.description,
            price: sourceProduct.price,
            imageUrl: sourceProduct.image, // Map image to imageUrl
            category: mapCategory(sourceProduct.category),
            inStock: true
          });
          
          await newProduct.save();
          added++;
          console.log(`Added product "${sourceProduct.name}" to target collection`);
        }
      } catch (error) {
        console.error(`Error processing product "${sourceProduct.name}":`, error);
        skipped++;
      }
    }
    
    console.log('\n==== Sync Summary ====');
    console.log(`Products found in source: ${sourceProducts.length}`);
    console.log(`Products added to target: ${added}`);
    console.log(`Products updated in target: ${updated}`);
    console.log(`Products skipped: ${skipped}`);
    
    // Check target collection after sync
    const targetCount = await TargetProduct.countDocuments();
    console.log(`\nTotal products in target collection after sync: ${targetCount}`);
    
  } catch (error) {
    console.error('Error during sync:', error);
  }
  
  console.log('\nSync completed');
  process.exit(0);
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Helper function to map categories from source to target
function mapCategory(sourceCategory) {
  // Map categories that don't match between schemas
  const categoryMap = {
    'shows': 'tv-shows',
    'music': 'movies',
    'sports': 'movies',
    'motivation': 'movies',
    'games': 'movies'
  };
  
  // Return mapped category or original if no mapping exists
  return categoryMap[sourceCategory] || sourceCategory;
} 