const ProductService = require("../services/product.services");

exports.addProduct = async (req, res) => {
  try {
    const { id, id_category, name, description, price, url_image, stock } =
      req.body;
    const productData = {
      id: id,
      id_category: id_category,
      name: name,
      description: description,
      price: price,
      url_image: url_image,
      stock: stock,
    };
    const product = await ProductService.addProduct(productData);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductService.getProductById(productId);
    res.json(product);
  } catch (error) {
    console.log(error);
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getProductCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await ProductService.getProductCategory(categoryId);
    res.json(products);
  } catch (error) {
    console.log(error);
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
