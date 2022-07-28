import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Register from "../pages/register";
import Jobs from "../pages/jobs";
import Job from "../pages/job";
import JobseekerInfo from "../pages/jobseekerInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job" element={<Job />} />
          <Route path="/jobseekerInfo" element={<JobseekerInfo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router