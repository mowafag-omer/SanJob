import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useParams } from "react-router-dom";
import { Grid, Container, Typography, Alert } from "@mui/material";
import CompanyJobApplications from "../../components/company/companyJobs/companyJobApplications";

const CompnyApplicaions = () => {
  const applications = useSelector((state: RootState) => state.applications.companyApplications);

  const receivedApplication = applications.filter(
    (app) => app.status === "Received"
  );

  const consideredApplication = applications.filter(
    (app) => app.status === "In process"
  );

  const rejectedApplication = applications.filter(
    (app) => app.status === "Rejected"
  );
  const acceptedApplication = applications.filter(
    (app) => app.status === "Accepted"
  );

  return (
    <Grid sx={style.gird}>
      <Container sx={style.container}>
        {!!applications.length ? (
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
        )}
      </Container>
    </Grid>
  )
}

export default CompnyApplicaions

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
