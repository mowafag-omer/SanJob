import { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const JobNav = () => {
  const [showNav, setShowNav] = useState(false)

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
      // position='static'
      sx={[
        () => showNav 
          ? {position: 'fixed'} 
          : {position: 'static'}, 
        style.appBar
      ]}
    >
      <Toolbar variant="dense" sx={{maxWidth: '1024px'}}>
        <IconButton>
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
    alignContent: 'stretch',
    height: 45,
    bgcolor: '#f7f7f7',
    boxShadow: 0,
    transition: 'opacity ease 1s',
  }
}