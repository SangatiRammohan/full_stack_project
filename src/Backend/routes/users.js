// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

// Get all users with pagination (protected route)
router.get('/', auth, async (req, res) => {
  try {
    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    
    // Add search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex }
      ];
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .lean();
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// Get a specific user by email with bookings populated
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .populate({
        path: 'bookings',
        select: '-__v',
        options: { sort: { createdAt: -1 } }
      })
      .select('-__v')
      .lean();
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by email:', err);
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
});

// Get a specific user by ID with bookings populated
router.get('/id/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findById(req.params.id)
      .populate({
        path: 'bookings',
        select: '-__v',
        options: { sort: { createdAt: -1 } }
      })
      .select('-__v')
      .lean();
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Validate required fields
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: 'Name and email are required fields' });
    }
    
    // Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
      bookings: [],
      preferences: req.body.preferences || {},
      createdAt: new Date()
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: 'Failed to create user', error: err.message });
  }
});

// Update a user by email
router.patch('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields that are sent in the request
    const allowedUpdates = ['name', 'phone', 'preferences'];
    
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedUpdates.includes(key)) {
        user[key] = value;
      }
    }
    
    // Add updated timestamp
    user.updatedAt = new Date();
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user by email:', err);
    res.status(400).json({ message: 'Failed to update user', error: err.message });
  }
});

// Update a user by ID
router.patch('/id/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    // Find and update the user
    const allowedUpdates = ['name', 'phone', 'preferences'];
    const updateData = {};
    
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedUpdates.includes(key)) {
        updateData[key] = value;
      }
    }
    
    // Add updated timestamp
    updateData.updatedAt = new Date();
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user by ID:', err);
    res.status(400).json({ message: 'Failed to update user', error: err.message });
  }
});

// Delete a user (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // This would ideally also delete associated bookings or update them
      // to mark them as orphaned, depending on your business logic
      const deletedUser = await User.findByIdAndDelete(req.params.id).session(session);
      
      if (!deletedUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});

module.exports = router;