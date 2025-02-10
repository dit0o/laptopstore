const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder, getUserOrders, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

// Place an order (Protected)
router.post("/", authMiddleware, placeOrder);

// Get orders of the logged-in user (Protected)
router.get("/", authMiddleware, getUserOrders);

// Get all orders (Protected - Admin only)
router.get("/all", authMiddleware, getAllOrders);

module.exports = router;
