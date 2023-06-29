import React from "react";
import axios from "axios";
// import { fakeData } from "../utils/fakeData";
import { useState, useEffect } from "react";
import Card from "./Card";

const GridViewContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/product/all").then((res) => {
      setProducts(res.data);
    });
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
