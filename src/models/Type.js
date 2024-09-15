const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
      unique: true, // Ensures that each product type name is unique
    },
    description: {
      type: String,
      required: false, // Optional description for the product type
    },
  },
  { timestamps: true }
);

// Export the ProductType model
module.exports = mongoose.model("Type", TypeSchema);
