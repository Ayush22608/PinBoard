# Poster Website Backend

This is the backend server for the Poster E-commerce Website.

## Technology Stack

- Node.js / Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Building for Production

```
npm run build
```

This will compile TypeScript into JavaScript in the `dist` directory.

## Deployment

### Deploying to Render.com

1. Push this repository to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the service:
   - Name: `poster-website-api`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `JWT_SECRET`: Your secure JWT secret
   - `JWT_EXPIRES_IN`: 7d
   - `FRONTEND_URL`: URL of your deployed frontend

The `render.yaml` file in this repository can be used for automatic deployment configuration.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove cart item

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get a specific order 