const admin = require('firebase-admin');

// Firebase Admin initialization
try {
  // Check if Firebase Admin is already initialized to prevent multiple initializations
  if (!admin.apps.length) {
    // Check if required environment variables are set
    if (!process.env.FIREBASE_PROJECT_ID || 
        !process.env.FIREBASE_CLIENT_EMAIL || 
        !process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error('Missing required Firebase configuration environment variables');
    }
    
    // Format the private key correctly
    // The private key should be a string, not an array that needs parsing
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;
    
      dotenv.config(); // Load environment variables

      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
        }),
      });
      
    console.log('Firebase Admin initialized successfully');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  // Consider process.exit(1) here for critical errors that should stop the server
}

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }
    
    // Extract token
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid authorization format. Use: Bearer <token>' });
    }
    
    const token = parts[1];
    
    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add user object to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      role: decodedToken.role || 'user',
      // Add any other claims you need from the token
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Provide more specific error messages
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.code === 'auth/argument-error') {
      return res.status(401).json({ message: 'Invalid token format' });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
};

module.exports = verifyToken;