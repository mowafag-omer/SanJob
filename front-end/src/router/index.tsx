import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Register from "../pages/register";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router