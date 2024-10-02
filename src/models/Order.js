const mongoose = require("mongoose");

// OrderDetail schema
const OrderDetailSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
    min: 1, // Ensure at least 1 product is ordered
  },
  finalPrice: {
    type: Number,
    required: true,
    min: 0, // Price should be non-negative
  },
  size: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  bag: {
    type: String,
    required: false,
  },
});

// Order schema
const OrderSchema = new mongoose.Schema(
  {
    orderDetail: {
      type: [OrderDetailSchema], // Array of OrderDetail objects
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: false,
      min: 0, // Price should be non-negative
    },
    shippingFee: {
      type: Number,
      required: false,
      min: 0, // Price should be non-negative
    },
    customerName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    fullAddress: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },

    approveBy: {
      type: String,
      required: false,
      default: null,
    },
    orderStatus: {
      type: Number,
      required: false,
      default: 0,
    },
    note: {
      type: String,
      required: false,
    },
    letterSend: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Export the Order model
module.exports = mongoose.model("Order", OrderSchema);
