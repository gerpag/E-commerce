const Shopping_cart = require("../models/Shopping_cart");

async function getOrderHistory(req, res) {
  const userId = req.params.id;

  try {
    const orderHistory = await Shopping_cart.findAll({
      where: { userId: userId },
      include: "products",
    });

    const orderData = orderHistory.map((order) => order.dataValues);

    res.json(orderData);
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
