const express = require("express");
const adminRouter = express.Router();
const Users = require("../models/Users");
const adminControllers = require("../controllers/admin.controller");
const { error } = require("../handlers/response.handler");

adminRouter.get("/users", adminControllers.getUsers);

adminRouter.get("/users/:id",adminControllers.getUserById );

adminRouter.delete("/users/:id",adminControllers.deleteUserById)
 

module.exports = adminRouter;
