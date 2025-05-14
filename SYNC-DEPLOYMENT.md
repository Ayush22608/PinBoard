# Deploying the Firestore-MongoDB Sync Script

This guide explains how to deploy the synchronization script as a scheduled job to keep your Firestore and MongoDB Atlas databases in sync.

## Option 1: Deploy as a Cron Job on Render.com

1. **Create a new Web Service on Render**
   - Sign up/log in to [Render.com](https://render.com)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - Name: `poster-website-sync`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node schedule-sync.js`

3. **Set environment variables**
   - `RUN_AS_SCHEDULED_JOB`: `true`
   - `SYNC_INTERVAL`: `3600000` (for hourly sync, adjust as needed)

4. **Deploy the service**
   - Click "Create Web Service"

## Option 2: Deploy as a Cron Job on Railway.app

1. **Create a new project on Railway**
   - Sign up/log in to [Railway.app](https://railway.app)
   - Create a new project and connect your GitHub repository

2. **Configure the service**
   - Deploy settings:
     - Root Directory: `/`
     - Build Command: `npm install`
     - Start Command: `node schedule-sync.js`

3. **Set environment variables**
   - `RUN_AS_SCHEDULED_JOB`: `true`
   - `SYNC_INTERVAL`: `3600000` (for hourly sync, adjust as needed)

4. **Deploy**
   - Deploy your service

## Option 3: Using a Dedicated Cron Job Service

### Cron-job.org (Free)

1. Sign up at [cron-job.org](https://cron-job.org)
2. Deploy your sync script to a simple web server endpoint
3. Set up a cron job to hit that endpoint hourly

### GitHub Actions (Free for public repos)

1. Create a GitHub Actions workflow file in `.github/workflows/sync.yml`:

```yaml
name: Sync Firestore to MongoDB

on:
  schedule:
    - cron: '0 * * * *' # Run hourly
  workflow_dispatch: # Allow manual triggers

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node atlas-sync.js
        env:
          # Add any necessary environment variables here
```

## Monitoring the Sync Process

1. **Check logs**
   - View the service logs on Render/Railway dashboard
   - Look for successful completion messages

2. **Set up notifications**
   - Configure alert notifications for service failures
   - Set up email notifications for sync errors

3. **Monitor MongoDB Atlas**
   - Use the MongoDB Atlas dashboard to monitor database operations
   - Check for expected document counts after syncs

## Troubleshooting

If you encounter issues with the sync process:

1. **Check connection strings**
   - Verify MongoDB Atlas connection string
   - Confirm Firebase credentials are correct

2. **Memory issues**
   - If dealing with large data sets, you may need to increase the memory allocation for your service

3. **Timeout errors**
   - Increase the timeout settings in your service configuration

4. **Error handling**
   - The sync script includes error handling, but review logs for specific error messages

## Advanced: Selective Sync

If you need to sync only certain collections or documents, modify the `schedule-sync.js` script to:

1. Add filtering criteria to your Firestore queries
2. Implement change tracking to sync only modified documents
3. Add specific collection targeting logic 
 
 

This guide explains how to deploy the synchronization script as a scheduled job to keep your Firestore and MongoDB Atlas databases in sync.

## Option 1: Deploy as a Cron Job on Render.com

1. **Create a new Web Service on Render**
   - Sign up/log in to [Render.com](https://render.com)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - Name: `poster-website-sync`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node schedule-sync.js`

3. **Set environment variables**
   - `RUN_AS_SCHEDULED_JOB`: `true`
   - `SYNC_INTERVAL`: `3600000` (for hourly sync, adjust as needed)

4. **Deploy the service**
   - Click "Create Web Service"

## Option 2: Deploy as a Cron Job on Railway.app

1. **Create a new project on Railway**
   - Sign up/log in to [Railway.app](https://railway.app)
   - Create a new project and connect your GitHub repository

2. **Configure the service**
   - Deploy settings:
     - Root Directory: `/`
     - Build Command: `npm install`
     - Start Command: `node schedule-sync.js`

3. **Set environment variables**
   - `RUN_AS_SCHEDULED_JOB`: `true`
   - `SYNC_INTERVAL`: `3600000` (for hourly sync, adjust as needed)

4. **Deploy**
   - Deploy your service

## Option 3: Using a Dedicated Cron Job Service

### Cron-job.org (Free)

1. Sign up at [cron-job.org](https://cron-job.org)
2. Deploy your sync script to a simple web server endpoint
3. Set up a cron job to hit that endpoint hourly

### GitHub Actions (Free for public repos)

1. Create a GitHub Actions workflow file in `.github/workflows/sync.yml`:

```yaml
name: Sync Firestore to MongoDB

on:
  schedule:
    - cron: '0 * * * *' # Run hourly
  workflow_dispatch: # Allow manual triggers

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node atlas-sync.js
        env:
          # Add any necessary environment variables here
```

## Monitoring the Sync Process

1. **Check logs**
   - View the service logs on Render/Railway dashboard
   - Look for successful completion messages

2. **Set up notifications**
   - Configure alert notifications for service failures
   - Set up email notifications for sync errors

3. **Monitor MongoDB Atlas**
   - Use the MongoDB Atlas dashboard to monitor database operations
   - Check for expected document counts after syncs

## Troubleshooting

If you encounter issues with the sync process:

1. **Check connection strings**
   - Verify MongoDB Atlas connection string
   - Confirm Firebase credentials are correct

2. **Memory issues**
   - If dealing with large data sets, you may need to increase the memory allocation for your service

3. **Timeout errors**
   - Increase the timeout settings in your service configuration

4. **Error handling**
   - The sync script includes error handling, but review logs for specific error messages

## Advanced: Selective Sync

If you need to sync only certain collections or documents, modify the `schedule-sync.js` script to:

1. Add filtering criteria to your Firestore queries
2. Implement change tracking to sync only modified documents
3. Add specific collection targeting logic 
 
 

This guide explains how to deploy the synchronization script as a scheduled job to keep your Firestore and MongoDB Atlas databases in sync.

## Option 1: Deploy as a Cron Job on Render.com

1. **Create a new Web Service on Render**
   - Sign up/log in to [Render.com](https://render.com)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - Name: `poster-website-sync`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node schedule-sync.js`

3. **Set environment variables**
   - `RUN_AS_SCHEDULED_JOB`: `true`
   - `SYNC_INTERVAL`: `3600000` (for hourly sync, adjust as needed)

4. **Deploy the service**
   - Click "Create Web Service"

## Option 2: Deploy as a Cron Job on Railway.app

1. **Create a new project on Railway**
   - Sign up/log in to [Railway.app](https://railway.app)
   - Create a new project and connect your GitHub repository

2. **Configure the service**
   - Deploy settings:
     - Root Directory: `/`
     - Build Command: `npm install`
     - Start Command: `node schedule-sync.js`

3. **Set environment variables**
   - `RUN_AS_SCHEDULED_JOB`: `true`
   - `SYNC_INTERVAL`: `3600000` (for hourly sync, adjust as needed)

4. **Deploy**
   - Deploy your service

## Option 3: Using a Dedicated Cron Job Service

### Cron-job.org (Free)

1. Sign up at [cron-job.org](https://cron-job.org)
2. Deploy your sync script to a simple web server endpoint
3. Set up a cron job to hit that endpoint hourly

### GitHub Actions (Free for public repos)

1. Create a GitHub Actions workflow file in `.github/workflows/sync.yml`:

```yaml
name: Sync Firestore to MongoDB

on:
  schedule:
    - cron: '0 * * * *' # Run hourly
  workflow_dispatch: # Allow manual triggers

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node atlas-sync.js
        env:
          # Add any necessary environment variables here
```

## Monitoring the Sync Process

1. **Check logs**
   - View the service logs on Render/Railway dashboard
   - Look for successful completion messages

2. **Set up notifications**
   - Configure alert notifications for service failures
   - Set up email notifications for sync errors

3. **Monitor MongoDB Atlas**
   - Use the MongoDB Atlas dashboard to monitor database operations
   - Check for expected document counts after syncs

## Troubleshooting

If you encounter issues with the sync process:

1. **Check connection strings**
   - Verify MongoDB Atlas connection string
   - Confirm Firebase credentials are correct

2. **Memory issues**
   - If dealing with large data sets, you may need to increase the memory allocation for your service

3. **Timeout errors**
   - Increase the timeout settings in your service configuration

4. **Error handling**
   - The sync script includes error handling, but review logs for specific error messages

## Advanced: Selective Sync

If you need to sync only certain collections or documents, modify the `schedule-sync.js` script to:

1. Add filtering criteria to your Firestore queries
2. Implement change tracking to sync only modified documents
3. Add specific collection targeting logic 
 
 