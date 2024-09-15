const Type = require("../models/Type");

// Create a new type
const createType = async (req, res) => {
  try {
    const { typeName, description } = req.body;

    // Check if the type name already exists
    const existingType = await Type.findOne({ typeName });
    if (existingType) {
      return res.status(400).json({ message: "Type name already exists" });
    }

    // Create a new type instance
    const newType = new Type({ typeName, description });

    // Save type to the database
    await newType.save();

    res
      .status(201)
      .json({ message: "Type created successfully", type: newType });
  } catch (error) {
    res.status(500).json({ message: "Error creating type", error });
  }
};

// Get all types
const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error fetching types", error });
  }
};

// Get a type by ID
const getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);

    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: "Error fetching type", error });
  }
};

// Delete a type by ID
const deleteType = async (req, res) => {
  try {
    const type = await Type.findByIdAndDelete(req.params.id);

    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting type", error });
  }
};

// Update a type by ID
const updateType = async (req, res) => {
  try {
    const { typeName, description } = req.body;

    // Find and update the type
    const type = await Type.findById(req.params.id);

    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    // Update fields
    type.typeName = typeName || type.typeName;
    type.description = description || type.description;

    await type.save(); // Save updated type

    res.status(200).json({ message: "Type updated successfully", type });
  } catch (error) {
    res.status(500).json({ message: "Error updating type", error });
  }
};

module.exports = {
  createType,
  getAllTypes,
  getTypeById,
  deleteType,
  updateType,
};
