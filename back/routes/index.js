const express = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/product", productRoute);

module.exports = router;
