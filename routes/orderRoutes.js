const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder, getUserOrders, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
router.post("/", authMiddleware, placeOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders of the logged-in user
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get("/", authMiddleware, getUserOrders);

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/all", authMiddleware, getAllOrders);

module.exports = router;
