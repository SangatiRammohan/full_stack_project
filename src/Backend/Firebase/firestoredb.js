// Create a new file: src/Firebase/firestoreDB.js

import { getFirestore, doc, setDoc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { app } from './firebase'; // Import your Firebase app instance

// Initialize Firestore
const db = getFirestore(app);

// Function to store a new user in Firestore
export const storeUserInFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    
    // Check if user already exists
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      console.log("User already exists in Firestore");
      // Update last login time
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
      return userSnap.data();
    }
    
    // Create a new user document
    const userDocument = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    await setDoc(userRef, userDocument);
    console.log("User stored in Firestore");
    return userDocument;
  } catch (error) {
    console.error("Error storing user in Firestore:", error);
    throw error;
  }
};

// Function to verify user in Firestore during sign-in
export const verifyUserInFirestore = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // Update last login timestamp
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
      return userSnap.data();
    }
    
    return null;
  } catch (error) {
    console.error("Error verifying user in Firestore:", error);
    throw error;
  }
};

// Function to get user by email
export const getUserByEmail = async (email) => {
  try {
    // Firestore doesn't support direct queries on fields that aren't indexed
    // For a production app, you would need to set up a proper index or use a different approach
    // This is a simplified version for demonstration purposes
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    
    let foundUser = null;
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email === email) {
        foundUser = userData;
      }
    });
    
    return foundUser;
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
};

// Function to update user info in Firestore
export const updateUserInFirestore = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date()
    });
    console.log("User updated in Firestore");
    return true;
  } catch (error) {
    console.error("Error updating user in Firestore:", error);
    throw error;
  }
};