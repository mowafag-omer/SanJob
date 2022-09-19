import React from 'react'
import { Toolbar, Tabs, Tab } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  links: {label:string, path: string}[]
}

const SubNav = ({ links }: Props) => {
  const [value, setValue] = React.useState(0)
  const location = useLocation()
  const current = location.pathname

  return (
    <Toolbar variant="dense">
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {links.map(({ label, path }: {label:string, path: string}, index) => 
          <Tab 
            key={path+'key'} 
            label={label} 
            to={path} 
            component={Link} 
            onClick={() => setValue(index)}
          />
        )}
      </Tabs>
    </Toolbar>
  )
}

export default SubNav