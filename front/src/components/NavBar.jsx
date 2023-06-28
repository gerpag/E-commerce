import React from "react";
import logo3d from "../assets/logo3d.png";

const NavBar = () => {
  return (
    // modificar los button con link al momento de hacer rutas
    <nav className="flex items-center justify-between flex-wrap bg-blue-100">
      <div className="flex items-center flex-shrink-0 text-black ml-5 my-5">
        <button
          href="/category/movies"
          className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold mr-20"
        >
          <img src={logo3d} alt="logo3d" className="w-24" />
        </button>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <button
            href="/category/movies"
            className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline"
          >
            Porta lapiz
          </button>
          <button
            href="/category/tv"
            className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline"
          >
            Porta celular
          </button>
        </div>
        <button href="/search" className="flex justify-center">
          <input
            type="text"
            placeholder="Buscar productos"
            className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black bg-transparent focus:outline-none focus:border-blue-500 border-2 border-transparent placeholder-black placeholder-opacity-50 p-2 mr-10"
          />
        </button>
      </div>
      <div className="flex items-center">
        <button
          href="/user/login"
          className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline px-4 py-2 border-transparent rounded-md transition-colors hover:border-blue-500 border-2"
        >
          Iniciar Sesión
        </button>
        <button
          href="/user/register"
          className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black hover:text-blue-500 mr-4 active:underline px-4 py-2 border-transparent rounded-md transition-colors hover:border-blue-500 border-2"
        >
          Registrarse
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
