import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/homePage";
import Loading from "../pages/loading";
import Login from "../pages/login";
import Register from "../pages/register";
import Jobs from "../pages/jobseeker/jobs";
import Job from "../pages/jobseeker/job";
import Companies from "../pages/jobseeker/companies";
import JobseekerInfo from "../pages/jobseeker/jobseekerInfo";
import JobseekerDashboard from "../pages/jobseeker/jobseekerDashboard";
import CompanyInfo from "../pages/company/companyInfo";
import CompanyDashboard from "../pages/company/companyDashboard";
import PostJob from "../pages/company/postJob";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job" element={<Job />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/JobseekerDashboard" element={<JobseekerDashboard />} />
          <Route path="/jobseekerInfo" element={<JobseekerInfo />} />
          <Route path="/companyInfo" element={<CompanyInfo />} />
          <Route path="/companyDashboard" element={<CompanyDashboard />} />
          <Route path="/postJob" element={<PostJob />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router