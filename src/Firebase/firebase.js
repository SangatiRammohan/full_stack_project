// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import the `getAuth` function for Firebase Authentication
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCao_x2b3Iy7PC-TqA80k6p5rSwL5-wS7k",
  authDomain: "fullstack-b26e9.firebaseapp.com",
  projectId: "fullstack-b26e9",
  storageBucket: "fullstack-b26e9.firebasestorage.app",
  messagingSenderId: "995256871771",
  appId: "1:995256871771:web:023c031d999e4f85cbc87e",
  measurementId: "G-XC0MVHP83P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the `auth` instance
export { auth };
export default app;
