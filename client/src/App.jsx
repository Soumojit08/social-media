import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/feed/Home";
import SyncUser from "./pages/auth/SyncUser";

const App = () => {
  return (
    <div>
      <SyncUser />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
