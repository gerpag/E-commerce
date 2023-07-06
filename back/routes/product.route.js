const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.post("/add", productController.addProduct);
router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductId);
router.get("/category/:id", productController.getProductCategory);
router.delete("/:id", productController.deleteProductById);
router.put("/:id", productController.updateProductById);

module.exports = router;
