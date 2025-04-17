const Lead = require("../models/leadModel");

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, message, state, city } = req.body;
    const newLead = await Lead.create({ name, phone, email, message, state, city });
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, state, city, message } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { name, phone, email, state, city, message },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



