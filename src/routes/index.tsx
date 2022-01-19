import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import Register from "../pages/Register";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);
