const Property = require("../models/propertyModel");

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const images = req.files.map((file) => `uploads/${file.filename}`);
    const newProperty = await Property.create({ heading, description, images });
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;
    const images = req.files?.length ? req.files.map((file) => `uploads/${file.filename}`) : undefined;

    const updatedFields = { heading, description };
    if (images) updatedFields.images = images;

    const updatedProperty = await Property.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProperty) return res.status(404).json({ message: "Property not found" });

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProperty =  await Property.findByIdAndDelete(id);
    res.status(201).json(deleteProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



