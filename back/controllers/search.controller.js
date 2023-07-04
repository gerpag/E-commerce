const SearchServices=require("../services/search.services")


exports.getProductSearch = async (req, res) => {
  try {
    const { search } = req.query;
    const products = await SearchServices.getProductSearch(search);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};