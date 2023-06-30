import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const productId = useLocation().pathname.split("/")[1];

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [productId]);
  const userData = localStorage.getItem("actkn");
  console.log(userData);
  const handleAddToCart = () => {
    if (!userData) {
      toast.error("Debes iniciar sesión para añadir productos");
      //alert("Debes iniciar sesión para añadir productos");
    }
  };

  return (
    <div className="flex items-center justify-center rounded overflow-hidden shadow-lg mb-5 h-[740px]">
      <div className="border-r border-gray-200">
        <img
          className="img-producto-detallado w-96 h-96"
          src={product.url_image}
          alt="foto"
        />
      </div>

      <div className="flex flex-col p-4">
        <div className="px-6 py-4">
          <h1 className="font-bold text-2xl mb-10 text-center uppercase">
            {product.name}
          </h1>
          <h2 className="text-center text-xl font-light p-5 mb-5">
            {product.description}
          </h2>
          <h3 className="text-gray-700 font-bold text-center text-3xl">
            $ {product.price}{" "}
            <span className="text-[#00a650] font-medium text-xl">10% OFF</span>
          </h3>
        </div>
        <div className="px-6 flex justify-around">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 opacity-40">
            Stock: {product.stock}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 opacity-40">
            Id: {product.id}
          </span>
        </div>
        <div className="flex justify-center">
          <button
            // onClick={handleAddedProducts}
            onClick={handleAddToCart}
            className="p-3 mt-10 bg-blue-400  text-[#f9fafb] font-medium text-xl hover:bg-sky-700 ... active:bg-violet-700"
          >
            Añadir al carrito
          </button>
        </div>

        {/* <div className='mt-7'>
                    <Count item={product} onAdd={onAdd}/>
                </div> */}
      </div>
    </div>
  );
};

export default SingleProduct;
