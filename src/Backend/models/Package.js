const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Package name is required'],
    trim: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Package description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Package price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    value: {
      type: Number,
      required: true,
      min: 1
    },
    unit: {
      type: String,
      required: true,
      enum: ['hours', 'days', 'weeks'],
      default: 'days'
    }
  },
  features: [{
    type: String,
    trim: true
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Package image'
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  location: {
    type: String,
    trim: true,
    index: true
  },
  maxParticipants: {
    type: Number,
    min: 1
  },
  minParticipants: {
    type: Number,
    min: 1,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  popularityScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for discounted price
PackageSchema.virtual('discountedPrice').get(function() {
  if (!this.discountPercentage) return this.price;
  return this.price * (1 - this.discountPercentage / 100);
});

// Virtual for main image
PackageSchema.virtual('mainImage').get(function() {
  if (!this.images || this.images.length === 0) return null;
  const main = this.images.find(img => img.isMain);
  return main ? main.url : this.images[0].url;
});

// Index for text search
PackageSchema.index({ 
  name: 'text', 
  description: 'text', 
  category: 'text', 
  location: 'text' 
});

// Compound indexes for common queries
PackageSchema.index({ category: 1, isActive: 1 });
PackageSchema.index({ isActive: 1, discountPercentage: -1 });
PackageSchema.index({ isActive: 1, popularityScore: -1 });

// Method to get formatted duration
PackageSchema.methods.getFormattedDuration = function() {
  return `${this.duration.value} ${this.duration.unit}`;
};

// Prevent model recompilation
const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);
module.exports = Package;