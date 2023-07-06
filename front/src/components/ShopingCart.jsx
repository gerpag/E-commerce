import React, { useState, useEffect } from "react";
import ShopingCartItem from "../commons/ShopingCartItem";
import { finalPrice } from "../utils/auxiliarFunctions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function ShopingCart() {
  const navigate = useNavigate();

  const [addedProducts, setAddedProducts] = useState(() =>
    JSON.parse(localStorage.getItem("shopingCart"))
  );

  const [deletedProduct, setDeletedProduct] = useState();

  const [totalToPay, setTotaltoPay] = useState(() => {
    finalPrice(localStorage.getItem("shopingCart"));
  });

  const {user} = useSelector((state) => {return state.user;
  });

  const totalToPayHandler = (newTotal) => {
    setTotaltoPay(newTotal);
  };

  const removeItem = (itemId) => {
    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const updatedCartItems = array.filter((item) => item.id !== itemId);

    localStorage.setItem("shopingCart", JSON.stringify(updatedCartItems));
    setAddedProducts(JSON.parse(localStorage.getItem("shopingCart")));
  };

  const quantityValueModify = (amount, id) => {
    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const updatedProducts = array.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          amount: amount,
        };
      }
      return item;
    });
    localStorage.setItem("shopingCart", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    setAddedProducts(JSON.parse(localStorage.getItem("shopingCart")));
  }, [deletedProduct]);

  const shoppingConfirm = () => {
   

    const userId =user.id;
    const products = JSON.parse(localStorage.getItem("shopingCart"));
    axios
      .post("http://localhost:3000/api/v1/shopping", { userId, products })
      .then((res) => {
        console.log(res.data);
        toast.success("Compra realizada con exito")
        localStorage.removeItem("shopingCart")
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="shopingcart-content">
      {addedProducts &&
        addedProducts.map((addedProduct) => {
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
      {addedProducts && addedProducts.length > 0 && (
        <div className="flex justify-between items-center mt-5 w-1/2">
          <p className="text-2xl">{`TOTAL A PAGAR $${totalToPay}`}</p>
          <button
            onClick={shoppingConfirm}
            className="p-3  bg-blue-400  text-[#f9fafb] font-medium text-xl hover:bg-sky-700 ... active:bg-violet-700"
          >
            COMPRAR
          </button>
        </div>
      )}
    </div>
  );
}

export default ShopingCart;
