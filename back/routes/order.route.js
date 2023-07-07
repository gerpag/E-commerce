const express = require("express");
const router = express.Router();
const { getOrderHistory } = require("../controllers/order.controller");

const tokenMiddleware = require("../middlewares/token.middleware");

router.get("/order-history/:id", getOrderHistory);

module.exports = router;
