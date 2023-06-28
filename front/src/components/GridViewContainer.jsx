import React from "react";
import { fakeData } from "../utils/fakeData";
import { useState, useEffect } from "react";
import Card from "./Card";

const GridViewContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(fakeData);
  }, []);

  return (
    <div className="grid gap-4 grid-cols-5 px-10 py-5 mt-10">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default GridViewContainer;
