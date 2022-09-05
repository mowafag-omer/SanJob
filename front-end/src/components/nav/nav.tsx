import React, { useEffect } from 'react';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Tooltip,
  Avatar,
  Divider 
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login'
import AdbIcon from '@mui/icons-material/Adb';
import SubNav from './subNav';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store';
import { logout } from '../../store/userSlice';

const pages = [
  {name: 'Home', path: '/homePage'}, 
  {name: 'Jobs', path: '/jobs'}, 
  {name: 'Company', path: '/companies'}
];

const jsettings = [
  {name: 'Profile', path: '/jobseekerInfo'}, 
  {name: 'Account', path: '#'}, 
  {name: 'Logout', path: '#'}
];

const csettings = [
  {name: 'Profile', path: '/companyInfo'}, 
  {name: 'Account', path: '#'}, 
  {name: 'Logout', path: '#'}
];

const jPages = [
  {label: 'Dashboard', path: '/JobseekerDashboard'}, 
  {label: 'My applications', path: '#'}, 
]

const cPages = [
  {label: 'Dashboard', path: '/companyDashboard'}, 
  {label: 'Jobs', path: '#'}, 
  {label: 'Applications', path: '#'}, 
]

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  // const [showNav, setShowNav] = React.useState(false)


  const { isLogged, role } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const settings = role === 'jobseeker' ? jsettings : csettings
  const subNavPages = role === 'jobseeker' ? jPages : cPages

  useEffect(() => {
    !isLogged && navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     window.scrollY > 72 ? setShowNav(true) : setShowNav(false)
  //   }
  //   document.addEventListener('scroll', handleScroll)
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (name: string = '#') => {
    setAnchorElUser(null);
    name === 'Logout' && dispatch(logout())
  };

  return (    
    <AppBar 
      sx={{ bgcolor: '#dadada', color: '#2b3247'}} 
      // position={showNav && isLogged ? 'fixed' : 'static'}
      position='static'
    >
      <Container maxWidth="xl">
        {/* {!showNav && */}
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/homePage"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SanJob
            </Typography>
            
            {role !== 'company' &&
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: '#2b3247' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    " & .MuiList-root": {
                      bgcolor: '#dadada',
                    }
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem component={Link} to={page.path} key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" color="inherit">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            }

            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/homePage"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SanJob
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {role !== 'company' &&
                pages.map((page) => (
                  <Button
                    component={Link} 
                    to={page.path}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#2b3247', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                ))
              }  

            </Box>
            {!isLogged && 
              <Box sx={{ display: 'flex', gap: 2}}>
              <Button
                variant='contained'
                component={Link}
                to='/login'
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
            </Box>  
            }

            { isLogged &&
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => handleCloseUserMenu()}
                >
                  {settings.map((setting) => (
                    <MenuItem component={Link} to={setting.path} key={setting.name} onClick={() => handleCloseUserMenu(setting.name)}>
                      <Typography 
                        onClick={() => setting.name === 'logout' && dispatch(logout())} 
                        textAlign="center"
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            }
          </Toolbar>
        {/* } */}

        {isLogged && <Divider sx={{ borderBottomWidth: 1.5 }} />}
        
        {isLogged && <SubNav links={subNavPages} />}  
      </Container>
    </AppBar>
  )
}

export default Nav