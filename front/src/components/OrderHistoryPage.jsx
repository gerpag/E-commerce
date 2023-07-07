import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    fetchOrderHistory();
  }, []);
  console.log(orderHistory);
  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/order/order-history/${user.id}`
      );
      setOrderHistory(response.data);
      console.log("RESPONSE.DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Historial de Órdenes de compra</h1>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map((order) => (
            <li key={order.id}>
              <h2>Orden #{order.id}</h2>
              <p>Fecha: {order.createdAt}</p>
              <p>Productos:</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    <span>{product.name}</span> - Cantidad: {product.amount}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay órdenes registradas.</p>
      )}
    </div>
  );
};

export default OrderHistoryPage;
