import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SingleProductContainer from "./components/SingleProductContainer";
import GridViewContainer from "./components/GridViewContainer";
import Login from "./components/Login";
import AuthModal from "./commons/AuthModal";
import { useEffect, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.pathname === "/user/register") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<GridViewContainer />} />
        <Route path="/:id" element={<SingleProductContainer />} />
        <Route path="user/login" element={<Login />} />
        <Route
          path="user/register"
          element={<AuthModal isOpen={isOpen} onClose={handleCloseModal} />}
        />
      </Routes>
    </>
  );
}

export default App;
