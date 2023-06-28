import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { id, name, price, url_image, stock } = product;

  return (
    <Link to={`${id}`}>
      <div
        className="max-w-xs rounded-xl overflow-hidden shadow-lg transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
        id={`${id}`}
      >
        <img
          className="img-producto w-full"
          src={`${url_image}`}
          alt={`${name}`}
        />
        <div className="px-6 py-4 border-t border-gray-200">
          <div className=" mb-2 text-center">{name}</div>
          <div className="flex justify-around mt-4">
            <p className="text-gray-700 text-base font-bold text-center">
              <span className="text-[#00a650] font-light text-sm">
                Precio: $
              </span>{" "}
              {`${price}`}
            </p>
            <p className="font-light">
              <span>Stock: </span>
              {stock}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
