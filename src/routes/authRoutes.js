// SERVER/src/routes/authRoutes.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/userModel');
const router  = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ msg: "Invalid credentials" });
  const ok = await bcrypt.compare(password, u.password);
  if (!ok) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: u._id, role: u.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: u.role });
});

module.exports = router;
