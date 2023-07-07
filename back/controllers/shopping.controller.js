const ShoppingServices=require("../services/shopping.services")


const shoppingOrder= async (req,res)=>{
    const {userId,products}=req.body

   

    try {
        const message = await ShoppingServices.shoppingOrder(userId, products);
        res.status(200).json(message);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}



module.exports={shoppingOrder}