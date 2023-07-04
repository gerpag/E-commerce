import React, { useState, useEffect } from "react";
import ShopingCartItem from "../commons/ShopingCartItem";
import { fakeData } from "../utils/fakeData";
import { array } from "yup";

function ShopingCart() {
  const [addedProducts, setAddedProducts] = useState(() =>
    JSON.parse(localStorage.getItem("shopingCart"))
  );

  const removeItem = (itemId) => {
    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const updatedCartItems = array.filter((item) => item.id !== itemId);

    localStorage.setItem("shopingCart", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    setAddedProducts(JSON.parse(localStorage.getItem("shopingCart")));
  }, [addedProducts]);

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
      {addedProducts.length > 0 && (
        <div className="btn-comprar-content">
          <button className="btn-comprar">COMPRAR</button>
        </div>
      )}
    </div>
  );
}

export default ShopingCart;
