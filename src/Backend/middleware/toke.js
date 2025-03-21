// Middleware to verify token
const verifyToken = async (req, res, next) => {
  try {
    // Check if authorization header exists and extract token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }
    
    // Extract token from "Bearer <token>" format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid authorization format. Use: Bearer <token>' });
    }
    
    const token = parts[1];
    
    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add user data to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      // Include any custom claims
      ...(decodedToken.role && { role: decodedToken.role }),
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error.code, error.message);
    
    // Provide more specific error messages based on the error code
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({ message: 'Token has been revoked' });
    } else if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({ message: 'Invalid token format' });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
};

module.exports = verifyToken;