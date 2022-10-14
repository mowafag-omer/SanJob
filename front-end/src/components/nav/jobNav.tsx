import { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar, Tabs, Tab } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

type JobNavProps = {
  user?: {role: string | null, id: any}
  value?: number
  setValue?: any
}

const JobNav = ({ user, value, setValue }: JobNavProps) => {
  const [showNav, setShowNav] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 299 ? setShowNav(true) : setShowNav(false)
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (user?.role === 'company') {
      if (current !== "/companyJob/" + user?.id)
        setValue(-1);
    } 
  }, [current]);
  
  return (
    <AppBar 
      sx={[
        () => showNav 
          ? {position: 'fixed'} 
          : {position: 'static'}, 
        style.appBar
      ]}
    >
      <Toolbar variant="dense" sx={{ width: {lg: '1200px'} }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        {user?.role === 'company' &&
          <Tabs
            value={value}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab
              label="Job offer"
              onClick={() => setValue(0)}
            />
            <Tab
              label="Job offer applications"
              onClick={() => setValue(1)}
            />
          </Tabs>
        }
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
    // height: 45,
    bgcolor: '#f7f7f7',
    boxShadow: 0,
    transition: 'opacity ease 1s',
  }
}