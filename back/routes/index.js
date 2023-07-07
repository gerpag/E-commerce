const express = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const adminRoute = require("./admin.route");
const { getProductSearch } = require("../controllers/search.controller");

const orderRouter = require("./order.route");

const reviewRoute = require("./review.route");
const shopingRoute = require("./shopping.route");
const emailRoute = require("./email.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/category", categoryRoute);
router.get("/search", getProductSearch);
router.use("/admin", adminRoute);

router.use("/shopping", shopingRoute);
router.use("/order", orderRouter);

router.use("/review", reviewRoute);
router.use("/shopping", shopingRoute);
router.use("/send-email", emailRoute);

module.exports = router;
