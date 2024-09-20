const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - type
 *         - image
 *         - imageMore
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tag IDs associated with the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         pricePerKilogram:
 *           type: number
 *           description: price of product
 *         descriptionMore:
 *           type: object
 *           properties:
 *             roast_level:
 *               type: string
 *             flavor:
 *               type: string
 *             brewing:
 *               type: string
 *             altitude:
 *               type: string
 *             variety:
 *               type: string
 *             cultivation:
 *               type: string
 *           description: Detailed description of the product
 *         type:
 *           type: string
 *           description: The type ID of the product
 *         image:
 *           type: string
 *           description: URL of the main image of the product
 *         imageMore:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of URLs for additional images
 *       example:
 *         productName: Premium Coffee
 *         tags: [ "60c72b2f5f9b2c001c8e4f1e" ]
 *         pricePerGram: 200
 *         description: High-quality premium coffee
 *         descriptionMore:
 *           roast_level: Medium
 *           flavor: Nutty
 *           brewing: French Press
 *           altitude: 1500m
 *           variety: Arabica
 *           cultivation: Organic
 *         type: "60c72b2f5f9b2c001c8e4f1d"
 *         image: http://example.com/image.jpg
 *         imageMore: [ "http://example.com/image1.jpg", "http://example.com/image2.jpg" ]
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update the product by the id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", updateProduct);

module.exports = router;
