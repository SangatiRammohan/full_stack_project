const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] // Add currencies as needed
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash', 'other'] // Add methods as needed
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  transactionId: {
    type: String,
    index: true // Adding an index for faster lookups by transactionId
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed // For storing additional payment-related data
  },
  refundDetails: {
    amount: Number,
    date: Date,
    reason: String
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Add a compound index for common queries
PaymentSchema.index({ user: 1, paymentStatus: 1 });

// Add virtual for calculating if payment is recent (example of a virtual property)
PaymentSchema.virtual('isRecent').get(function() {
  const now = new Date();
  const daysDifference = (now - this.paymentDate) / (1000 * 60 * 60 * 24);
  return daysDifference < 7; // Returns true if payment was made in the last 7 days
});

module.exports = mongoose.model('Payment', PaymentSchema);