const express = require("express");
const userController = require("../controllers/user.controller");
const requestHandler = require("../handlers/request.handler");
const tokenMiddleware = require("../middlewares/token.middleware");
const {
  validateSignup,
  validateSignin,
  validateUpdatePassword,
} = require("../middlewares/validate.middleware");

const router = express.Router();

router.post(
  "/signup",
  validateSignup,
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  validateSignin,
  requestHandler.validate,
  userController.signin
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.post("/logout", tokenMiddleware.auth, userController.logout);

router.put(
  "/is_admin/:userId",
  tokenMiddleware.auth,
  userController.registerAdmin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  validateUpdatePassword,
  requestHandler.validate,
  userController.updatePassword
);

module.exports = router;
