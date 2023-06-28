const express = require("express");
const userLoginRouter = express.Router();
const User = require("../models/Users");

userLoginRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      return res.send("No existe el usuario logueado");
    }
    user.validatePassword(password).then((isValid) => {
      if (!isValid) {
        return send("Password invalido");
      }

      const payload = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      const token = generateToken(payload);
      res.cookie("token", token);

      res.send(payload);
    });
  });
});


userLoginRouter.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(418).send("No hay un usuario logueado");
  }
  const { payload } = validateToken(token);
  console.log("payload", payload);
  res.send(payload);
});

userLoginRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = userLoginRouter;
