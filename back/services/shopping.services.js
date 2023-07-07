const Shopping_cart = require("../models/Shopping_cart");
const Product_cart = require("../models/Product_cart");

class ShoppingServices {
  static async shoppingOrder(userId, products) {
    try {
      const shoppingCart = await Shopping_cart.create({ userId });

      console.log("yyyyyyyyyyyy", shoppingCart.id);

      const productPromises = await products.map((product) => {
        const { id, amount } = product;
        return Product_cart.create({
          shoppingCartId: shoppingCart.id,
          productId: id,
          amount: amount,
        });
      });
      await Promise.all(productPromises);
      return "Pedido de compra creado exitosamente";
    } catch (error) {
      console.log(error);
      throw new Error("Error interno del servidor");
    }
  }
}

module.exports = ShoppingServices;
