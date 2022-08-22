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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login'
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/userSlice';

const pages = [
  {name: 'Home', path: '/'}, 
  {name: 'Jobs', path: '/jobs'}, 
  {name: 'Company', path: '/companies'}
];

const settings = [
  {name: 'Profile', path: '/jobseekerInfo'}, 
  {name: 'Account', path: '#'}, 
  {name: 'Dashboard', path: '#'},
  {name: 'Logout', path: '#'}
];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { isLogged, role } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !isLogged && navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])
  

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
    <AppBar sx={{ bgcolor: '#dadada', color: '#2b3247'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
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
            LOGO
          </Typography>

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
                // "& .MuiPaper-root": {
                //   width: '100%',
                //   left: 'none',
                //   boxShadow: 0
                // },
                " & .MuiList-root": {
                  // width: '100vw',
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link} 
                to={page.path}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#2b3247', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          { !isLogged && 
            <Box sx={{ display: 'flex', gap: 2}}>
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
          </Box>  
          }

          { isLogged && role === 'jobseeker' &&
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
      </Container>
    </AppBar>
  )
}

export default Nav