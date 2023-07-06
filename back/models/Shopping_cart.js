const Sequelize = require("sequelize");
const db = require("../configs/db");

class ShoppingCart extends Sequelize.Model {}

ShoppingCart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "shopping_cart",
  }
);

module.exports = ShoppingCart;
