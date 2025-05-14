import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add both development server ports
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Debug middleware to log all requests
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
connectDB();

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Add a test route
app.get('/test', (_req: Request, res: Response) => {
  res.json({ message: 'Server is working!' });
});

// Debug route to list all registered routes
app.get('/debug/routes', (_req: Request, res: Response) => {
  res.json({
    routes: [
      'GET /test',
      'GET /debug/routes',
      'POST /api/auth/register',
      'POST /api/auth/register-admin',
      'POST /api/auth/login',
      'GET /api/users/profile',
      'PUT /api/users/profile',
      'GET /api/users',
      'GET /api/products',
      'GET /api/products/:id',
      'GET /api/cart',
      'POST /api/cart',
      'PUT /api/cart/:productId',
      'DELETE /api/cart/:productId',
      'DELETE /api/cart',
      'GET /api/orders',
      'GET /api/orders/:id',
      'POST /api/orders',
      'PUT /api/orders/:id/status',
      'PUT /api/orders/:id/pay',
      'GET /api/orders/myorders'
    ]
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Test the server at: http://localhost:${port}/test`);
  console.log(`Debug routes at: http://localhost:${port}/debug/routes`);
}); 