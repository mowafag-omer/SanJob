import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./PrivateRoute";
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
import JobseekerApplications from "../pages/jobseeker/jobseekerApplications";
import CompanyInfo from "../pages/company/companyInfo";
import CompanyDashboard from "../pages/company/companyDashboard";
import PostJob from "../pages/company/postJob";
import CompanyJobs from "../pages/company/companyJobs";
import CompanyJob from "../pages/company/companyJob";
import CompnyApplicaions from "../pages/company/compnyApplicaions";

const Router = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/companies" element={<Companies />} />
          <Route
            path="/jobseekerDashboard"
            element={
              <ProtectedRoute role="jobseeker">
                <JobseekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobseekerApplications"
            element={
              <ProtectedRoute role="jobseeker">
                <JobseekerApplications />
              </ProtectedRoute>
            }
          />
          <Route path="/jobseekerInfo" element={<JobseekerInfo />} />
          <Route path="/companyInfo" element={<CompanyInfo />} />
          <Route
            path="/companyDashboard"
            element={
              <ProtectedRoute role="company">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companyJobs"
            element={
              <ProtectedRoute role="company">
                <CompanyJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companyJob/:id"
            element={
              <ProtectedRoute role="company">
                <CompanyJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companyApplications"
            element={
              <ProtectedRoute role="company">
                <CompnyApplicaions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postJob"
            element={
              <ProtectedRoute role="company">
                <PostJob />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
  );
};

export default Router;
