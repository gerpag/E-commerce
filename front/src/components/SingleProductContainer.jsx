import React from "react";
import { useState, useEffect } from "react";
import SingleProduct from "./SingleProduct";
import { useParams } from "react-router-dom";
import { fakeData } from "../utils/fakeData";

const SingleProductContainer = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProductById = () => {
      const foundProduct = fakeData.find((item) => item.id === parseInt(id));
      setProduct(foundProduct);
    };

    getProductById();
  }, [id]);

  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
};

export default SingleProductContainer;
