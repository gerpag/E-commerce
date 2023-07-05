const Products = require("../models/Products");

class ProductService {
  static async addProduct(productData) {
    try {
      const { id_category, name, description, price, url_image, stock } =
        productData;
      const product = await Products.create({
        categoryId: id_category,
        name: name,
        description: description,
        price: price,
        url_image: url_image,
        stock: stock,
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Products.findByPk(productId);
      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = ProductService;
