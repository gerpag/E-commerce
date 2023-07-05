import React, { useState, useEffect } from "react";
import ShopingCartItem from "../commons/ShopingCartItem";
import { fakeData } from "../utils/fakeData";
import { array } from "yup";
import { finalPrice } from "../utils/auxiliarFunctions";


function ShopingCart() {
  const [addedProducts, setAddedProducts] = useState(() =>
    JSON.parse(localStorage.getItem("shopingCart"))
  );

  const [deletedProduct,setDeletedProduct]=useState();

  const[totalToPay,setTotaltoPay]=useState(()=>{finalPrice(localStorage.getItem("shopingCart"))
})
const totalToPayHandler=(newTotal)=>{
  setTotaltoPay(newTotal)
}

  const removeItem = (itemId) => {
    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const updatedCartItems = array.filter((item) => item.id !== itemId);

    localStorage.setItem("shopingCart", JSON.stringify(updatedCartItems));
    setDeletedProduct(updatedCartItems)
  };

  const quantityValueModify = (quantity, id) => {
    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const updatedProducts = array.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: quantity
        };
      }
      return item;
    });
    localStorage.setItem("shopingCart", JSON.stringify(updatedProducts));
  };


  useEffect(() => {
    setAddedProducts(JSON.parse(localStorage.getItem("shopingCart")));
  }, [deletedProduct]);

 

  return (
    <div className="shopingcart-content">
      {addedProducts.map((addedProduct) => {
        return (
          <ShopingCartItem
            key={addedProduct.id}
            addedProduct={addedProduct}
            removeItem={removeItem}
            quantityValueModify={quantityValueModify}
            totalToPayHandler={totalToPayHandler}
          />
        );
      })}
      {addedProducts.length > 0 && (
        <div className="flex justify-between items-center mt-5 w-1/2">
          <p className="text-2xl">{`Total a pagar $${totalToPay}`}</p>
          <button className="p-3  bg-blue-400  text-[#f9fafb] font-medium text-xl hover:bg-sky-700 ... active:bg-violet-700">COMPRAR</button>
        </div>
      )}
    </div>
  );
}

export default ShopingCart;
