const Sequelize = require("sequelize");
const db = new Sequelize("project_ecommerce", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
