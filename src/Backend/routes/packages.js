// routes/packages.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Package = require('../models/Package');
const mongoose = require('mongoose');

// Get all packages with optional filtering
router.get('/', async (req, res) => {
  try {
    // Build query based on request parameters
    const query = {};
    
    // Add filters if provided in query params
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { 
        $gte: parseFloat(req.query.minPrice), 
        $lte: parseFloat(req.query.maxPrice) 
      };
    } else if (req.query.minPrice) {
      query.price = { $gte: parseFloat(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      query.price = { $lte: parseFloat(req.query.maxPrice) };
    }

    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const packages = await Package.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
      
    // Get total count for pagination
    const total = await Package.countDocuments(query);

    res.json({
      packages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalPackages: total
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Failed to fetch packages', error: error.message });
  }
});

// Get single package by ID
router.get('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid package ID format' });
    }
    
    const package = await Package.findById(req.params.id).lean();
    
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(package);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ message: 'Failed to fetch package', error: error.message });
  }
});

// Create a new package (protected route)
router.post('/', auth, async (req, res) => {
  try {
    // Validate required fields
    const { name, description, price, category } = req.body;
    
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Name, description, and price are required' });
    }
    
    // Create new package
    const newPackage = new Package({
      name,
      description,
      price: parseFloat(price),
      category: category || 'General',
      images: req.body.images || [],
      duration: req.body.duration,
      inclusions: req.body.inclusions || [],
      exclusions: req.body.exclusions || [],
      itinerary: req.body.itinerary || [],
      createdAt: new Date()
    });
    
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: 'Failed to create package', error: error.message });
  }
});

// Update a package (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid package ID format' });
    }
    
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Failed to update package', error: error.message });
  }
});

// Delete a package (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid package ID format' });
    }
    
    const package = await Package.findByIdAndDelete(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Failed to delete package', error: error.message });
  }
});

module.exports = router;