const mongoose = require("mongoose");

// OrderDetail schema
const OrderDetailSchema = new mongoose.Schema({
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
  note: {
    type: String,
    required: false,
  },
  letterSend: {
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
      required: true,
      min: 0, // Price should be non-negative
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0, // Price should be non-negative
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    approveBy: {
      type: String,
      required: false,
      default: null,
    },
    orderStatus: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentStatus: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

// Export the Order model
module.exports = mongoose.model("Order", OrderSchema);
