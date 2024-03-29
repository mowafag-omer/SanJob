import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useNavigate, Navigate } from "react-router-dom";
import { getJobseekerProfile } from "../store/jobSeekerSlice";
import { getCompanyProfile } from "../store/companySlice";
import { Box, LinearProgress } from "@mui/material/";
import { fetchSectors } from "../store/sectorsSlice";

const Loading = () => {
  const { user, jobseeker, company, sectors } = useSelector((state: RootState) => state);
  const { id: userId, isLogged, hasProfile, role } = user;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !sectors.sectors.length && dispatch(fetchSectors());
    !isLogged && navigate("/homePage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (userId) {
        if (role === "jobseeker") {
          if (hasProfile && !jobseeker.id) {
            await dispatch(getJobseekerProfile(userId));
          }
        }

        if (role === "company") {
          if (hasProfile && !company.id) {
            await dispatch(getCompanyProfile(userId));
          }
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Box sx={{ width: "50%", m: "auto", color: "#2b3247" }}>
      {user.role === "jobseeker" ? (
        jobseeker.id ? (
          <Navigate to="/jobs" />
        ) : (
          !user.hasProfile && <Navigate to="/jobseekerInfo" />
        )
      ) : user.role === "company" ? (
        company.id ? (
          <Navigate to="/companyDashboard" />
        ) : (
          !user.hasProfile && <Navigate to="/companyInfo" />
        )
      ) : (
        <LinearProgress color="inherit" />
      )}
    </Box>
  );
};

export default Loading;