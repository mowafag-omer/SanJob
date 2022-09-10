import React from 'react'
import {
  Button,
} from "@mui/material";
import { Link } from 'react-router-dom'

const CompanyDashboard = () => {
  return (
    <>
    <div>CompanyDashboard</div>
    <Button
      variant='contained'
      component={Link}
      to='/postJob'
      size='small'
      color='inherit'
      style={{ background: '#ffc107' }}
    >
      Company
    </Button>
    </>
  )
}

export default CompanyDashboard