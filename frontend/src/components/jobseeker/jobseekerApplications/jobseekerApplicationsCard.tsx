import React from 'react'
import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material"
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { ApplicationProps } from '../../../pages/jobseeker/jobseekerApplications';
import numberOfDays from '../../../utils/numberOfDays' 

const defaultImg = ""

const JobseekerApplicationsCard = ({ application }: { application: ApplicationProps }) => {
  return (
    <Card sx={style.card}>
      <CardMedia
        component="img"
        image={application.jobOffer.company.logo_url || defaultImg}
        alt="green iguana"
        sx={style.img}
      />
      <CardContent sx={{ bgcolor: '#f7f7f7', flexGrow: {sm: 1} }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h6" component="div">
            {application.jobOffer.company.name}
          </Typography>
          <Chip label={application.status} color="primary" variant="outlined" />
        </Stack>
        <Typography gutterBottom variant="h4" component="div">
          {application.jobOffer.job_title}
        </Typography>
        <Stack sx={{...style.stack, gap: '25px'}}>
          <Typography sx={{...style.center, gap: '4px'}} variant="body1" color="text.secondary">
            <HandshakeIcon fontSize="small" />
            {JSON.parse(application.jobOffer.contract_type)[0]} 
          </Typography>
          <Typography sx={{...style.center, gap: '4px'}} variant="body1" color="text.secondary">
            <LocationOnIcon fontSize="small" />
            {application.jobOffer.location}
          </Typography>
          <Typography sx={{...style.center, gap: '4px'}} variant="body1" color="text.secondary">
            <>
            <WatchLaterIcon fontSize="small" />
            {numberOfDays(new Date(application.applying_date)) + ' days ago'}
            </>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default JobseekerApplicationsCard

const style = {
  card : {
    display: 'flex',
    flexDirection: {xs: 'column', sm: 'row'},
    width: {xs: 300, sm: 600, md: 650, lg: 800, xl: 1000},
    bgcolor: '#fff',
    borderRadius: 2,
    boxShadow: 1,
    textDecoration: 'none'
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: { 
    width: 160, 
    height: 160,
    mx: {xs: 'auto', sm: 'initial'}, 
    my: {xs: 2, sm: 'initial'}
  },
  stack: {
    display: 'flex',
    flexDirection: {xs: 'column', sm: 'row'},
    alignItems: {xs: 'flex-start', sm: 'center'},
  },
}