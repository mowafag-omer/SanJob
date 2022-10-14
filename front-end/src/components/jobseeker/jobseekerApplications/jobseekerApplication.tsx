import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box, DialogContent, Stack, Tab, Tabs, Typography } from '@mui/material';


export default function JobseekerApplication({application, open, handleClickOpen, handleClose}: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        scroll="paper"
        onClose={handleClose}
        sx={{}}
      >
        <DialogTitle sx={style.title}>
          <Avatar
            alt="Company logo"
            src={application.jobOffer.company.logo_url}
            sx={{ width: 80, height: 80, borderRadius: 1 }}
          />
          <Stack>
            <Typography variant='h6'>
            {application.jobOffer.company.name}
            </Typography>
            <Typography variant='h4'>
            {application.jobOffer.job_title}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers={true} sx={{ p: 2, bgcolor: '#f5f5f5'}}>
          <Box sx={{bgcolor: '#fff', m: 2, p: 3, borderRadius: 1}}>
            <Stack direction='row' gap={2}>
              <Typography>Appling date</Typography>
              <Typography>{new Date(application.applying_date).toDateString()}</Typography>
            </Stack>
            <Stack direction='row' gap={8}>
              <Typography>Status</Typography>
              <Typography>{application.status}</Typography>
            </Stack>
          </Box>
          <Box sx={{bgcolor: '#fff', m: 2, p: 3, borderRadius: 1}}>
            <Stack direction='row' gap={5}>
              <Typography>Company</Typography>
              <Typography>{application.jobOffer.company.name}</Typography>
            </Stack>
            <Stack direction='row' gap={6}>
              <Typography>Location</Typography>
              <Typography>{application.jobOffer.location}</Typography>
            </Stack>
            <Stack direction='row' gap={1}>
              <Typography>Contract type</Typography>
              <Typography>{application.jobOffer.Contract_type || 'CDD'}</Typography>
            </Stack>
            <Stack direction='row' gap={8}>
              <Typography>Sector</Typography>
              <Typography>{application.jobOffer.sector}</Typography>
            </Stack>
          </Box>
          <Stack sx={{bgcolor: '#fff', m: 2, p: 2}}>
            <Typography variant="h6">
              Job offer description
            </Typography>
            <hr />
            <Typography variant="body1">
              {application.jobOffer.description} 
            </Typography>
          </Stack>
          <Stack sx={{bgcolor: '#fff', m: 2, p: 2}}>
            <Typography variant="h6">
              Job requirements
            </Typography>
            <hr />
            <Typography variant="body1">
              {application.jobOffer.requirement} 
            </Typography>
          </Stack>
          <Stack sx={{bgcolor: '#fff', m: 2, p: 2}}>
            <Typography variant="h6">
              Hiring process
            </Typography>
            <hr />
            <Typography variant="body1">
              {application.jobOffer.hiring_process || 'Not specified'} 
            </Typography>
          </Stack>
        </DialogContent>

      </Dialog>
    </div>
  );
}

const style = {
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    p: 4,
    bgcolor: "#dadada"
  }
}