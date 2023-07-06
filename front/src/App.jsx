import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SingleProductContainer from "./components/SingleProductContainer";
import GridViewContainer from "./components/GridViewContainer";
import Footer from "./components/Footer";
import ShopingCart from "./components/ShopingCart";
import GridViewSearch from "./components/GridViewSearch";
import AuthModal from "./commons/AuthModal";
import userApi from "./api/modules/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/userSlice";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Administrator from "./components/Administrator";

function App() {
  const [productSearch, setProductSearch] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      <AuthModal />
      <NavBar
        productSearch={productSearch}
        setProductSearch={setProductSearch}
      />
      <Routes>
        <Route path="/" element={<GridViewContainer />} />
        <Route path="/:id" element={<SingleProductContainer />} />
        <Route path="user/cart" element={<ShopingCart />} />
        <Route path="user/admin" element={<Administrator />} />
        <Route
          path="/search"
          element={<GridViewSearch productSearch={productSearch} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
