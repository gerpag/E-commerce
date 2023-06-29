import React, { useState,useEffect } from "react";
import ShopingCartItem from "../commons/ShopingcartItem";
import { fakeData } from "../utils/fakeData";

function ShopingCart(){

    const [addedProducts,setAddedProducts]=useState([])

    useEffect(() => {
        setAddedProducts(fakeData.splice(0,3));
      }, []);

      const removeItem = (itemId) => {
        const updatedCartItems = addedProducts.filter((item) => item.id !== itemId);
        setAddedProducts(updatedCartItems);
      };

    return(
        <div className="shopingcart-content">
        {addedProducts.map((addedProduct)=>{
            return(
                    <ShopingCartItem key={addedProduct.id} addedProduct={addedProduct} removeItem={removeItem} />     
            )

        })}
        <div className="btn-comprar-content">
        <button className="btn-comprar">COMPRAR</button>
        </div>
        </div>
    )
}

export default ShopingCart;
