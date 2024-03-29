import React, { useState, useEffect } from "react"
import { Grid, Container } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import JobseekerApplicationsCard from "../../components/jobseeker/jobseekerApplications/jobseekerApplicationsCard"
import JobseekerApplication from "../../components/jobseeker/jobseekerApplications/jobseekerApplication"
import { getJobSeekerApplications } from "../../store/applicationSlice"

export type ApplicationProps ={
  id: number,
  applying_date: Date,
  status: string,
  jobOffer: {
    job_title: string,
    location: string,
    contract_type: string,
    company: {
      logo_url: string,
      name: string
    }
  }
}

const JobseekerApplications = () => {
  const applications = useSelector((state: RootState) => state.applications.jobseekerApplications)
  const jobseeker = useSelector((state: RootState) => state.jobseeker)
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getJobSeekerApplications(jobseeker.id))
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container direction="column" alignItems="center" sx={styles.gird}>
      <Container sx={styles.container}>
        {applications.map((application: ApplicationProps) => (<>
          <div onClick={handleClickOpen} style={{cursor: 'pointer'}}>
            <JobseekerApplicationsCard  application={application} />
          </div>
          <JobseekerApplication 
            application={application}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </>))}
      </Container>
    </Grid>
  )
}

export default JobseekerApplications

const styles = {
  gird : {
    // height: "100%",
    width: '100%',
    p: '3ch'
  },
  container: {
    maxWidth: {md: '1200px'},
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: {xs: 'wrap', md: 'nowrap'},
    gap: 2,
    alignItems: 'center',
  },
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.")
}

