const Users = require("./Users");
const ShoppingCart = require("./Shopping_cart");
const Products = require("./Products");
const Product_cart = require("./Product_cart");

ShoppingCart.belongsTo(Users, { as: "user" });
Product_cart.belongsTo(Products, { as: "product" });
Product_cart.belongsTo(ShoppingCart, { as: "shopping_cart" });

module.exports = { Users, Products, ShoppingCart, Product_cart };
