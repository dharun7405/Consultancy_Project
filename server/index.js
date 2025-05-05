import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import tenderRoutes from './routes/tenderRequests.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';
import { createAdmin } from './utils/createAdmin.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Database connection with retry logic and improved options
const connectDB = async (retryCount = 0) => {
  const MAX_RETRIES = 5;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 60000, // Increased from 30000
      socketTimeoutMS: 90000, // Increased from 45000
      connectTimeoutMS: 60000, // Increased from 30000
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Connected to MongoDB');
    createAdmin();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
      // Exponential backoff: wait longer between each retry
      setTimeout(() => connectDB(retryCount + 1), 5000 * Math.pow(2, retryCount));
    } else {
      console.error('Max retries reached. Could not connect to MongoDB.');
      process.exit(1);
    }
  }
};

// Set up mongoose error handlers
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected. Attempting to reconnect...');
  connectDB();
});

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tender-requests', tenderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with retry logic
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    // Retry starting server after 5 seconds
    setTimeout(startServer, 5000);
  }
};

startServer();

export default app;