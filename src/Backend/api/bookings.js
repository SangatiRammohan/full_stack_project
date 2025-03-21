const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // ✅ Correct import for CommonJS

// POST /api/bookings - Create a new booking
router.post("/", async (req, res) => {
  console.log("📩 Request Body:", req.body); // Debugging

  const { userDetails, paymentDetails, packageDetails, totalAmount } = req.body;

  // ✅ Validate required fields
  if (!userDetails || !paymentDetails || !packageDetails || !totalAmount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ✅ Convert string date to Date object if needed
    if (userDetails.date && typeof userDetails.date === "string") {
      userDetails.date = new Date(userDetails.date);
    }

    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      message: "✅ Booking saved successfully",
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ error: error.message || "Failed to save booking" });
  }
});

// GET /api/bookings - Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// GET /api/bookings/:id - Get a specific booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "❌ Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("❌ Error fetching booking:", error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

// ✅ Test route to check API
router.get("/test", (req, res) => {
  res.json({ message: "🚀 API is working!" });
});

// ✅ Export the router correctly
module.exports = router;
