const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
