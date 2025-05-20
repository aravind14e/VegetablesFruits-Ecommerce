const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from database based on token payload (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  } else if (!token) {
    // If no token is found in the header
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

// Grant access to specific roles
const authorize = (roles = []) => {
  return (req, res, next) => {
    // roles param can be a single role string or an array of roles
    if (typeof roles === 'string') {
        roles = [roles];
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: `User role ${req.user.role} is not authorized to access this route` });
    }
    next();
  };
};

module.exports = { protect, authorize }; 