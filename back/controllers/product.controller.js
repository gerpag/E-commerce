const Products = require("../models/Products");

exports.addProduct = async (req, res) => {
  try {
    const { id, categories, name, description, price, url_image, stock } =
      req.body;
    const product = await Products.create({
      id: id,
      categories: categories,
      name: name,
      description: description,
      price: price,
      url_image: url_image,
      stock: stock,
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductId = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
