import { Router, Request, Response } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name price image')
      .populate('user', 'name email');

    if (!cart) {
      res.json({ items: [], totalPrice: 0 });
      return;
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    await cart.populate('items.product', 'name price image');

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
router.put('/:productId', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (!item) {
      res.status(404).json({ error: 'Item not found in cart' });
      return;
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== req.params.productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product', 'name price image');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
router.delete('/:productId', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate('items.product', 'name price image');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
router.delete('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 