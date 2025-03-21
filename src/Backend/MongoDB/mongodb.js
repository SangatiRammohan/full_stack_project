// src/MongoDB/mongodb.js

import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace with your MongoDB connection string
const uri = process.env.REACT_APP_MONGODB_URI || "mongodb://localhost:27017/cityPulse";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10, // Connection pool size
  connectTimeoutMS: 5000, // Connection timeout
};

const client = new MongoClient(uri, options);
let dbConnection;

// Connect to MongoDB
export const connectToMongoDB = async () => {
  try {
    // Only connect if not already connected
    if (!dbConnection) {
      await client.connect();
      dbConnection = client.db('cityPulse'); // Replace 'cityPulse' with your database name
      
      // Ping database to confirm connection
      await dbConnection.command({ ping: 1 });
      console.log("✅ Successfully connected to MongoDB");
    }
    return dbConnection;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

// Get the database connection
export const getDB = () => {
  if (!dbConnection) {
    throw new Error("Database not connected. Call connectToMongoDB first.");
  }
  return dbConnection;
};

// Gracefully close the connection
export const closeMongoDB = async () => {
  try {
    if (client) {
      await client.close();
      dbConnection = null;
      console.log("MongoDB connection closed successfully");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
};

// Function to store a new user in MongoDB
export const storeUserInMongoDB = async (user) => {
  try {
    const db = getDB();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: user.email });
    
    if (existingUser) {
      console.log("User already exists in MongoDB");
      return existingUser;
    }
    
    // Create a new user document
    const userDocument = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      role: user.role || "user",
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
      preferences: {
        notifications: true,
        theme: "light"
      },
      // Add city-specific fields if this is a city guide app
      favoriteLocations: [],
      visitHistory: []
    };
    
    const result = await db.collection('users').insertOne(userDocument);
    console.log(`User created with ID: ${result.insertedId}`);
    return { ...userDocument, _id: result.insertedId };
  } catch (error) {
    console.error("Error storing user in MongoDB:", error);
    throw error;
  }
};

// Function to verify user in MongoDB during sign-in
export const verifyUserInMongoDB = async (email) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ email });
    
    if (user) {
      // Update last login timestamp
      await db.collection('users').updateOne(
        { email },
        { 
          $set: { lastLogin: new Date() },
          $inc: { loginCount: 1 } // Track number of logins
        }
      );
      
      console.log(`User verified: ${user.email}`);
    } else {
      console.log(`User not found: ${email}`);
    }
    
    return user;
  } catch (error) {
    console.error("Error verifying user in MongoDB:", error);
    throw error;
  }
};

// Function to update user info in MongoDB
export const updateUserInMongoDB = async (uid, userData) => {
  try {
    const db = getDB();
    
    // Prevent overwriting of critical fields
    delete userData.uid;
    delete userData.createdAt;
    delete userData._id;
    
    const result = await db.collection('users').updateOne(
      { uid },
      { 
        $set: { 
          ...userData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      throw new Error(`User with uid ${uid} not found`);
    }
    
    console.log(`User updated: ${uid}`);
    return result;
  } catch (error) {
    console.error("Error updating user in MongoDB:", error);
    throw error;
  }
};

// Function to delete a user
export const deleteUserInMongoDB = async (uid) => {
  try {
    const db = getDB();
    const result = await db.collection('users').deleteOne({ uid });
    
    if (result.deletedCount === 0) {
      throw new Error(`User with uid ${uid} not found`);
    }
    
    console.log(`User deleted: ${uid}`);
    return result;
  } catch (error) {
    console.error("Error deleting user in MongoDB:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (uid) => {
  try {
    const db = getDB();
    return await db.collection('users').findOne({ uid });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

// Get all users (with pagination)
export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const db = getDB();
    const skip = (page - 1) * limit;
    
    const users = await db.collection('users')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
      
    const total = await db.collection('users').countDocuments();
    
    return {
      users,
      totalUsers: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

// Store payment information
export const storePaymentInMongoDB = async (paymentData) => {
  try {
    const db = getDB();
    
    const paymentDocument = {
      ...paymentData,
      createdAt: new Date()
    };
    
    const result = await db.collection('payments').insertOne(paymentDocument);
    console.log(`Payment stored with ID: ${result.insertedId}`);
    return { ...paymentDocument, _id: result.insertedId };
  } catch (error) {
    console.error("Error storing payment in MongoDB:", error);
    throw error;
  }
};

// Get user payments
export const getUserPayments = async (uid) => {
  try {
    const db = getDB();
    return await db.collection('payments')
      .find({ 'user.uid': uid })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("Error getting user payments:", error);
    throw error;
  }
};