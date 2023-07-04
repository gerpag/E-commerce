
const { Op } = require("sequelize");
const Products = require("../models/Products");

class SearchServices {
  static async getProductSearch(search) {
    try {
      const products = await Products.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error en el servidor");
    }
  }
}

module.exports = SearchServices;