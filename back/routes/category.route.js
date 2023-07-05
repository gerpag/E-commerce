const express = require("express");
const categoryController = require("../controllers/category.controller");

const router = express.Router();

router.post("/add", categoryController.addCategory);
router.get("/all", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryId);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
