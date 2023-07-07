const { Users } = require("../models");
const bcrypt = require("bcrypt");
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

const registerAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isChecked, rolUser } = req.body;

    const user = await UserService.registerAdmin({
      userId,
      isChecked,
      rolUser,
    });

    responseHandler.created(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await Users.findByPk(req.user.id, {
      attributes: ["password", "id", "salt"],
    });

    if (!user) return responseHandler.unauthorize(res);

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid)
      return responseHandler.badrequest(res, "Contraseña incorrecta");

    const salt = bcrypt.genSaltSync(8);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    user.salt = salt;

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

module.exports = {
  signup,
  signin,
  getInfo,
  logout,
  registerAdmin,
  updatePassword,
};
