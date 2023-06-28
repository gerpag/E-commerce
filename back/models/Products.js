const Sequelize = require("sequelize");
const db = require("../configs/db");

class Products extends Sequelize.Model {}

Products.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    url_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "products" }
);

module.exports = Products;
