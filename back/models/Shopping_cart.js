const Sequelize = require("sequelize");
const db = require("../configs/db");

class Shopping_cart extends Sequelize.Model {}

Shopping_cart.init(
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

module.exports = Shopping_cart;
