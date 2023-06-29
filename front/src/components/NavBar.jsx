import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo3d from "../assets/logo3d.png";

const NavBar = () => {
  return (
    // modificar los button con link al momento de hacer rutas
    <nav className="flex items-center justify-between flex-wrap bg-blue-100">
      <div className="flex items-center flex-shrink-0 text-black ml-5 my-5">
        <Link
          to="/"
          className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold mr-20"
        >
          <img src={logo3d} alt="logo3d" className="w-24" />
        </Link>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/category/porta-lapiz"
            className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline"
          >
            Porta lapiz
          </Link>
          <Link
            to="/category/porta-celular"
            className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline"
          >
            Porta celular
          </Link>
        </div>
        <Link to="/search" className="flex justify-center">
          <input
            type="text"
            placeholder="Buscar productos"
            className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black bg-transparent focus:outline-none focus:border-blue-500 border-2 border-transparent placeholder-black placeholder-opacity-50 p-2 mr-10"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          to="/user/login"
          className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline px-4 py-2 border-transparent rounded-md transition-colors hover:border-blue-500 border-2"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/user/register"
          className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline px-4 py-2 border-transparent rounded-md transition-colors hover:border-blue-500 border-2"
        >
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
