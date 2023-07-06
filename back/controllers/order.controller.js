const ShoppingCart = require("../models/ShoppingCart");

async function getOrderHistory(req, res) {
  try {
    const userId = req.user.id;
    const orderHistory = await ShoppingCart.findAll({
      where: { user_id: userId },
      include: "products",
    });

    res.json(orderHistory);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener el historial de órdenes" });
  }
}

module.exports = {
  getOrderHistory,
};
