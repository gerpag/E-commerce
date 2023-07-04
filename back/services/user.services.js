const Users = require("../models/Users");
const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler");
require("dotenv").config();

class UserService {
  static async signup({ firstName, lastName, email, username, password }) {
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
      });

      const token = jsonwebtoken.sign(
        { data: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );

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
    console.log("estoy en service")
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
    } catch {
      throw new Error("Error logging out");
    }
  }
}

module.exports = UserService;
