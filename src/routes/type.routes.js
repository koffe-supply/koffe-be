const express = require("express");
const {
  createType,
  getAllTypes,
  getTypeById,
  deleteType,
  updateType,
} = require("../controllers/type.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Type:
 *       type: object
 *       required:
 *         - typeName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the type
 *         typeName:
 *           type: string
 *           description: The name of the type
 *         description:
 *           type: string
 *           description: The description of the type
 *       example:
 *         typeName: Electronics
 *         description: Gadgets and electronic devices
 */

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: The product types managing API
 */

/**
 * @swagger
 * /api/types:
 *   post:
 *     summary: Create a new type
 *     tags: [Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Type'
 *     responses:
 *       201:
 *         description: The type was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       500:
 *         description: Some server error
 */
router.post("/", createType);

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Returns the list of all the types
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: The list of the types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 */
router.get("/", getAllTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     summary: Get the type by id
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The type id
 *     responses:
 *       200:
 *         description: The type description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       404:
 *         description: The type was not found
 */
router.get("/:id", getTypeById);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     summary: Remove the type by id
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The type id
 *     responses:
 *       200:
 *         description: The type was deleted
 *       404:
 *         description: The type was not found
 */
router.delete("/:id", deleteType);

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     summary: Update the type by the id
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The type id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Type'
 *     responses:
 *       200:
 *         description: The type was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       404:
 *         description: The type was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", updateType);

module.exports = router;
