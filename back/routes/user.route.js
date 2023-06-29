const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const requestHandler = require("../handlers/request.handler");
const userModel = require("../models/Users.js");
const tokenMiddleware = require("../middlewares/token.middleware");

const router = express.Router();

router.post(
  "/signup",
  body("firstName")
    .exists()
    .withMessage("Nombre es requerido")
    .isLength({ min: 8 })
    .withMessage("Nombre mínimo 8 caracteres"),
  body("lastName")
    .exists()
    .withMessage("Apellido es requerido")
    .isLength({ min: 8 })
    .withMessage("Apellido mínimo 8 caracteres"),
  body("email")
    .exists()
    .withMessage("Correo electrónico es requerido")
    .isEmail()
    .withMessage("Correo electrónico no es válido"),
  body("username")
    .exists()
    .withMessage("Usuario es requerido")
    .isLength({ min: 8 })
    .withMessage("Usuario mínimo 8 caracteres")
    .custom(async (value) => {
      const user = await userModel.findOne({
        where: {
          username: value,
        },
      });
      if (user) return Promise.reject("username already used");
    }),
  body("password")
    .exists()
    .withMessage("Contraseña es requerido")
    .isLength({ min: 8 })
    .withMessage("Contraseña mínimo 8 caracteres"),
  body("confirmPassword")
    .exists()
    .withMessage("Confirmar contraseña es requerido")
    .isLength({ min: 8 })
    .withMessage("Confirmar contraseña mínimo 8 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("confirmPassword not match");
      return true;
    }),
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("Usuario es requerido")
    .isLength({ min: 8 })
    .withMessage("Usuario mínimo 8 caracteres"),
  body("password")
    .exists()
    .withMessage("Contraseña es requerido")
    .isLength({ min: 8 })
    .withMessage("Contraseña mínimo 8 caracteres"),
  requestHandler.validate,
  userController.signin
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

module.exports = router;
