const Sequelize = require("sequelize");
const db = require("../configs/db");
const Users = require("./Users");

class ShoppingCart extends Sequelize.Model {}

ShoppingCart.init(
  {},
  {
    sequelize: db,
    modelName: "shopping_cart",
  }
);

ShoppingCart.belongsTo(Users, { as: "author" });

module.exports = ShoppingCart;
