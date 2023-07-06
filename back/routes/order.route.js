const express = require("express");
const router = express.Router();
const { getOrderHistory } = require("../controllers/order.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");
const tokenMiddleware = require("../middlewares/token.middleware");

router.get("/order-history", authenticateUser, getOrderHistory);

//tokenMiddleware.auth

module.exports = router;
