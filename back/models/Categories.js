const Sequelize = require("sequelize");
const db = require("../configs/db");

class Categories extends Sequelize.Model {}

Categories.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  { sequelize: db, modelName: "categories" }
);

module.exports = Categories;
