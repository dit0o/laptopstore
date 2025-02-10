const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

// Get all products (Public)
router.get("/", getProducts);

// Add a new product (Protected - Only Admin)
router.post("/", authMiddleware, addProduct);

// Update a product (Protected - Only Admin)
router.put("/:id", authMiddleware, updateProduct);

// Delete a product (Protected - Only Admin)
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
