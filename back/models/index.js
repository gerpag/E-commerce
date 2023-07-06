const Users = require("./Users");
const Shopping_cart = require("./Shopping_cart");
const Products = require("./Products");
const Product_cart = require("./Product_cart");
const Categories = require("./Categories");

Shopping_cart.belongsTo(Users, { as: "user" });
Shopping_cart.hasMany(Product_cart, {
  foreignKey: "shoppingCartId",
  as: "products",
});
Product_cart.belongsTo(Products, { as: "product" });
Product_cart.belongsTo(Shopping_cart, { as: "shopping_cart" });
Products.belongsTo(Categories, { as: "category" });

module.exports = { Users, Products, Shopping_cart, Product_cart, Categories };
