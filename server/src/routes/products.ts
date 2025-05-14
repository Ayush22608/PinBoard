import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { Product } from '../models/Product';
import { upload } from '../middleware/upload';
import path from 'path';
import mongoose from 'mongoose';

// Extend Express Request type to include user and file
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        isAdmin: boolean;
      };
      file?: Express.Multer.File;
    }
  }
}

const router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, category, sort } = req.query;
    let query: any = {};

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

    // Build sort object
    let sortOptions: any = {};
    if (sort === 'price-asc') {
      sortOptions.price = 1;
    } else if (sort === 'price-desc') {
      sortOptions.price = -1;
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }

    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get a single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
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
    
    // Last resort: try searching by name
    product = await Product.findOne({
      name: { $regex: new RegExp(`^${id}$`, 'i') }
    });
    
    if (product) {
      console.log(`Found product by name: ${product.name}`);
      return res.json(product);
    }
    
    console.log(`No product found for ID: ${id}`);
    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      message: 'Error fetching product',
      details: error instanceof Error ? error.message : 'Unknown error',
      id: req.params.id
    });
  }
});

// Create a new product (admin only)
router.post('/', auth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, description, price, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      image
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update a product (admin only)
router.put('/:id', auth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, description, price, category, stock } = req.body;
    const updateData: any = {
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock)
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete a product (admin only)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router; 