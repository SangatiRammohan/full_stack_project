const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  photoURL: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  provider: {
    type: String,
    default: 'email',
    enum: ['email', 'google', 'facebook', 'apple', 'phone', 'github', 'twitter']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'manager'],
    default: 'user',
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'zh', 'ja']
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for full profile URL
UserSchema.virtual('profileUrl').get(function() {
  return `/users/${this._id}`;
});

// Instance method to check if user is admin
UserSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Add compound index for common queries
UserSchema.index({ isActive: 1, role: 1 });

// Ensure model is only compiled once
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);