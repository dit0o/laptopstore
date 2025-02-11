require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const swaggerDocs = require("./config/swagger"); // Import Swagger

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Initialize Swagger Docs
swaggerDocs(app);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced!");
});
