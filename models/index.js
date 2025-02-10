const sequelize = require("../config/db");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");

// Define relationships
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

module.exports = { sequelize, User, Product, Order };
