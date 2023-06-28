import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SingleProductContainer from "./components/SingleProductContainer";
import GridViewContainer from "./components/GridViewContainer";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<GridViewContainer />} />
        <Route path="/:id" element={<SingleProductContainer />} />
        <Route path="user/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
