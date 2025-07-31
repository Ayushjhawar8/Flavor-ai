# Idea Hub - Setup Guide

This guide will walk you through setting up the Idea Hub feature with MongoDB for production use.

## Prerequisites

- Node.js (v18 LTS or later)
- npm or yarn
- MongoDB Atlas account (free tier available)

## 1. MongoDB Setup

### 1.1 Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/log in
2. Create a new project (e.g., "Flavor AI")
3. Click "Build a Database"
4. Select the free shared cluster option
5. Choose your preferred cloud provider and region
6. Click "Create Cluster" (this may take a few minutes)

### 1.2 Create a Database User

1. In your cluster dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Enter a username and password (save these securely)
5. For permissions, select "Atlas Admin" (for development) or create a custom role with read/write access
6. Click "Add User"

### 1.3 Get Your Connection String

1. Go to "Database" > "Connect"
2. Choose "Connect your application"
3. Copy the connection string (it will look like `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/`)

## 2. Environment Configuration

1. Create a `.env.local` file in your project root:
   ```bash
   # Copy from .env.local.example
   cp .env.local.example .env.local
   ```

2. Edit the `.env.local` file and update the following variables:
   ```
   # MongoDB connection string (replace placeholders with your credentials)
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/flavor-ai?retryWrites=true&w=majority
   
   # Environment (development/production)
   NODE_ENV=development
   
   # Base URL for API calls
   NEXT_PUBLIC_API_URL=/api
   ```

## 3. Install Dependencies

```bash
npm install mongodb mongoose
# or
yarn add mongodb mongoose
```

## 4. Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 5. Testing the Setup

1. Visit `http://localhost:3000/idea-hub` in your browser
2. Try adding a new idea (must be at least 10 characters)
3. Test the voting functionality
4. Try sorting by newest and top voted

## 6. Troubleshooting

### Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas (Network Access > Add IP Address)
- Verify your connection string is correct
- Check that your database user has the correct permissions

### Validation Errors
- Ideas must be at least 10 characters long
- Email format is validated if provided

### Environment Variables
- Ensure all required environment variables are set
- Restart your development server after changing environment variables


