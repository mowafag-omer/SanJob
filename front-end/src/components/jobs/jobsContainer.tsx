import {
  Grid,
  Container,
  Box,
  Typography,
  TextField,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Stack,
} from "@mui/material"
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';

const data = [
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7F8l4iI0tf7AZRf0FGEnbHy14DmZD67JRENUHfsOAHMDv4KW0RdwfUVpEg67SY5JpF-M&usqp=CAU",
    location: "Paris",
    date: "2 days ago"
  },
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://i.pinimg.com/736x/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg",
    location: "Paris",
    date: "2 days ago"
  },
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://cdn.dribbble.com/users/371199/screenshots/11891575/media/6df51f6e524e3918c4ccec381d4f4523.jpg?compress=1&resize=400x300",
    location: "Paris",
    date: "2 days ago"
  },
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324",
    location: "Paris",
    date: "2 days ago"
  },
]

const JobsContainer = () => {
  return (
    <Grid container direction="column" alignItems="center" sx={styles.container}>
      <Box sx={styles.box}>
        {data.map((job: any) => (
          <Card sx={styles.card}>
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
        ))}
      </Box>
    </Grid>
  )
}

export default JobsContainer

const styles = {
  container : {
    height: "100%",
    width: '100%',
    p: '3ch'
  },
  box: {
    width: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5ch',
    alignItems: 'center',
  },
  card : {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    bgcolor: '#f7f7f7',
    boxShadow: 1
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
}
