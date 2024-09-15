const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure at least 1 product is ordered
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price should be non-negative
    },
    size: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    package_color: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

// Export the OrderDetail model
module.exports = mongoose.model("OrderDetail", OrderDetailSchema);
