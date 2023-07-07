const { Users } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler.js");
require("dotenv").config();
const UserService = require("../services/user.services");

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      is_admin,
      is_super_admin,
    } = req.body;

    const user = await UserService.signup({
      firstName,
      lastName,
      email,
      username,
      password,
      is_admin,
      is_super_admin,
    });

    responseHandler.created(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserService.signin({
      username,
      password,
    });

    responseHandler.created(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserService.getInfo(userId);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

const logout = async (req, res) => {
  try {
    await UserService.logout();

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
