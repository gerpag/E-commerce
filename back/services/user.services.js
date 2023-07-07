const Users = require("../models/Users");
const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler");
require("dotenv").config();

class UserService {
  static async signup({
    firstName,
    lastName,
    email,
    username,
    password,
    is_admin,
    is_super_admin,
  }) {
    try {
      const checkUser = await Users.findOne({
        where: {
          username: username,
        },
      });

      if (checkUser) throw new Error("username already used");

      const user = await Users.create({
        firstname: firstName,
        lastname: lastName,
        email: email,
        username: username,
        password: password,
        is_admin: is_admin,
        is_super_admin: is_super_admin,
      });

      const token = jsonwebtoken.sign(
        { data: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      user.password = undefined;
      user.salt = undefined;

      return {
        token,
        ...user.toJSON(),
        id: user.id,
      };
    } catch (error) {
      throw error;
    }
  }

  static async signin({ username, password }) {
    try {
      const user = await Users.findOne({
        where: {
          username: username,
        },
        attributes: [
          "username",
          "password",
          "salt",
          "id",
          "firstname",
          "lastname",
          "email",
          "is_admin",
          "is_super_admin",
        ],
      });

      const token = jsonwebtoken.sign(
        { data: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      user.password = undefined;
      user.salt = undefined;

      return {
        token,
        ...user.toJSON(),
        id: user.id,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getInfo(userId) {
    try {
      const user = await Users.findByPk(userId);
      if (!user) return responseHandler.notfound(res);

      return user;
    } catch {
      throw new Error("Error retrieving user information");
    }
  }

  static async logout() {
    try {
      localStorage.removeItem("actkn");
      localStorage.removeItem("shopingCart");
    } catch {
      throw new Error("Error logging out");
    }
  }

  static async registerAdmin({ userId, isChecked, rolUser }) {
    try {
      const checkUser = await Users.findOne({
        where: {
          id: userId,
        },
      });

      if (checkUser) {
        let updateField;

        if (rolUser === "admin") {
          updateField = { is_admin: isChecked };
        } else if (rolUser === "super_admin") {
          updateField = { is_super_admin: isChecked };
        }

        if (updateField) {
          await Users.update(updateField, {
            where: {
              id: userId,
            },
          });
        }

        const { dataValues } = await Users.findByPk(userId);
        return dataValues;
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
