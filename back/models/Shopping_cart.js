const Sequelize = require("sequelize");
const db = require("../configs/db");

class Shopping_cart extends Sequelize.Model {}

Shopping_cart.init(
  {
    
  },
  {
    sequelize: db,
    modelName: "shopping_cart",
  }
);

module.exports = Shopping_cart;
