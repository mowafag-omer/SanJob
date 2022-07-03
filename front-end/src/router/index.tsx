import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Register from "../pages/register";

const Router = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
     </Routes>
    </BrowserRouter>
  )
}

export default Router