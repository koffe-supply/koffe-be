const express = require("express");
const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - tagName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the tag
 *         tagName:
 *           type: string
 *           description: The name of the tag
 *         description:
 *           type: string
 *           description: Optional description of the tag
 *       example:
 *         tagName: "Technology"
 *         description: "Related to technology and gadgets"
 */

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: The tags managing API
 */

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: The tag was successfully created
 *       400:
 *         description: Tag name already exists
 *       500:
 *         description: Server error
 */
router.post("/", createTag);

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: The list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
router.get("/", getAllTags);

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: The tag by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag not found
 */
router.get("/:id", getTagById);

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: The tag was updated successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", updateTag);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 */
router.delete("/:id", deleteTag);

module.exports = router;
