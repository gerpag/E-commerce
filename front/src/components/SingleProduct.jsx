import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import productApi from "../api/modules/product.api";
import { useSelector, useDispatch } from "react-redux";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const productId = useLocation().pathname.split("/")[1];
  const [add, setAddd] = useState({});
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userData = localStorage.getItem("actkn");
  const { user } = useSelector((state) => state.user);

  const handleAdd = () => {

    const array = JSON.parse(localStorage.getItem("shopingCart"));
    const singleProduct=array.find((product)=>{return product.id=productId})



    if (!userData) {
      toast.error("Debes iniciar sesión para añadir productos");
    } 
    else if (singleProduct) {
      toast.warn(`El producto ${add.name} ya fue añadido al carrito`);
    } else {
      const newAdd = product;
      newAdd.amount = 1;
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

  const handleSubmitReview = () => {
    if (!userData) {
      toast.error("Debes iniciar sesión para dejar una reseña");
    } else {
      const reviewData = {
        id_product: productId,
        comments: comment,
        starts: rating,
      };
      axios
        .post("http://localhost:3000/api/v1/review", reviewData)
        .then((res) => {
          toast.success("Reseña enviada correctamente");
          setReview([...review, res.data]);
          setComment("");
          setRating(0);
        })
        .catch((error) => {
          toast.error("Error al enviar la reseña");
        });
    }
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
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
      });
  }, [productId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/review/${productId}`)
      .then((res) => {
        setReview(res.data);
      })
      .catch((error) => {
        console.error("Error al obtener las reseñas:", error);
      });
  }, [productId]);

  const averageRatings = () => {
    let total = 0;
    review.map((review) => {
      total += review.starts;
    });
    return total / review.length;
  };
  return (
    <div className="flex items-center justify-center rounded overflow-hidden shadow-lg mb-5">
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
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Promedio de valoración: {averageRatings() + "⭐"}
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
        {!userData ? (
          ""
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="font-bold text-xl mb-2">Dejar una reseña</h3>
              <textarea
                className="w-full border rounded py-2 px-3"
                rows="4"
                placeholder="Escribe tu comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="mt-2">
                <label className="block text-gray-700 font-bold">
                  Valoración:
                </label>
                <select
                  className="w-full border rounded py-2 px-3"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="0">Selecciona una valoración</option>
                  <option value="1">1 estrella</option>
                  <option value="2">2 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="5">5 estrellas</option>
                </select>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleSubmitReview}
              >
                Enviar
              </button>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Reseñas</h3>
              {review.length === 0 && (
                <p className="text-gray-700">No hay reseñas</p>
              )}
              {review.map((review) => (
                <div key={review.id} className="border-b border-gray-200 py-4">
                  <p className="text-gray-700 mb-2">{review.comments}</p>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold">
                      {review.starts}
                    </span>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-yellow-500 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.38L22 9.27l-4.45 4.33.93 6.02L12 17.77l-4.48 2.85.93-6.02L2 9.27l6.91-1.89L12 2z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 ml-2">
                      {review.user_name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
