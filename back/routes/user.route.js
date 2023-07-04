const express = require("express");
const userController = require("../controllers/user.controller");
const requestHandler = require("../handlers/request.handler");
const tokenMiddleware = require("../middlewares/token.middleware");
const {
  validateSignup,
  validateSignin,
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

module.exports = router;
