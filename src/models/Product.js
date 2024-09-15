const mongoose = require("mongoose");

// Define a sub-schema for descriptionMore
const DescriptionMoreSchema = new mongoose.Schema({
  roast_level: {
    type: String,
    required: false,
  },
  flavor: {
    type: String,
    required: false,
  },
  brewing: {
    type: String,
    required: false,
  },
  altitude: {
    type: String,
    required: false,
  },
  variety: {
    type: String,
    required: false,
  },
  cultivation: {
    type: String,
    required: false,
  },
});

// Main Product schema
const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag", // Reference to the Tag model
      },
    ],
    description: {
      type: String,
      required: false, // Optional description field
    },
    descriptionMore: {
      type: DescriptionMoreSchema, // Use the sub-schema here
      required: false,
      default: null,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type", // Reference to the ProductType model
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageMore: {
      type: Array, // Array of strings for multiple images
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
