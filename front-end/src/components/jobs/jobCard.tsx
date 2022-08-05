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

export type jobProps ={
  title: string
  company: string
  contract: string
  img: string
  location: string
  date: string
}

const JobCard = ({ job }: { job: jobProps }) => {
  return (
    <Card component={Link} to='/job' sx={styles.card}>
      <CardMedia
        component="img"
        image={job.img}
        alt="green iguana"
        sx={{ width: 160, height: 160 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {job.company}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          {job.title}
        </Typography>
        <Stack sx={{...styles.center, gap: '25px'}}>
          <Typography sx={{...styles.center, gap: '4px'}} variant="body1" color="text.secondary">
            <HandshakeIcon fontSize="small" />
            {job.contract} 
          </Typography>
          <Typography sx={{...styles.center, gap: '4px'}} variant="body1" color="text.secondary">
            <LocationOnIcon fontSize="small" />
            {job.location}
          </Typography>
          <Typography sx={{...styles.center, gap: '4px'}} variant="body1" color="text.secondary">
            <TodayIcon fontSize="small" />
            {job.date}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default JobCard

const styles = {
  card : {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    bgcolor: '#f7f7f7',
    borderRadius: 2,
    boxShadow: 1,
    textDecoration: 'none'
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
}
