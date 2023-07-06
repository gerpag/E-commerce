const Categories = require("../models/Categories");

class CategoryService {
  static async addCategory(categoryData) {
    try {
      const { name } = categoryData;
      const category = await Categories.create({
        name: name,
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async updateCategory(categoryData) {
    try {
      const { categoryId, name } = categoryData;

      const searchUpdatedCategory = await Categories.findOne({
        where: { id: categoryId },
      });

      if (searchUpdatedCategory) {
        await Categories.update(
          {
            name: name,
          },
          { where: { id: categoryId } }
        );

        const { dataValues } = await Categories.findByPk(categoryId);
        return dataValues;
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async deleteCategory(categoryId) {
    try {
      const deletedCategory = await Categories.findOne({
        where: { id: categoryId },
      });
      if (deletedCategory) {
        console.log("ww");
        await Categories.destroy({
          where: { id: categoryId },
        });
        return deletedCategory["dataValues"];
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getAllCategories() {
    try {
      const categories = await Categories.findAll({
        order: [["createdAt", "DESC"]],
      });
      return categories;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getCategoryById(categoryId) {
    try {
      const category = await Categories.findByPk(categoryId);
      if (category) {
        return category;
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = CategoryService;
