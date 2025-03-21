import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Backend/Firebase/firebase";
import { storeUserInFirestore } from "../Backend/Firebase/firestoredb";
import "./Auth.css";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      // 1. Create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update the display name in Firebase
      await updateProfile(userCredential.user, { displayName: name });
      
      // 3. Store user data in Firestore
      const user = userCredential.user;
      await storeUserInFirestore({
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: user.photoURL
      });
      
      console.log("User successfully created in Firebase and Firestore");
      navigate('/'); // Redirect to home after successful signup
    } catch (error) {
      console.error("Sign up error:", error);
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already associated with an account');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/Password sign-up is not enabled');
          break;
        default:
          setError(error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Store user data in Firestore
      await storeUserInFirestore({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      
      navigate('/');
    } catch (error) {
      console.error("Google sign up error:", error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign up was cancelled');
          break;
        case 'auth/operation-not-allowed':
          setError('Google sign-up is not enabled');
          break;
        default:
          setError('Failed to sign up with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Sign in with Facebook
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      
      // Store user data in Firestore
      await storeUserInFirestore({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      
      navigate('/');
    } catch (error) {
      console.error("Facebook sign up error:", error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign up was cancelled');
          break;
        case 'auth/operation-not-allowed':
          setError('Facebook sign-up is not enabled');
          break;
        default:
          setError('Failed to sign up with Facebook. Please try again.');
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
          <h2>Create Account</h2>
          <p>Sign up for a new account to get started</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleEmailSignUp}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
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
                placeholder="Create a password"
                required
                minLength="6"
              />
              <i 
                className={`toggle-password fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength="6"
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="divider">
          <span>or continue with</span>
        </div>
        
        <div className="social-auth">
          <button 
            type="button" 
            className="btn btn-google" 
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <i className="fab fa-google"></i>
            Google
          </button>
          <button 
            type="button" 
            className="btn btn-facebook" 
            onClick={handleFacebookSignUp}
            disabled={loading}
          >
            <i className="fab fa-facebook-f"></i>
            Facebook
          </button>
        </div>
        
        <div className="auth-footer">
          Already have an account? <Link to="/signin" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;