const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      unique: true, // Ensures that each tag name is unique
    },
    description: {
      type: String,
      required: false, // Optional description for the tag
    },
  },
  { timestamps: true }
);

// Export the Tag model
module.exports = mongoose.model("Tag", TagSchema);
