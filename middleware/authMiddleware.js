const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure correct path to User model

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No token provided" });
        }

        // Verify JWT Token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        // Find user by ID from token payload
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // Attach user object to request
        next(); // Continue to next middleware/route
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
