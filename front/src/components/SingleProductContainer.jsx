import React from "react";
import { useState, useEffect } from "react";
import SingleProduct from "./SingleProduct";

const SingleProductContainer = () => {
  const [product, setProduct] = useState({});

  // logica para obtener el producto del back
  useEffect(() => {
    // Lógica para obtener el producto del backend
    const product1 = {
      id: 100,
      name: "Messi con la copa",
      description:
        "Mini Messi con la copa del mundo en la mano, final de la copa del mundo quatar 2022",
      price: 2800,
      url_image:
        "https://res.cloudinary.com/dbj54ld99/image/upload/v1687914653/Captura_desde_2023-06-27_22-10-33_tudnrz.png",
      stock: 8,
    };
    setProduct(product1);
  }, []);

  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
};

export default SingleProductContainer;
