const Order = require("../models/Order");
const Product = require("../models/Product");

// Place an order
exports.placeOrder = async (req, res) => {
    try {
        const { products } = req.body; // Array of product IDs
        const userId = req.user.id; // From authMiddleware

        // Calculate total price
        let totalAmount = 0;
        for (let productId of products) {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: `Product ID ${productId} not found` });
            }
            totalAmount += product.price;
        }

        // Create order
        const order = await Order.create({ userId, products: JSON.stringify(products), totalAmount });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
};

// Get orders of the logged-in user
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.findAll({ where: { userId } });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
