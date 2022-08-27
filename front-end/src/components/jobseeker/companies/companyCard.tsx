import { Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';

export type companyProps ={
  name: string
  sector: string
  img: string
  location: string
  employees: string
  jobs: number
}

const CompanyCard = ({ company }: {company: companyProps}) => {
  return (
    <Card component={Link} to='#' sx={style.card}>
      <CardMedia 
        component="img"
        height="140"
        sx={{ width: '70%', pt: 2 }}
        image={company.img}
      />
      {/* <Divider sx={{ width: '90%', mt: 2 }} /> */}
      <CardContent sx={style.cardContent}>
        <Typography gutterBottom variant="h5" component="div">
          {company.name}
        </Typography>
        <Stack sx={{...style.center, gap: 2}}>
          <Typography sx={style.info} variant="body1" color="text.secondary">
            <CategoryIcon  fontSize="small" />
            {company.sector} 
          </Typography>
          <Typography sx={style.info} variant="body1" color="text.secondary">
            <LocationOnIcon fontSize="small" />
            {company.location}
          </Typography>
          <Typography sx={style.info} variant="body1" color="text.secondary">
            <GroupsIcon fontSize="small" />
            {company.employees}
          </Typography>
        </Stack>
        <Divider sx={{width: '100%', mt: 1}} />
        <Stack>
          <Typography>{company.jobs} Jobs</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CompanyCard

const style = {
  card : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    width: 315,
    borderRadius: 2,
    // bgcolor: '#f7f7f7',
    // boxShadow: 1,
    textDecoration: 'none',
    "&:hover": {
      boxShadow: 5
    }
  },
  cardContent: {
    width: '90%',
    mt: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    bgcolor: '#f7f7f7',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  info: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center', 
    gap: 1
  }

}
