import React from "react";
import tildeOK from "../assets/tildeOK.png";
import { Link } from "react-router-dom";

function ConfirmedOrderView() {
  return (
    <div className="flex justify-center flex-col items-center ">
      <div className="flex justify-center flex-col items-center pt-15 pb-20 mt-10 mb-14">
        <img src={tildeOK} alt="tilde-ok" className="w-1/12 mt-7 mb-5" />
        <h1 className="text-4xl mb-5">Gracias por tu compra</h1>
        <h3 className="text-3xl mb-3">Tu pedido ha sido registrado</h3>
        <h2 className="text-2xl ">
          En breve recibirás un email de confirmación
        </h2>
        <Link to="/"><button className="p-3 mt-10 bg-green-400  text-[#f9fafb] font-medium text-xl hover:bg-green-500 m-2">
          Finalizar
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmedOrderView;
