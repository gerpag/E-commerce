const { Sequelize } = require("sequelize");
const db = require("../configs/db");

class Review extends Sequelize.Model {}

Review.init(
  {
    comments: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    starts: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "review" }
);

module.exports = Review;
