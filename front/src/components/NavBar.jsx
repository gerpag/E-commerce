import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Logo from "../commons/Logo";
import UserMenu from "../commons/UserMenu";
import axios from "axios";
import categoryApi from "../api/modules/category.api";

const NavBar = ({ productSearch, setProductSearch }) => {
  const [buscador, setBuscador] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setBuscador(e.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/search?search=${buscador}`)
      .then((res) => {
        setProductSearch(res.data);
      })
      .catch((err) => console.log(err));
  }, [buscador]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/product/category/${category}`)
      .then((res) => {
        setProductSearch(res.data);
      })
      .catch((err) => console.log(err));
  }, [category]);

  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList();

      if (err) toast.error(err.message);
      if (response) {
        setCategories([...response]);
      }
    };

    getCategories();
  });

  return (
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
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Categoría
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category}
              onChange={handleChange}
            >
              <MenuItem value="0">
                <em>Selecciona</em>
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Link to="/search" className="flex justify-center">
          <input
            type="text"
            placeholder="Buscar productos"
            className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black bg-transparent focus:outline-none focus:border-blue-500 border-2 border-transparent placeholder-black placeholder-opacity-50 p-2 mr-10"
            onChange={handleSearch}
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
