const Sequelize = require("sequelize");
const db = new Sequelize(
  "project_ecommerce",
  process.env.USER_DB,
  process.env.PASS_DB,
  {
    host: process.env.HOST,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = db;
