const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, admin } = require('../middlewares/auth'); 
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json("User already exists");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new User({ name, email, password: hashedPassword, isAdmin });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json("Server error");
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Invalid credentials");

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    // Generate token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send token and user object in response
    res.json({ token, user: { id: user._id, name: user.name, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json("Server error");
  }
});

// Admin Dashboard Route - only accessible to admins
router.get('/admin/dashboard', auth, admin, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
