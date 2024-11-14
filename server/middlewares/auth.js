// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Auth Middleware - Verifies the token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    res.status(400).json("Invalid token");
  }
};

// Admin Middleware - Checks if user is admin
const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json("Access denied. Admins only.");
  }
  next();
};

module.exports = { auth, admin };
