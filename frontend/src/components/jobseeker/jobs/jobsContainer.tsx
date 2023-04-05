import { Grid, Container } from "@mui/material"
import JobCard, { SingleJobProps } from "./jobCard";

const JobsContainer = ({ jobs }: { jobs: SingleJobProps[] }) => {
  return (
    <Grid container direction="column" alignItems="center" sx={styles.gird}>
      <Container sx={styles.container}>
        {jobs.map((job: SingleJobProps) => (
          <JobCard job={job} />
        ))}
      </Container>
    </Grid>
  )
}

export default JobsContainer

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
    gap: '5ch',
    alignItems: 'center',
  },
}
