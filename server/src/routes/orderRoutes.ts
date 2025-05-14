import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { Order } from '../models/Order';

const router = express.Router();

// Create a new order
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { items, shippingAddress, paymentInfo, total } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const order = new Order({
      user: userId,
      items,
      shippingAddress,
      paymentInfo,
      total,
      status: 'pending'
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get a specific order
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: userId
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

export default router; 