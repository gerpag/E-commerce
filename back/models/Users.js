const Sequelize = require("sequelize");
const db = require("../configs/db");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {}

User.init(
  {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_super_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.addHook("beforeCreate", (user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return bcrypt
    .hash(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

User.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};

module.exports = User;
