import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SingleProductContainer from "./components/SingleProductContainer";
import GridViewContainer from "./components/GridViewContainer";
import AuthModal from "./commons/AuthModal";
import { setUser } from "./redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const response = null;
      const err = null;

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  return (
    <>
      <AuthModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<GridViewContainer />} />
        <Route path="/:id" element={<SingleProductContainer />} />
      </Routes>
    </>
  );
}

export default App;
