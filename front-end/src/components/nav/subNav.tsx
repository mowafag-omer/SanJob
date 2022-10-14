import React, { useEffect } from "react";
import { Toolbar, Tabs, Tab, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type Props = {
  links: { label: string; path: string }[];
};

const SubNav = ({ links }: Props) => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const current = location.pathname;

  useEffect(() => {
    if (
      current !== "/jobseekerApplications" &&
      current !== "/jobseekerDashboard" &&
      current !== "/companyDashboard" &&
      current !== "/companyJobs"
    )
      setValue(-1);
  }, [current]);

  return (
    <Toolbar variant="dense" sx={{justifyContent: 'space-between'}}>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {links.map(
          ({ label, path }: { label: string; path: string }, index) => (
            <Tab
              key={path + "key"}
              label={label}
              to={path}
              component={Link}
              onClick={() => setValue(index)}
            />
          )
        )}
      </Tabs>
      {
        <Button
          variant='contained'
          component={Link}
          to='/postJob'
          size='small'
          color='inherit'
          style={{ background: '#ffc107' }}
        >
          Post new Offer
        </Button>
      }
    </Toolbar>
  );
};

export default SubNav;
