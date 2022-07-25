import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <AppBar position='static' sx={{ background: '#dadada', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#2b3247',
          width: '1120px',
        }}
      >
        <Typography
          variant='h5'
          color='inherit'
          component={Link}
          to='/'
          sx={{ textDecoration: 'none', fontWeight: 600 }}
        >
          SanJob
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit'>
            Home
          </Button>
          <Button color='inherit'>Jobs</Button>
          <Button color='inherit'>Companies</Button>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            size='small'
            color='inherit'
            style={{ background: '#ffc107' }}
          >
            Company
          </Button>
          <Button
            startIcon={<LoginIcon />}
            component={Link}
            to='/login'
            variant='outlined'
            size='small'
            color='inherit'
          >
            Login
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
