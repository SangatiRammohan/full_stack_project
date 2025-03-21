// Import Firebase services using ES Modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCao_x2b3Iy7PC-TqA80k6p5rSwL5-wS7k",
  authDomain: "fullstack-b26e9.firebaseapp.com",
  projectId: "fullstack-b26e9",
  storageBucket: "fullstack-b26e9.appspot.com",
  messagingSenderId: "995256871771",
  appId: "1:995256871771:web:023c031d999e4f85cbc87e",
  measurementId: "G-XC0MVHP83P"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Email/Password Authentication Functions
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User Registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged In:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User Logged Out");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

// Export Firebase services and functions using ES Modules
export { app, auth, db, googleProvider, registerUser, loginUser, logoutUser };
