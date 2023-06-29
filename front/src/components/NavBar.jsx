import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { Button } from "@mui/material";
import Logo from "../commons/Logo";
import UserMenu from "../commons/UserMenu";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    // modificar los button con link al momento de hacer rutas
    <nav className="flex items-center justify-between flex-wrap bg-blue-100">
      <div className="flex items-center flex-shrink-0 text-black ml-5 my-5">
        <Link
          to="/"
          className="block text-xl mt-4 lg:inline-block lg:mt-0 font-bold mr-20"
        >
          <Logo />
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
        {!user && (
          <Button
            variant="contained"
            sx={{ marginRight: "20px" }}
            onClick={() => dispatch(setAuthModalOpen(true))}
          >
            Iniciar sesión
          </Button>
        )}
        {user && <UserMenu className="mr-4" />}
      </div>
    </nav>
  );
};

export default NavBar;
