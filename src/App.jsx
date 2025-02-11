import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
