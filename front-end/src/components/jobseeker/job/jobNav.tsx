import { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const JobNav = () => {
  const [showNav, setShowNav] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 299 ? setShowNav(true) : setShowNav(false)
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <AppBar 
      sx={[
        () => showNav 
          ? {position: 'fixed'} 
          : {position: 'static'}, 
        style.appBar
      ]}
    >
      <Toolbar variant="dense" sx={{width: {lg: '1200px'} }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default JobNav

const style = {
  appBar: {
    justifyContent: 'center',
    // alignContent: 'stretch',
    alignItems: {lg: 'center'},
    height: 45,
    bgcolor: '#f7f7f7',
    boxShadow: 0,
    transition: 'opacity ease 1s',
  }
}