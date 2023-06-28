import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SingleProductContainer from "./components/SingleProductContainer";
import GridViewContainer from "./components/GridViewContainer";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<GridViewContainer />} />
        <Route path="/:id" element={<SingleProductContainer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
