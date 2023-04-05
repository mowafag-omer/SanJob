import { useEffect } from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  CardMedia,
  Stack,
  Button,
  Divider,
} from "@mui/material"
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import JobNav from "../../components/nav/jobNav";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { getJobById } from "../../store/jobsSlice";
import { apply } from '../../store/applicationSlice';

const Job = () => {
  const dispatch: AppDispatch = useDispatch()
  const { id } = useParams() 
  const { jobs, jobseeker, applications } = useSelector((state: RootState) => state)
  const { jobById: job } = jobs
  const applied = !!applications.jobseekerApplications.filter((app: any) => app.jobOffer?.id === job.id).length

  useEffect(() => {
    dispatch(getJobById(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleApply = () => {
    if (jobseeker.id) {
      dispatch(apply({jobOffer: job.id, jobSeeker: jobseeker.id}))
    } else {
      alert('Sign up to be able to apply for this offer')
    }
  }

  return (<>
    {job &&
      <Grid sx={style.grid}>
        <Box sx={style.banner}>
          <Box sx={style.bannerContent}>
            <CardMedia 
              component="img"
              image="https://cdn.dribbble.com/users/371199/screenshots/11891575/media/6df51f6e524e3918c4ccec381d4f4523.jpg?compress=1&resize=400x300"
              alt="green iguana"
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="h6" >{job.company.name}</Typography>
            <Typography variant="h3" >{job.job_title}</Typography>
            <Stack sx={style.stack}>
              <Typography sx={style.typography} variant="body1" color="text.secondary">
                <HandshakeIcon fontSize="small" />
                {JSON.parse(job.contract_type).join(", ")}
              </Typography>
              <Typography sx={style.typography} variant="body1" color="text.secondary">
                <LocationOnIcon fontSize="small" />
                {job.location}
              </Typography>
              <Typography sx={style.typography} variant="body1" color="text.secondary">
                <TodayIcon fontSize="small" />
                {new Date(job.start_date).toLocaleString().split(', 12:00:00 AM')}
              </Typography>
            </Stack>
          </Box>
          <JobNav />
        </Box >
        <Container sx={style.main}>
          <Box>
            <Typography variant="h5">
              Company
            </Typography>
            <hr />
            <Typography variant="body1">
              {job.company.presentation} 
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              Job description
            </Typography>
            <hr />
            <Typography variant="body1">
              {job.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              Job requirements
            </Typography>
            <hr />
            <Typography variant="body1">
              {job.requirement}
            </Typography>
  
          </Box>
        </Container>
        <Button 
          size="large" 
          variant="contained" 
          sx={style.button}
          disabled={applied}
          onClick={handleApply}
        >
          {applied ? "Already applied" : "Apply"}
        </Button>
      </Grid>
    }
  </>)
}

export default Job

const style = {
  grid : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '7ch',
    pb: 4
  },
  banner: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    bgcolor: '#f7f7f7'
  },
  bannerContent :{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2ch',
    padding: '3ch',
    maxWidth: '1200px',
  },
  stack: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: {xs: 'column', sm: 'row'},
    gap: 3
  },
  typography: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px'
  },
  main: {
    width: {md: '900px'},
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5ch'
  },
  card : {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    boxShadow: 1
  },
  button: {
    width: 200,
    background: "#2b3247",
    '&:hover': {
      background: "#2b3247",
      opacity: "85%"
    }
  }
}
