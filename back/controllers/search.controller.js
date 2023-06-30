const { Op } = require("sequelize");
const Products = require("../models/Products");

exports.getProductSearch = async (req, res) => {
  try {
    const { search } = req.query;
    const products = await Products.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
