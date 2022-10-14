import React from 'react'
import { Box, Stack, Typography } from "@mui/material";
import { CompanyJobProps } from '../../../pages/company/companyJobs';
import toDate from '../../../utils/toDate';

const CompanyJobDetails = ({ job }: {job: CompanyJobProps}) => {
  return (
    <>
      <Box sx={style.box}>
      {[
        { title: "Location", value: job.location },
        { title: "Sector", value: job.sector },
        { title: "Contract type", value: JSON.parse(job.contract_type[0])[0]},
        { title: "Start Date", value: toDate(job.start_date) },
        { title: "Posted at", value: toDate(job.posted_at) },
        { title: "Status", value: job.status },
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
        <Typography variant="h6" color="primary">
            Description
        </Typography>
        <Typography color="primary">{job.description}</Typography>
      </Box>
      <Box sx={style.box}>
        <Typography variant="h6" color="primary">
            Requirement
        </Typography>
        <Typography color="primary">{job.requirement}</Typography>
      </Box>
      <Box sx={style.box}>
        <Typography variant="h6" color="primary">
            Hiring process
        </Typography>
        <Typography color="primary">{job.hiring_process || 'not specified'}</Typography>
      </Box>
    </>
  )
}

export default CompanyJobDetails

const style = {
  box: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    bgcolor: "#fff",
    width: "90%",
    m: 2,
    p: 3,
    borderRadius: 1,
  }
};