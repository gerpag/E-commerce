const Sequelize = require("sequelize");
const db = require("../configs/db");

class Product_cart extends Sequelize.Model {}

Product_cart.init(
  {
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "product_cart",
  }
);

module.exports = Product_cart;
