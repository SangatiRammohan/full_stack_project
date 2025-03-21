const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection with proper error handling
const connectDB = async () => {
  try {
    // Log the connection string with password redacted for debugging
    const redactedUri = process.env.MONGODB_URI?.replace(
      /mongodb(\+srv)?:\/\/[^:]+:([^@]+)@/,
      'mongodb$1://[username]:[password]@'
    );
    console.log('Connecting to MongoDB:', redactedUri);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Connect to database and start server
connectDB().then((connected) => {
  if (!connected) {
    console.error('Failed to connect to MongoDB. Server not started.');
    return;
  }
  
  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/users', userRoutes);
  
  // Basic health check route
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      mongodb: 'connected', 
      firebase: process.env.FIREBASE_PROJECT_ID ? 'configured' : 'not configured' 
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});