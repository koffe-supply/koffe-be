const Tag = require("../models/Tag");

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { tagName, description } = req.body;

    // Check if the tag name already exists
    const existingTag = await Tag.findOne({ tagName });
    if (existingTag) {
      return res.status(400).json({ message: "Tag name already exists" });
    }

    // Create and save the new tag
    const newTag = new Tag({ tagName, description });
    await newTag.save();

    res.status(201).json({ message: "Tag created successfully", newTag });
  } catch (error) {
    res.status(500).json({ message: "Error creating tag", error });
  }
};

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags", error });
  }
};

// Get a tag by ID
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tag", error });
  }
};

// Update a tag by ID
const updateTag = async (req, res) => {
  try {
    const { tagName, description } = req.body;

    // Find and update the tag
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    tag.tagName = tagName || tag.tagName;
    tag.description = description || tag.description;
    await tag.save();

    res.status(200).json({ message: "Tag updated successfully", tag });
  } catch (error) {
    res.status(500).json({ message: "Error updating tag", error });
  }
};

// Delete a tag by ID
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tag", error });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
