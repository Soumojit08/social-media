import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/feed/Home";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
