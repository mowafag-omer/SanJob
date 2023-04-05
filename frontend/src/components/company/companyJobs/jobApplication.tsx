import { useState } from 'react';
import React from 'react'
import { Dialog, Stack, DialogContent, DialogTitle, Avatar, Typography, Box, Button } from '@mui/material';
import { CompanyApplicationProps } from '../../../pages/company/companyJob';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import toDate from '../../../utils/toDate';

type JobApplicationProps = {
  application: CompanyApplicationProps | null, 
  handleClose: any
  downloadCV: any
}

const JobApplication = ({application, handleClose, downloadCV}: JobApplicationProps) => {

  return (
    <Dialog
      open={true}
      fullWidth
    >
      <DialogTitle sx={style.title}>
        <Stack direction='row' alignItems='center' gap={2} >
          <Avatar
            alt="jobseeker img"
            src={application?.jobSeeker.img_url}
            sx={style.avatar}
            onClick={handleClose}
          />
          <Stack>
            <Typography variant='h5' color='primary'>
            {application?.jobSeeker.first_name}
            </Typography>
            <Typography variant='h5' color='primary'>
            {application?.jobSeeker.profile_title}
            </Typography>
          </Stack>
        </Stack>
        <HighlightOffIcon onClick={handleClose} sx={style.close} color="primary" />
      </DialogTitle>
      <DialogContent sx={{bgcolor: "#f7f7f7"}}>
        <Box >
          <Box sx={style.box}>
            {[
              { title: "Frist name", value: application?.jobSeeker.first_name || 'Not specified' },
              { title: "Last name", value: application?.jobSeeker.last_name || 'Not specified' },
              { title: "Gender", value: application?.jobSeeker.gender || 'Not specified' },
              { title: "Birthdate", value: !!application?.jobSeeker.birthdate ? toDate(application?.jobSeeker.birthdate) : 'Not specified' },
              { title: "Location", value: application?.jobSeeker.location || 'Not specified' },
              { title: "Email", value: application?.jobSeeker.email || 'Not specified' },
              { title: "Phone", value: application?.jobSeeker.phone || 'Not specified' },
            ].map((element) => (
              <Stack key={element.title} direction="row">
                <Typography color="primary" sx={{ width: 200 }}>
                  {element.title}
                </Typography>
                <Typography color="primary" sx={{ fontWeight: 600 }}>
                  {element.value}
                </Typography>
              </Stack>
            ))}
          </Box>

          <Box sx={style.box}>
            {[
              { title: "Field of expertise", value: application?.jobSeeker.sector || 'Not specified' },
            ].map((element) => (
              <Stack key={element.title} direction="row">
                <Typography color="primary" sx={{ width: 200 }}>
                  {element.title}
                </Typography>
                <Typography color="primary" sx={{ fontWeight: 600 }}>
                  {element.value}
                </Typography>
              </Stack>
            ))}
              <Stack key="CV" direction="row">
                <Typography color="primary" sx={{ width: 200 }}>
                  CV
                </Typography>
                <Typography color="primary" sx={{ fontWeight: 600 }}>
                  {application?.jobSeeker.CV ?
                    <Button 
                      variant='contained' 
                      color="secondary" 
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadCV(application?.jobSeeker.CV)
                      }} 
                      sx={{boxShadow: 0, fontSize: '.7rem'}}
                    >
                      Download
                    </Button> 
                    : 'Not specified'
                  }
                </Typography>
              </Stack>
          </Box>

          <Box sx={style.box}>
            {[
              { title: "Linkedin", value: application?.jobSeeker.linkedin || 'Not specified' },
              { title: "Website", value: application?.jobSeeker.website || 'Not specified' },
              { title: "Github", value: application?.jobSeeker.github || 'Not specified' },
            ].map((element) => (
              <Stack key={element.title} direction="row">
                <Typography color="primary" sx={{ width: 200 }}>
                  {element.title}
                </Typography>
                <Typography color="primary" sx={{ fontWeight: 600 }}>
                  {element.value}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default JobApplication

const style = {
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    gap: 3,
    p: 2,
    bgcolor: "#dadada"
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderColor:'#2b3247', 
    borderRadius: 50, 
    border: 2 
  },
  close: { 
    width: 50, 
    height: 50,
    alignSelf: 'flex-start' 
  }, 
  box: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    bgcolor: "#fff",
    // width: "90%",
    m: 2,
    p: 3,
    borderRadius: 1,
  }
}