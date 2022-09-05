import React from 'react'
import { Toolbar, Tabs, Tab } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  links: {label:string, path: string}[]
}

const SubNav = ({ links }: Props) => {
  const location = useLocation()
  const current = location.pathname

  return (
    <Toolbar variant="dense">
      <Tabs
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="jobseeker nav"
      >
        {links.map(({ label, path }: {label:string, path: string}) => 
          <Tab 
            key={path} 
            label={label} 
            to={path} 
            component={Link} 
            sx={[style.tab, ()=> (current === path) ? style.active : {}]}
          />
        )}
      </Tabs>
    </Toolbar>
  )
}

export default SubNav

const style = {
  tab: {
    color: '#2b3247',
  },
  active: {
    borderBottom: 3,
    borderColor: '#2b3247'
  }
}