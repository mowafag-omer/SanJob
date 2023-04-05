import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  Stack,
} from "@mui/material"
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import { Link } from "react-router-dom";

export type SingleJobProps ={
  id: number
  job_title: string
  location: string
  contract_type: string
  sector: string
  description: string
  requirement: string
  start_date: Date
  hiring_process: string
  status: string
  company: {
    id: null,
    logo_url: null,
    name: "",
    location: "",
    sector: [],
    presentation: "",
    founding_year: null,
    employees: null,
    website: "",  
  }
}

const defaultImg = "https://images.squarespace-cdn.com/content/v1/568981602399a3a3e507fff4/1548253334574-W4OFLUFUXJKJBXNW2UDK/Asset+2%40300x.png"

const JobCard = ({ job }: { job: SingleJobProps }) => {
  return (
    <Card component={Link} to={'/job/'+job.id} sx={style.card}>
      <CardMedia
        component="img"
        image={job.company.logo_url || defaultImg}
        alt="green iguana"
        sx={style.img}
      />
      <CardContent sx={{ bgcolor: '#f7f7f7', flexGrow: {sm: 1} }}>
        <Typography gutterBottom variant="h6" component="div">
          {job.company.name}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          {job.job_title}
        </Typography>
        <Stack sx={{...style.stack, gap: '25px'}}>
          <Typography sx={{...style.center, gap: '4px'}} variant="body1" color="text.secondary">
            <HandshakeIcon fontSize="small" />
            {JSON.parse(job.contract_type)[0]} 
          </Typography>
          <Typography sx={{...style.center, gap: '4px'}} variant="body1" color="text.secondary">
            <LocationOnIcon fontSize="small" />
            {job.location}
          </Typography>
          <Typography sx={{...style.center, gap: '4px'}} variant="body1" color="text.secondary">
            <>
            <TodayIcon fontSize="small" />
            {new Date(job.start_date).toLocaleString().split(', 12:00:00 AM')}
            </>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default JobCard

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
  }
}
