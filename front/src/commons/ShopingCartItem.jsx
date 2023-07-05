import React, { useState, useEffect } from "react";
import { finalPrice } from "../utils/auxiliarFunctions";

function ShopingCartItem({
  addedProduct,
  removeItem,
  quantityValueModify,
  totalToPayHandler,
}) {
  const { id, name, price, url_image, quantity } = addedProduct;

  const [count, setCount] = useState(quantity);

  const handleAddCount = () => {
    quantityValueModify(count + 1, id);
    setCount(count + 1);
  };
  const handleSubstract = () => {
    if (count > 1) quantityValueModify(count - 1, id);
    setCount(count - 1);
  };

  useEffect(() => {
    totalToPayHandler(() => finalPrice(localStorage.getItem("shopingCart")));
  }, [count]);

  return (
    <div className="cartItem-content">
      <div className="cartItem-img-content">
        <img src={url_image} />
      </div>

      <h3>{name}</h3>

      <div className="content-btn-add-substract">
        <button className="btn-add-substract" onClick={handleSubstract}>
          {" "}
          -{" "}
        </button>
        <h3>{count}</h3>
        <button className="btn-add-substract" onClick={handleAddCount}>
          {" "}
          +{" "}
        </button>
      </div>

      <h3>${price * count}</h3>
      <h3 className="carItem-btn-eliminar" onClick={() => removeItem(id)}>
        Eliminar
      </h3>
    </div>
  );
}

export default ShopingCartItem;
