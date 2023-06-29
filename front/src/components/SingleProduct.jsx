import React from "react";
import { useState } from "react";

const SingleProduct = ({ product }) => {

  const [addedProducts,setAddedProducts]=useState([])

  const handleAddedProducts=()=>{
    const newProduct={
      id:product.id,
      name:product.name,
      description:product.description,
      price:product.price,
      url_image:product.url_image,
      stock:product.stock
    }

    setAddedProducts([...addedProducts,newProduct])

  }

  console.log(addedProducts)



  return (
    <div className="flex items-center justify-center rounded overflow-hidden shadow-lg mb-5">
      <div className="border-r border-gray-200">
        <img
          className="img-producto-detallado w-full"
          src={product.url_image}
          alt="foto"
        />
      </div>

      <div className="flex flex-col p-4">
        <div className="px-6 py-4">
          <h1 className="font-bold text-2xl mb-10 text-center">
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
          <button onClick={handleAddedProducts} className="p-3 mt-10 bg-blue-400  text-[#f9fafb] font-medium text-xl bg-sky-500 hover:bg-sky-700 ... active:bg-violet-700">Añadir al carrito</button></div>
        
        {/* <div className='mt-7'>
                    <Count item={product} onAdd={onAdd}/>
                </div> */}
      </div>
    </div>
  );
};

export default SingleProduct;
