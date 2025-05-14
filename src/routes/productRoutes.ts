import { Router } from 'express';
import { Product } from '../models/Product';
import mongoose from 'mongoose';
import { isAdmin } from '../middleware/auth';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sortBy } = req.query;
    
    // Build query
    const query: any = {};
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Build sort object
    let sort: any = {};
    switch (sortBy) {
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'newest':
      default:
        sort = { createdAt: -1 };
        break;
    }
    
    const products = await Product.find(query).sort(sort);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get available categories
router.get('/categories', async (req, res) => {
  try {
    const categories = ['movies', 'shows', 'music', 'anime', 'sports', 'motivation', 'games'];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Admin route to get all products with full details
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products for admin:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;
    
    console.log(`Looking for product with ID: ${id}`);
    
    // First, try to find by customId (Firebase-style ID)
    product = await Product.findOne({ customId: id });
    
    if (product) {
      console.log(`Found product by customId: ${product.name}`);
      return res.json(product);
    }
    
    // If not found and ID is a valid MongoDB ObjectId, try findById
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
      if (product) {
        console.log(`Found product by ObjectId: ${product.name}`);
        return res.json(product);
      }
    }
    
    // Last resort: try searching by name or other fields
    product = await Product.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${id}$`, 'i') } },
        { slug: id }
      ]
    });
    
    if (product) {
      console.log(`Found product by name/slug: ${product.name}`);
      return res.json(product);
    }
    
    // No product found with any method
    console.log(`No product found for ID: ${id}`);
    return res.status(404).json({ error: 'Product not found' });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      error: 'Failed to fetch product', 
      details: error.message,
      id: req.params.id 
    });
  }
});

export default router; 