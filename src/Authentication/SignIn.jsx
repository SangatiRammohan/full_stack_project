import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Backend/Firebase/firebase";
import { verifyUserInFirestore, storeUserInFirestore } from "../Backend/Firebase/firestoredb";
import "./Auth.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
  
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }
  
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
  
      // Get the Firebase ID token
      const token = await user.getIdToken();
  
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
  
      // Verify user exists in Firestore
      const firestoreUser = await verifyUserInFirestore(user.uid);
  
      if (!firestoreUser) {
        await storeUserInFirestore({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
  
      console.log("Sign in successful", userCredential);
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      console.error("Sign in error:", error);
  
      switch (error.code) {
        case 'auth/operation-not-allowed':
          setError('Email/Password sign-in is not enabled. Please use another sign-in method or contact the administrator.');
          break;
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Please try again later');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection');
          break;
        default:
          setError(error.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  // Adjusted to provide better Google sign-in with Firestore integration
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
  
    try {
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
  
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Get the Firebase ID token
      const token = await user.getIdToken();
  
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
  
      const firestoreUser = await verifyUserInFirestore(user.uid);
  
      if (!firestoreUser) {
        await storeUserInFirestore({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
  
      console.log("Google sign in successful", result.user);
      navigate('/');
    } catch (error) {
      console.error("Google sign in error:", error);
  
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign in was cancelled');
          break;
        case 'auth/operation-not-allowed':
          setError('Google sign-in is not enabled. Please contact the administrator.');
          break;
        case 'auth/unauthorized-domain':
          setError('This domain is not authorized for OAuth operations. Contact the administrator.');
          break;
        default:
          setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Adjusted Facebook sign-in with Firestore integration
  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Sign in with Facebook via Firebase
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const firestoreUser = await verifyUserInFirestore(user.uid);
      
      // If user doesn't exist in Firestore, create them
      if (!firestoreUser) {
        await storeUserInFirestore({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
        console.log("Facebook user stored in Firestore");
      }
      
      console.log("Facebook sign in successful", result);
      navigate('/');
    } catch (error) {
      console.error("Facebook sign in error:", error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign in was cancelled');
          break;
        case 'auth/operation-not-allowed':
          setError('Facebook sign-in is not enabled. Please contact the administrator.');
          console.warn('You need to enable Facebook sign-in in your Firebase console!');
          break;
        case 'auth/unauthorized-domain':
          setError('This domain is not authorized for OAuth operations. Contact the administrator.');
          console.warn('Add your domain to the authorized domains in Firebase console!');
          break;
        default:
          setError('Failed to sign in with Facebook. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign In</h2>
          <p>Welcome back! Please sign in to continue</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleEmailSignIn}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                required 
                minLength="6"
              />
              <i 
                className={`toggle-password fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="divider">
          <span>or continue with</span>
        </div>
        
        <div className="social-auth">
          <button 
            type="button" 
            className="btn btn-google" 
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <i className="fab fa-google"></i>
            Google
          </button>
          <button 
            type="button" 
            className="btn btn-facebook" 
            onClick={handleFacebookSignIn}
            disabled={loading}
          >
            <i className="fab fa-facebook-f"></i>
            Facebook
          </button>
        </div>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;