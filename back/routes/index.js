const express = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const { getProductSearch } = require("../controllers/search.controller");

const router = express.Router();

router.use("/user", userRoute);
router.use("/product", productRoute);
router.get("/search", getProductSearch);

module.exports = router;
