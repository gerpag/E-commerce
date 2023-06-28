const express = require("express");
const routerLogin = express.Router();
const { User } = require("../models");

routerLogin.post("/register", (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      console.error("Error while registering the user:", error);
      res.status(500).send("Server error");
    });
});

module.exports = routerLogin;
