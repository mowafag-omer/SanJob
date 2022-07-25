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
import JobNav from "../components/job/jobNav";

const Job = () => {
  return (
    <Grid sx={style.grid}>
      <Box sx={style.banner}>
        <Box sx={style.bannerContent}>
          <CardMedia 
            component="img"
            image="https://cdn.dribbble.com/users/371199/screenshots/11891575/media/6df51f6e524e3918c4ccec381d4f4523.jpg?compress=1&resize=400x300"
            alt="green iguana"
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6" >Company</Typography>
          <Typography variant="h3" >Dev front-end</Typography>
          <Stack sx={style.stack}>
            <Typography sx={style.typography} variant="body1" color="text.secondary">
              <HandshakeIcon fontSize="small" />
              Permanent contract 
            </Typography>
            <Typography sx={style.typography} variant="body1" color="text.secondary">
              <LocationOnIcon fontSize="small" />
              Paris
            </Typography>
            <Typography sx={style.typography} variant="body1" color="text.secondary">
              <TodayIcon fontSize="small" />
              2 days ago
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
          Lorem ipsum dolor sit amet. In sint voluptates est quisquam dolore eum enim aperiam vel eaque temporibus eum quasi impedit? Sit accusamus nemo et doloribus sapiente est dolorem praesentium sit quia ipsum et aliquam fugit qui aliquid libero aut ipsam voluptas. Aut nemo inventore vel voluptatem ipsa et sequi cumque.
          <br />
          Sed velit nobis et praesentium itaque nam omnis odio et magni aliquid. Ut fuga velit et placeat optio qui sunt exercitationem et numquam pariatur excepturi eos ducimus aperiam et fuga veritatis? Enim dolores a quibusdam inventore non natus Quis et asperiores maxime!
          </Typography>

        </Box>
        <Box>
          <Typography variant="h5">
            Job description
          </Typography>
          <hr />
          <Typography variant="body1">
          Lorem ipsum dolor sit amet. In sint voluptates est quisquam dolore eum enim aperiam vel eaque temporibus eum quasi impedit? Sit accusamus nemo et doloribus sapiente est dolorem praesentium sit quia ipsum et aliquam fugit qui aliquid libero aut ipsam voluptas. Aut nemo inventore vel voluptatem ipsa et sequi cumque.
          Lorem ipsum dolor sit amet. In sint voluptates est quisquam dolore eum enim aperiam vel eaque temporibus eum quasi impedit? Sit accusamus nemo et doloribus sapiente est dolorem praesentium sit quia ipsum et aliquam fugit qui aliquid libero aut ipsam voluptas. Aut nemo inventore vel voluptatem ipsa et sequi cumque.
          Lorem ipsum dolor sit amet. In sint voluptates est quisquam dolore eum enim aperiam vel eaque temporibus eum quasi impedit? Sit accusamus nemo et doloribus sapiente est dolorem praesentium sit quia ipsum et aliquam fugit qui aliquid libero aut ipsam voluptas. Aut nemo inventore vel voluptatem ipsa et sequi cumque.
          Lorem ipsum dolor sit amet. In sint voluptates est quisquam dolore eum enim aperiam vel eaque temporibus eum quasi impedit? Sit accusamus nemo et doloribus sapiente est dolorem praesentium sit quia ipsum et aliquam fugit qui aliquid libero aut ipsam voluptas. Aut nemo inventore vel voluptatem ipsa et sequi cumque.
          <br />
          Sed velit nobis et praesentium itaque nam omnis odio et magni aliquid. Ut fuga velit et placeat optio qui sunt exercitationem et numquam pariatur excepturi eos ducimus aperiam et fuga veritatis? Enim dolores a quibusdam inventore non natus Quis et asperiores maxime!
          </Typography>

        </Box>
        <Box>
          <Typography variant="h5">
            Job requirements
          </Typography>
          <hr />
          <Typography variant="body1">
          Lorem ipsum dolor sit amet. In sint voluptates est quisquam dolore eum enim aperiam vel eaque temporibus eum quasi impedit? Sit accusamus nemo et doloribus sapiente est dolorem praesentium sit quia ipsum et aliquam fugit qui aliquid libero aut ipsam voluptas. Aut nemo inventore vel voluptatem ipsa et sequi cumque.
          <br />
          Sed velit nobis et praesentium itaque nam omnis odio et magni aliquid. Ut fuga velit et placeat optio qui sunt exercitationem et numquam pariatur excepturi eos ducimus aperiam et fuga veritatis? Enim dolores a quibusdam inventore non natus Quis et asperiores maxime!
          </Typography>

        </Box>
      </Container>
      <Button size="large" variant="contained" sx={style.button}>
        Apply
      </Button>
    </Grid>
  )
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
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
