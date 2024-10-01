const Product = require("../models/Product");
const Tag = require("../models/Tag");
const Type = require("../models/Type");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      tags,
      description,
      descriptionMore,
      type,
      price,
      image,
      imageMore,
    } = req.body;

    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }

    // Validate tags
    if (tags && tags.length > 0) {
      const tagsExist = await Tag.find({ _id: { $in: tags } });
      if (tagsExist.length !== tags.length) {
        return res
          .status(400)
          .json({ message: "One or more tags are invalid" });
      }
    }

    // Validate type
    const typeExists = await Type.findById(type);
    if (!typeExists) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    // Create a new product instance
    const newProduct = new Product({
      productName,
      tags,
      description,
      descriptionMore,
      price,
      type,
      image,
      imageMore,
    });

    // Save product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("tags").populate("type");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("tags")
      .populate("type");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      tags,
      description,
      descriptionMore,
      type,
      image,
      price,
      imageMore,
    } = req.body;

    // Find and update the product
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate tags
    if (tags && tags.length > 0) {
      const tagsExist = await Tag.find({ _id: { $in: tags } });
      if (tagsExist.length !== tags.length) {
        return res
          .status(400)
          .json({ message: "One or more tags are invalid" });
      }
    }

    // Validate type
    if (type) {
      const typeExists = await Type.findById(type);
      if (!typeExists) {
        return res.status(400).json({ message: "Invalid product type" });
      }
    }

    // Update fields
    product.productName = productName || product.productName;
    product.tags = tags || product.tags;
    product.description = description || product.description;
    product.descriptionMore = descriptionMore || product.descriptionMore;
    product.type = type || product.type;
    product.image = image || product.image;
    product.imageMore = imageMore || product.imageMore;
    product.price = imageMore || product.price;

    await product.save(); // Save updated product

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
