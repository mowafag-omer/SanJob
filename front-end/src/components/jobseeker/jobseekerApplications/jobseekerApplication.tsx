import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { maxHeight } from '@mui/system';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function JobseekerApplication({open, handleClickOpen, handleClose}: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{maxHeight: '90vh'}}
      >
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '95vh'}}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Application" {...a11yProps(0)} />
            <Tab label="Job Offer" {...a11yProps(1)} />
          </Tabs>
          <Stack sx={{bgcolor: '#f5f5f5'}}>
            <DialogTitle sx={style.title}>
            <Avatar
              alt="Company logo"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56, borderRadius: 1 }}
            />
              <Typography variant='h6'>
              {"Use Google's location service?"}
              </Typography>
            </DialogTitle>
            <TabPanel value={value} index={0}>
              <Box sx={{bgcolor: '#fff', p: 3, borderRadius: 1}}>
                <Stack direction='row' gap={5}>
                  <Typography>Appling date:</Typography>
                  <Typography>September 8, 2022</Typography>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Stack>
        </Box>
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