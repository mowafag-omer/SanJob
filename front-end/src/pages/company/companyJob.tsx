import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useParams } from "react-router-dom";
import { Grid, Container, Typography, Alert } from "@mui/material";
import JobNav from "../../components/nav/jobNav";
import CompanyJobDetails from "../../components/company/companyJobs/companyJobDetails";
import CompanyJobApplications from "../../components/company/companyJobs/companyJobApplications";
import { CompanyJobProps } from "./companyJobs";

export type CompanyApplicationProps = {
  id: number;
  applying_date: Date;
  status: string;
  jobOffer: {
    id: number;
    job_title: string;
    location: string;
    contract_type: string;
  },
  jobSeeker: {
    img_url: string
    gender: string
    first_name: string
    last_name: string
    email: string
    phone: number
    birthdate: Date
    location: string
    profile_title: string
    sector: string
    CV: any
    linkedin: string
    website: string
    github: string
  }
};

const CompanyJob = () => {
  const [value, setValue] = useState(0);
  const { jobs, user, applications } = useSelector((state: RootState) => state);
  const { id } = useParams();

  const job: CompanyJobProps = jobs?.companyJobs.filter(
    (job: { id: number | string }) => job.id.toString() === id
  )[0];
  const jobApplications: CompanyApplicationProps[] =
    applications.companyApplications.filter(
      (app: CompanyApplicationProps) => app.jobOffer.id === job.id
    );
    
  const receivedApplication = jobApplications.filter(
    (app) => app.status === "Received"
  );

  const consideredApplication = jobApplications.filter(
    (app) => app.status === "In process"
  );

  const rejectedApplication = jobApplications.filter(
    (app) => app.status === "Rejected"
  );
  const acceptedApplication = jobApplications.filter(
    (app) => app.status === "Accepted"
  );

  return (
    <>
      <JobNav
        user={{ role: user.role, id }}
        value={value}
        setValue={setValue}
      />
      <Grid sx={style.gird}>
        <Container sx={style.container}>
          <Typography variant="h4" color="primary">
            {job.job_title}
          </Typography>
          {value === 0 && <CompanyJobDetails job={job} />}

          {value === 1 &&
            (!!jobApplications.length ? (
              [
                { title: "Received applications", applications: receivedApplication},
                { title: "In process applications", applications: consideredApplication},
                { title: "Accepted applications", applications: acceptedApplication},
                { title: "Rejected applications", applications: rejectedApplication}
              ].map(({ title, applications }) => (
                <CompanyJobApplications
                  key={title}
                  applications={applications}
                  title={title}
                />
              ))
            ) : (
              <Alert variant="outlined" severity="info">
                No applications for this offer yet !
              </Alert>
            ))}
            
        </Container>
      </Grid>
    </>
  );
};

export default CompanyJob;

const style = {
  gird: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    p: 5,
    bgcolor: "#f7f7f7",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: { lg: "1200px" },
    gap: 3,
    borderRadius: 2,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    bgcolor: "#fff",
    width: "90%",
    m: 2,
    p: 3,
    borderRadius: 1,
  },
};
