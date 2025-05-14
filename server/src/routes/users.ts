import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req: any, res) => {
  try {
    const userData = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

export default router; 