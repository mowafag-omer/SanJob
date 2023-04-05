import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  Chip,
  Typography,
} from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import countJobApplicaions from "../../utils/countJobApplicaions";
import toDate from "../../utils/toDate";
import jobsSlice from "../../store/jobsSlice";

export type CompanyJobProps = {
  id: number;
  job_title: string;
  location: string;
  contract_type: string;
  sector: string;
  description: string;
  requirement: string;
  start_date: Date;
  posted_at?: string;
  hiring_process: string;
  status: string;
  company: number;
};

const CompanyJobs = () => {
  const { companyJobs } = useSelector((state: RootState) => state.jobs);
  const { companyApplications } = useSelector((state: RootState) => state.applications) 

  const activeJobs: CompanyJobProps[] = companyJobs.filter((job: CompanyJobProps) => job.status === 'open')
  const closedJobs: CompanyJobProps[] = companyJobs.filter((job: CompanyJobProps) => job.status === 'close')

  return (
    <Grid sx={style.gird}>
      <Container sx={style.container}>
        {[
          { title: "Active job offers", jobs: activeJobs },
          { title: "Closed job offers", jobs: closedJobs },
        ].map((data) => (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  px: 1,
                  borderLeft: 2,
                  borderColor: "#ffc107",
                  alignSelf: "flex-start",
                }}
              >
                {data.title}
              </Typography>
              <Chip label={data.jobs.length} color="secondary" />
            </Box>
            {!!data.jobs.length ?
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Offer name</TableCell>
                      <TableCell align="left">Location</TableCell>
                      <TableCell align="left">Contract type</TableCell>
                      <TableCell align="left">Applications</TableCell>
                      <TableCell align="left">Posted at</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.jobs.map((job) => (
                      <TableRow
                        component={Link}
                        to={"/companyJob/" + job.id}
                        sx={style.row}
                        key={job.id}
                      >
                        <TableCell component="th" scope="row">
                          {job.job_title}
                        </TableCell>
                        <TableCell align="left">{job.location}</TableCell>
                        <TableCell align="left">
                          {JSON.parse(job.contract_type)[0]}
                        </TableCell>
                        <TableCell align="left">
                          {countJobApplicaions(job.id, companyApplications)}
                        </TableCell>
                        <TableCell align="left">{toDate(job.posted_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              : <Alert variant="outlined" severity="info">
                  {'There is no ' + data.title + ' yet !'} 
                </Alert>
            }
          </Box>
        ))}
      </Container>
    </Grid>
  );
};

export default CompanyJobs;

const style = {
  gird: {
    p: 5,
    bgcolor: "#f7f7f7",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    p: 2,
    borderRadius: 2,
  },
  row: {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      boxShadow: 3,
      bgcolor: "#f7f7f7",
      borderTop: 2,
      borderBottom: 2,
      borderColor: "#ffc107",
    },
  },
};
