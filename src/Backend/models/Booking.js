const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userDetails: {
      name: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please provide a valid email address",
        ],
      },
      phone: { type: String, required: true, trim: true },
      persons: { type: Number, required: true, min: 1 },
      date: { type: Date, required: true }, // ✅ Corrected type
    },
    paymentDetails: {
      cardName: { type: String, required: true, trim: true },
      cardNumber: {
        type: String,
        required: true,
        minlength: 13,
        maxlength: 19,
        select: false, // Won't be returned in queries by default
      },
    },
    packageDetails: {
      name: { type: String, required: true, trim: true },
      duration: { type: String, required: true, trim: true },
      charge: { type: Number, required: true, min: 0 },
    },
    guideDetails: {
      name: { type: String, trim: true },
      specialties: { type: [String] },
      languages: { type: [String] },
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Add indexes for performance
BookingSchema.index({ "userDetails.email": 1 });
BookingSchema.index({ bookingDate: -1 });
BookingSchema.index({ status: 1 });

// ✅ Securely mask card number
BookingSchema.methods.toJSON = function () {
  const bookingObject = this.toObject();
  if (bookingObject.paymentDetails) {
    if (bookingObject.paymentDetails.cardNumber) {
      const lastDigits = bookingObject.paymentDetails.cardNumber.slice(-4);
      bookingObject.paymentDetails.cardNumber = `****-****-****-${lastDigits}`;
    }
  }
  return bookingObject;
};

// ✅ Fix export issue
const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

module.exports = Booking; // ✅ Correct CommonJS export
