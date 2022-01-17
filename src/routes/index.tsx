import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);
