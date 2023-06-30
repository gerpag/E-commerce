import React, { useState, useEffect } from "react";
import ShopingCartItem from "../commons/ShopingcartItem";
import { fakeData } from "../utils/fakeData";

function ShopingCart() {
  //const [addedProducts, setAddedProducts] = useState([]);

  const addedProducts = JSON.parse(localStorage.getItem("shopingCart"));

  
  const removeItem = (itemId) => {

    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const updatedCartItems = array.filter((item) => item.id !== itemId);
    
    localStorage.setItem("shopingCart", JSON.stringify(updatedCartItems));
  };

  return (
    <div className="shopingcart-content">
      {addedProducts.map((addedProduct) => {
        return (
          <ShopingCartItem
            key={addedProduct.id}
            addedProduct={addedProduct}
            removeItem={removeItem}
          />
        );
      })}
      <div className="btn-comprar-content">
        <button className="btn-comprar">COMPRAR</button>
      </div>
    </div>
  );
}

export default ShopingCart;
