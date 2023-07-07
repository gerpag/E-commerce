import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import productApi from "../api/modules/product.api";
import { useSelector, useDispatch } from "react-redux";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const productId = useLocation().pathname.split("/")[1];
  const [add, setAddd] = useState({});
  const userData = localStorage.getItem("actkn");
  const { user } = useSelector((state) => state.user);
  const handleAdd = () => {
    if (!userData) {
      toast.error("Debes iniciar sesión para añadir productos");
    } else {
      const newAdd = product;
      newAdd.quantity = 1;
      newAdd.partialPrice = function () {
        return this.quantity * this.price;
      };

      setAddd(newAdd);
      toast.success(`Producto ${newAdd.name} añadido al carrito`);
    }
  };

  const handleDelete = () => {
    productApi
      .productDelete(productId)
      .then((res) => {
        toast.success("Producto eliminado");
        navigate("/");
      })
      .catch((err) => {
        toast.error("No se pudo eliminar el producto");
      });
  };

  useEffect(() => {
    if (!window.localStorage.shopingCart) {
      window.localStorage.setItem("shopingCart", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem("shopingCart"));

    if (add.id) {
      array.push(add);

      localStorage.setItem("shopingCart", JSON.stringify(array));
    }
  }, [add]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [productId]);
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
            onClick={handleAdd}
            className="p-3 mt-10 bg-blue-400  text-[#f9fafb] font-medium text-xl hover:bg-sky-700 ... active:bg-violet-700"
          >
            Añadir al carrito
          </button>
        </div>
        {user?.is_admin === true ? (
          <div className="flex justify-center admin">
            <button
              onClick={handleDelete}
              className="p-3 mt-10 bg-red-400  text-[#f9fafb] font-medium text-xl hover:bg-red-700 m-2"
            >
              Eliminar producto
            </button>
            <Link
              to={`/edit/${productId}`}
              className="p-3 mt-10 bg-green-400  text-[#f9fafb] font-medium text-xl hover:bg-green-500 m-2"
            >
              Editar Producto
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
