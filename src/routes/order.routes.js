const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetail:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *         - price
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product
 *         quantity:
 *           type: number
 *           description: The quantity of the product ordered
 *         price:
 *           type: number
 *           description: The price of the product
 *         size:
 *           type: number
 *           description: Size of the product (optional)
 *         weight:
 *           type: number
 *           description: Weight of the product (optional)
 *         package_color:
 *           type: number
 *           description: Color of the package (optional)
 *       example:
 *         productId: "64fc8f9e4f1a5a33a32f5f2d"
 *         quantity: 2
 *         price: 19.99
 *         size: 10
 *         weight: 1.5
 *         package_color: 3
 *     Order:
 *       type: object
 *       required:
 *         - orderDetail
 *         - totalPrice
 *         - shippingFee
 *         - customerName
 *         - address
 *         - fullAddress
 *         - city
 *         - phone
 *         - payment
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         orderDetail:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderDetail'
 *         email:
 *           type: string
 *           description: Customer email (optional)
 *         totalPrice:
 *           type: number
 *           description: Total price of the order
 *         shippingFee:
 *           type: number
 *           description: Shipping fee of the order
 *         customerName:
 *           type: string
 *           description: Customer's name
 *         address:
 *           type: string
 *           description: Delivery address
 *         fullAddress:
 *           type: string
 *           description: Full delivery address including any additional details
 *         city:
 *           type: string
 *           description: Delivery city
 *         postalCode:
 *           type: string
 *           description: Postal code (optional)
 *         phone:
 *           type: string
 *           description: Customer's phone number
 *         payment:
 *           type: number
 *           description: Payment method used
 *         approveBy:
 *           type: string
 *           description: Who approved the order (optional)
 *         orderStatus:
 *           type: number
 *           description: Status of the order (default 0)
 *         paymentStatus:
 *           type: number
 *           description: Status of the payment (default 0)
 *       example:
 *         orderDetail:
 *           - productId: "64fc8f9e4f1a5a33a32f5f2d"
 *             quantity: 2
 *             price: 19.99
 *             size: 10
 *             weight: 1.5
 *             package_color: 3
 *         email: "customer@example.com"
 *         totalPrice: 39.98
 *         shippingFee: 5.00
 *         customerName: "John Doe"
 *         address: "123 Main St"
 *         fullAddress: "123 Main St, Apartment 4B"
 *         city: "New York"
 *         postalCode: "10001"
 *         phone: "123-456-7890"
 *         payment: 1
 *         approveBy: null
 *         orderStatus: 0
 *         paymentStatus: 0
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *       500:
 *         description: Server error
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteOrder);

module.exports = router;
