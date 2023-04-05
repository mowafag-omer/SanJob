import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import { CompanyApplicationProps } from '../../../pages/company/companyJob'
import JobApplication from './jobApplication';
import toDate from '../../../utils/toDate'
import { Buffer } from 'buffer'
import { AppDispatch } from '../../../store';
import { useDispatch } from "react-redux";
import { updateApplication } from '../../../store/applicationSlice';


const CompanyJobApplications = ({ applications, title }: { applications: CompanyApplicationProps[], title: string }) => {
  const [open, setOpen] = useState(false);
  const [detailedApp, setDetailedApp] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const downloadCV = (CV: any) => {
    const data = Buffer.from(CV, 'base64')
    const file = new Blob([new Uint8Array(data).buffer], {type: 'application/pdf'})
    const fileURL = URL.createObjectURL(file)
    window.open(fileURL)
  }

  const handleUpdate = (id: number, status: string) => {
    dispatch(updateApplication({applicaionId: id, status}))
  }

  const viewApplication = (id: number) => {
    let filteredApp = applications.filter((app: any) => app?.id === id)[0]
    setDetailedApp(filteredApp)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)
  
  return (
    <Box sx={{ width: "100%", mb: 5 }}>
        {open  && 
          <JobApplication 
            application={detailedApp} 
            handleClose={handleClose}
            downloadCV={downloadCV} 
          />
        }
        <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
        <Typography
          variant="h5"
          color="primary"
          sx={{
            px: 1,
            borderLeft: 2,
            borderColor: "#ffc107",
            alignSelf: "flex-start",
          }}
        >
          {title}
        </Typography>
        <Chip label={applications.length} color="secondary" />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell align="left">Applying date</TableCell>
              <TableCell align="left">Candidate email</TableCell>
              <TableCell align="left">CV</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow
                sx={style.row}
                key={app.id}
                onClick={() => viewApplication(app.id)}
              >
                <TableCell component="th" scope="row" sx={style.nameCell}>
                  <Avatar alt={app.jobSeeker.first_name} src={app.jobSeeker.img_url} />
                  {app.jobSeeker.first_name}
                </TableCell>
                <TableCell align="left">{toDate(app.applying_date)}</TableCell>
                <TableCell align="left">{app.jobSeeker.email}</TableCell>
                <TableCell align="left">
                  <Button 
                    variant='contained' 
                    color="secondary" 
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadCV(app.jobSeeker.CV)
                    }} 
                    sx={{boxShadow: 0, fontSize: '.7rem'}}
                  >
                    Download
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Stack sx={style.actions}>
                    {app.status === 'Received' &&
                      <Button 
                        variant='contained' 
                        color="success" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdate(app.id, 'In process')}
                        } 
                        sx={{boxShadow: 0, fontSize: '.7rem'}}
                      >
                        consider
                      </Button>
                    }
                    {app.status === 'In process' &&
                      <Button 
                        variant='contained' 
                        color="success" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdate(app.id, 'Accepted')}
                        } 
                        sx={{boxShadow: 0, fontSize: '.7rem'}}
                      >
                        Accept
                      </Button>
                    }
                    {(app.status === 'In process' || app.status === 'Received') &&
                      <Button 
                        variant='contained' 
                        color="error" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdate(app.id, 'Rejected')
                        }}
                        sx={{boxShadow: 0, fontSize: '.7rem'}}
                      >
                        reject
                      </Button>
                    }
                    {(app.status === 'Rejected') &&
                      <Button 
                        variant='contained' 
                        color="info" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdate(app.id, 'Received')
                        }}
                        sx={{boxShadow: 0, fontSize: '.7rem'}}
                      >
                        Restore
                      </Button>
                    }
                    {(app.status === 'Accepted') &&
                      <Button 
                        variant='contained' 
                        color="warning" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdate(app.id, 'Received')
                        }}
                        sx={{boxShadow: 0, fontSize: '.7rem'}}
                      >
                        Cancel
                      </Button>
                    }
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>  
  )
}

export default CompanyJobApplications

const style = {
  row: {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      boxShadow: 3,
      bgcolor: "#f7f7f7",
      borderTop: 2,
      borderBottom: 2,
      borderColor: "#ffc107",
    }
  },
  nameCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1
  }, 
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2  
  }
};
