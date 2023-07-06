const CategoryService = require("../services/category.services");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryData = {
      name: name,
    };
    const category = await CategoryService.addCategory(categoryData);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    const categoryData = {
      categoryId: categoryId,
      name: name,
    };
    const category = await CategoryService.updateCategory(categoryData);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryService.deleteCategory(categoryId);
    res.json(category);
  } catch (error) {
    console.log(error);
    if (error.message === "Category not found") {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryService.getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    console.log(error);
    if (error.message === "Category not found") {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
