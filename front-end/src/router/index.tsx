import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/homePage";
import Loading from "../components/loading";
import Login from "../pages/login";
import Register from "../pages/register";
import Jobs from "../pages/jobseeker/jobs";
import Job from "../pages/jobseeker/job";
import Companies from "../pages/jobseeker/companies";
import JobseekerInfo from "../pages/jobseeker/jobseekerInfo";
import JobseekerDashboard from "../pages/jobseeker/jobseekerDashboard";
import CompanyInfo from "../pages/company/companyInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job" element={<Job />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/JobseekerDashboard" element={<JobseekerDashboard />} />
          <Route path="/jobseekerInfo" element={<JobseekerInfo />} />
          <Route path="/companyInfo" element={<CompanyInfo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router