const { body, validationResult } = require("express-validator");
const { Users } = require("../models");
const responseHandler = require("../handlers/response.handler.js");

const validateSignup = [
  body("firstName")
    .exists()
    .withMessage("Nombre es requerido")
    .isLength({ min: 1 })
    .withMessage("Nombre mínimo 8 caracteres"),
  body("lastName")
    .exists()
    .withMessage("Apellido es requerido")
    .isLength({ min: 1 })
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
      const user = await Users.findOne({
        where: {
          username: value,
        },
      });
      if (user) throw new Error("El nombre de usuario ya existe!");
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
        throw new Error("Contraseña no coincide!");
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler.badrequest(res, errors.array()[0].msg);
    }
    next();
  },
];

const validateSignin = [
  body("username")
    .exists()
    .withMessage("Usuario es requerido")
    .isLength({ min: 8 })
    .withMessage("Usuario mínimo 8 caracteres")
    .custom(async (value, { req }) => {
      const user = await Users.findOne({
        where: {
          username: value,
        },
      });
      if (!user) throw new Error("Usuario no existe!");

      req.user = user;
    }),
  body("password")
    .exists()
    .withMessage("Contraseña es requerido")
    .isLength({ min: 8 })
    .withMessage("Contraseña mínimo 8 caracteres")
    .custom(async (value, { req }) => {
      const user = req.user;

      const isPasswordValid = await user.validatePassword(value);

      if (!isPasswordValid) throw new Error("Contraseña incorrecta");
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler.badrequest(res, errors.array()[0].msg);
    }
    next();
  },
];

module.exports = { validateSignup, validateSignin };
