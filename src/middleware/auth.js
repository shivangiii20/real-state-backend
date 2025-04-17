// SERVER/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "No token provided" });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ msg: "Invalid token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: "Admins only" });
  }
  next();
};
