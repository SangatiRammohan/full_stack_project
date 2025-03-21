import User from '../models/User';
import Booking from '../models/Booking';
// import User from '../models/User.js'; // ✅ Correct way to import default export

import mongoose from 'mongoose';

export const bookingService = {
  // Get user by email or create new user with transaction support
  async getUserByEmail(email, userData, session = null) {
    try {
      // Try to find existing user
      let user = await User.findOne({ email }).session(session);
      
      // Create user if doesn't exist and userData is provided
      if (!user && userData) {
        if (!userData.name) {
          throw new Error('Name is required to create a new user');
        }
        
        user = new User({
          name: userData.name,
          email: userData.email,
          phone: userData.phone || null,
          createdAt: new Date()
        });
        
        // Save with session if provided
        await user.save({ session });
      }
      
      return user;
    } catch (error) {
      console.error("Error getting/creating user:", error);
      throw new Error(`Failed to get or create user: ${error.message}`);
    }
  },
  
  // Create new booking with transaction support
  async createBooking(data) {
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Validate required fields
      if (!data.userDetails?.email || !data.packageDetails || !data.totalAmount) {
        throw new Error('Missing required booking data: user email, package details, or total amount');
      }
      
      // First get or create the user as part of the transaction
      const user = await this.getUserByEmail(
        data.userDetails.email, 
        data.userDetails,
        session
      );
      
      if (!user) {
        throw new Error('Unable to create or find user');
      }
      
      // Create the booking
      const bookingData = {
        user: user._id,
        packageDetails: data.packageDetails,
        guideDetails: data.guideDetails || null,
        bookingDetails: {
          persons: data.userDetails.persons || 1,
          date: data.userDetails.date ? new Date(data.userDetails.date) : new Date(),
          totalAmount: data.totalAmount
        },
        status: data.status || 'confirmed',
        createdAt: new Date()
      };
      
      // Add payment details if available
      if (data.paymentDetails) {
        bookingData.paymentDetails = {
          method: data.paymentDetails.method || 'card',
          cardName: data.paymentDetails.cardName,
          // Store only last 4 digits for security
          cardNumberLast4: data.paymentDetails.cardNumber ? 
            data.paymentDetails.cardNumber.toString().slice(-4) : null,
          paymentStatus: data.paymentDetails.paymentStatus || 'completed'
        };
      }
      
      const booking = new Booking(bookingData);
      await booking.save({ session });
      
      // Update user's bookings array if it exists in schema
      if (Array.isArray(user.bookings)) {
        user.bookings.push(booking._id);
        await user.save({ session });
      }
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      // Fetch the complete booking with populated fields
      const completeBooking = await axios.post(`${API_URL}/bookings`, bookingData)
        .populate('user', 'name email phone')
        .lean();
      
      return completeBooking;
    } catch (error) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      
      console.error("Error creating booking:", error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  },
  
  // Get all bookings for a user with pagination
  async getUserBookings(email, options = {}) {
    try {
      if (!email) {
        throw new Error('Email is required to fetch user bookings');
      }
      
      const user = await User.findOne({ email });
      
      if (!user) {
        return {
          bookings: [],
          totalBookings: 0,
          totalPages: 0,
          currentPage: 1
        };
      }
      
      // Setup pagination
      const page = options.page || 1;
      const limit = options.limit || 10;
      const skip = (page - 1) * limit;
      
      // Build query
      const query = { user: user._id };
      
      // Add date range filter if provided
      if (options.startDate && options.endDate) {
        query['bookingDetails.date'] = {
          $gte: new Date(options.startDate),
          $lte: new Date(options.endDate)
        };
      }
      
      // Get bookings with pagination
      const bookings = await Booking.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('packageDetails', 'name price duration images')
        .lean();
      
      // Get total count for pagination
      const totalBookings = await Booking.countDocuments(query);
      
      return {
        bookings,
        totalBookings,
        totalPages: Math.ceil(totalBookings / limit),
        currentPage: page
      };
    } catch (error) {
      console.error("Error getting user bookings:", error);
      throw new Error(`Failed to get user bookings: ${error.message}`);
    }
  },
  
  // Get booking by ID
  async getBookingById(bookingId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error('Invalid booking ID format');
      }
      
      const booking = await Booking.findById(bookingId)
        .populate('user', 'name email phone')
        .populate('packageDetails', 'name description price duration images')
        .lean();
      
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      return booking;
    } catch (error) {
      console.error("Error getting booking:", error);
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  },
  
  // Update booking status
  async updateBookingStatus(bookingId, status) {
    try {
      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error('Invalid booking ID format');
      }
      
      if (!status) {
        throw new Error('Status is required for update');
      }
      
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { 
          status,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
      
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      return booking;
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw new Error(`Failed to update booking status: ${error.message}`);
    }
  },
  
  // Cancel booking
  async cancelBooking(bookingId, reason) {
    try {
      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error('Invalid booking ID format');
      }
      
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { 
          status: 'cancelled',
          cancellationReason: reason || 'User requested cancellation',
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
      
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      return booking;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  }
};