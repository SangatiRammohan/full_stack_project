const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

// ✅ Validation middleware for creating a booking
const validateBookingData = [
  body("packageDetails").notEmpty().withMessage("Package information is required"),
  body("userDetails.email").isEmail().withMessage("Valid email is required"),
  body("userDetails.name").notEmpty().withMessage("Name is required"),
  body("totalAmount").isNumeric().withMessage("Total amount must be a number"),
];

// ✅ Get all bookings with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select("-__v")
      .lean(); // ✅ .lean() for faster performance

    const total = await Booking.countDocuments();

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalBookings: total,
    });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});

// ✅ Get bookings by user email
router.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ message: "Email parameter is required" });
    }

    const bookings = await Booking.find({ "userDetails.email": email })
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching user bookings:", err);
    res.status(500).json({ message: "Failed to fetch user bookings", error: err.message });
  }
});

// ✅ Create a new booking (with validation & transactions)
router.post("/", validateBookingData, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingData = {
      packageDetails: req.body.packageDetails, // ✅ Corrected field name
      guideInfo: req.body.guideInfo || null,
      userDetails: req.body.userDetails,
      totalAmount: req.body.totalAmount,
      paymentStatus: req.body.paymentStatus || "pending",
      bookingStatus: req.body.bookingStatus || "confirmed",
      createdAt: new Date(),
    };

    const booking = new Booking(bookingData);
    await booking.save({ session });

    // ✅ Check if user exists
    let user = await User.findOne({ email: req.body.userDetails.email }).session(session);

    if (!user) {
      user = new User({
        name: req.body.userDetails.name,
        email: req.body.userDetails.email,
        phone: req.body.userDetails.phone || null,
        bookings: [booking._id],
        createdAt: new Date(),
      });
    } else {
      user.bookings.push(booking._id);
      user.updatedAt = new Date();
    }

    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error("❌ Error creating booking:", err);
    res.status(400).json({ message: "Failed to create booking", error: err.message });
  }
});

// ✅ Get a specific booking
router.get("/:id", getBooking, (req, res) => {
  res.json(res.booking);
});

// ✅ Update a booking
router.patch("/:id", getBooking, async (req, res) => {
  const allowedUpdates = ["packageDetails", "guideInfo", "userDetails", "totalAmount", "paymentStatus", "bookingStatus"];

  for (const [key, value] of Object.entries(req.body)) {
    if (allowedUpdates.includes(key)) {
      res.booking[key] = value;
    }
  }

  res.booking.updatedAt = new Date();

  try {
    const updatedBooking = await res.booking.save();
    res.json(updatedBooking);
  } catch (err) {
    console.error("❌ Error updating booking:", err);
    res.status(400).json({ message: "Failed to update booking", error: err.message });
  }
});

// ✅ Delete a booking
router.delete("/:id", getBooking, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Booking.deleteOne({ _id: res.booking._id }).session(session);

    await User.updateOne(
      { email: res.booking.userDetails.email },
      { $pull: { bookings: res.booking._id } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error("❌ Error deleting booking:", err);
    res.status(500).json({ message: "Failed to delete booking", error: err.message });
  }
});

// ✅ Middleware: Get Booking by ID
async function getBooking(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid booking ID format" });
  }

  try {
    const booking = await Booking.findById(req.params.id).lean();
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.booking = booking;
    next();
  } catch (err) {
    console.error("❌ Error fetching booking:", err);
    res.status(500).json({ message: "Failed to fetch booking", error: err.message });
  }
}

module.exports = router;
