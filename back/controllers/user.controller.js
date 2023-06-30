const { Users } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler.js");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const checkUser = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (checkUser)
      return responseHandler.badrequest(res, "username already used");

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

    responseHandler.created(res, {
      token,
      ...user.toJSON(),
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

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
    if (!user) return responseHandler.badrequest(res, "User not exist");

    if (!user.validatePassword(password))
      return responseHandler.badrequest(res, "Wrong password");
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user.toJSON(),
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

const logout = async (req, res) => {
  try {
    localStorage.removeItem("actkn");

    // Redirigir al usuario al inicio (home)
    res.redirect("/api/v1");
  } catch {
    responseHandler.error(res);
  }
};

module.exports = {
  signup,
  signin,
  getInfo,
  logout,
};
