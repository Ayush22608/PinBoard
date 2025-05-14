# Poster Website Deployment Guide

This guide outlines the steps to deploy your Poster E-commerce Website to production services.

## Prerequisites

- GitHub account
- Vercel, Netlify, or similar account for frontend hosting
- Render, Railway, or similar account for backend hosting
- MongoDB Atlas account (already set up)

## Step 1: Prepare Your Environment Variables

Create two separate `.env` files - one for your frontend and one for your backend:

### Backend `.env` file:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://foundakappa5372:QbMgHrshYFmfI1i5@cluster0.dcv1dbh.mongodb.net/poster-website?retryWrites=true&w=majority&appName=Cluster0

# Server Settings
PORT=5000
NODE_ENV=production

# Authentication
JWT_SECRET=your_very_strong_production_secret_key
JWT_EXPIRES_IN=7d

# CORS Settings - Update with your actual deployed frontend URL
FRONTEND_URL=https://your-poster-website.vercel.app

# Firebase Config (for server-side operations)
FIREBASE_API_KEY=AIzaSyDCepQ1Bd0gIKMeiXthqKL9s5NKJP54kaY
FIREBASE_AUTH_DOMAIN=poster-website-e5b1c.firebaseapp.com
FIREBASE_PROJECT_ID=poster-website-e5b1c
FIREBASE_STORAGE_BUCKET=poster-website-e5b1c.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=436550064243
FIREBASE_APP_ID=1:436550064243:web:01d03f25d7a80cd8c6b206
FIREBASE_MEASUREMENT_ID=G-7X7PPMEC12
```

### Frontend `.env` file:

```env
# Environment
VITE_NODE_ENV=production

# API URL - Update with your actual deployed backend URL
VITE_API_URL=https://poster-website-api.onrender.com

# Firebase Config (for client-side operations)
VITE_FIREBASE_API_KEY=AIzaSyDCepQ1Bd0gIKMeiXthqKL9s5NKJP54kaY
VITE_FIREBASE_AUTH_DOMAIN=poster-website-e5b1c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=poster-website-e5b1c
VITE_FIREBASE_STORAGE_BUCKET=poster-website-e5b1c.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=436550064243
VITE_FIREBASE_APP_ID=1:436550064243:web:01d03f25d7a80cd8c6b206
VITE_FIREBASE_MEASUREMENT_ID=G-7X7PPMEC12
```

## Step 2: Update Configuration Files

### Update API URL in Frontend Code

Create or update a configuration file for the frontend (e.g., `src/config/index.ts`):

```typescript
// Frontend configuration
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  },
  isProduction: import.meta.env.VITE_NODE_ENV === 'production'
};

export default config;
```

### Update CORS Settings in Backend Code

Update `src/server.ts` to use environment variables for CORS:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Step 3: Frontend Deployment (Vercel)

1. Push your project to GitHub
2. Log in to Vercel (https://vercel.com)
3. Import your GitHub repository
4. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables from your frontend `.env` file
6. Deploy

### Vercel-specific settings

In your `vite.config.ts`, add:

```typescript
export default defineConfig({
  plugins: [react()],
  // ... other config options
  // This helps with client-side routing in Vercel
  build: {
    outDir: 'dist',
  },
});
```

Create a `vercel.json` file in your project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Step 4: Backend Deployment (Render)

1. Log in to Render (https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Name: `poster-website-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run server`
5. Add all environment variables from your backend `.env` file
6. Deploy

### Render-specific settings

Add a `render.yaml` file to your project root (optional):

```yaml
services:
  - type: web
    name: poster-website-api
    env: node
    buildCommand: npm install
    startCommand: npm run server
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

## Step 5: Configure Automatic Sync Script

Deploy your synchronization script by following the instructions in `SYNC-DEPLOYMENT.md`.

## Step 6: Testing

1. Test the deployed frontend
   - Navigate to your Vercel-deployed URL
   - Test user authentication
   - Test product browsing and cart functionality

2. Test API endpoints using tools like Postman
   - Test `GET /api/products` to ensure products are loading
   - Test authentication endpoints
   - Test order creation

3. Verify data synchronization between Firestore and MongoDB Atlas
   - Check MongoDB Atlas dashboard to confirm data is being synced

## Step 7: Production Security Checklist

1. **Secure JWT Implementation**
   - Use a strong, unique JWT secret
   - Set appropriate expiration times
   - Store JWT securely (HTTP-only cookies when possible)

2. **Environment Variable Security**
   - Never commit `.env` files to version control
   - Use platform-specific environment variable storage
   - Rotate secrets periodically

3. **API Security**
   - Implement rate limiting
   - Add input validation for all API endpoints
   - Use HTTPS for all connections

4. **MongoDB Atlas Security**
   - Use strong, unique passwords
   - Restrict network access to specific IP addresses when possible
   - Enable MongoDB Atlas backups

## Step 8: Monitoring and Maintenance

1. Set up monitoring using Render/Vercel dashboard
2. Check logs regularly for any errors
3. Set up alerts for service disruptions
4. Schedule regular database backups

## Troubleshooting Common Deployment Issues

1. **CORS Errors**
   - Verify the FRONTEND_URL is correct in your backend environment
   - Check that your CORS configuration is properly set up

2. **Database Connection Issues**
   - Confirm MongoDB Atlas connection string is correct
   - Verify IP access list settings in MongoDB Atlas

3. **Build Failures**
   - Check build logs for specific errors
   - Ensure all dependencies are properly installed

4. **404 Errors on Page Refresh**
   - Confirm client-side routing configuration
   - Check your Vercel rewrites configuration

## Scaling Considerations

1. MongoDB Atlas free tier provides adequate resources for small to medium traffic
2. Upgrade your plan if you see performance issues
3. Consider implementing caching for frequently accessed data
4. Use CDN for serving static assets 