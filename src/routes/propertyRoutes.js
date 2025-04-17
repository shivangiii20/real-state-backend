const express = require("express");
const { auth, adminOnly } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 1) Public READ – no auth needed
router.get("/", getProperties);

// 2) Protected WRITE – only admins
router.post(
  "/create",
  auth,
  adminOnly,
  upload.array("images", 5),
  createProperty
);

router.put(
  "/:id",
  auth,
  adminOnly,
  upload.array("images", 5),
  updateProperty
);

router.delete(
  "/delete/:id",
  auth,
  adminOnly,
  deleteProperty
);

module.exports = router;
