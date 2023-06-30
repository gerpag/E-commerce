import React from "react";
import Card from "./Card";

const GridViewSearch = ({ productSearch }) => {
  return (
    <div className="grid gap-4 grid-cols-5 px-10 py-5 mt-10">
      {productSearch.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default GridViewSearch;
