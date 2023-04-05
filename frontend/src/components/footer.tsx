import React from 'react'
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        bgcolor: '#2b3247', 
        minWidth: '100%', 
        minHeight: '15vh'
      }}>
      <Typography color="secondary">
      © Copyright 2022 Sanjob. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer