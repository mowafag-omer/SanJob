import React, { useState } from "react";
import {
  Grid,
  Container,
  Box,
  Stack,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Autocomplete,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { postJob, JobProps, cleanMessages } from "../../store/jobsSlice";
import FeedBack from "../../components/feedBack";

const PostJob = () => {
  const { sectors, company, jobs } = useSelector((state: RootState) => state)
  const sectorsList = sectors.sectors

  const [values, setValues] = useState<JobProps>({
    id: null,
    job_title: null,
    location: null,
    contract_type: [],
    sector: null,
    description: null,
    requirement: null,
    start_date: null,
    posted_at: "",
    hiring_process: null,
    status: null,
    company: company.id,
  })

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(postJob({ jobProps: values, id: values.id }));
    setTimeout(() => {
      dispatch(cleanMessages())
      navigate('/companyDashboard')
    }, 3000);
  }

  const handleChange = (prop: keyof JobProps) => 
    (event: { target: { value: any } }) => {
      setValues({ ...values, [prop]: event.target.value });
    }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={style.gird}
    >
      <Container component="form" onSubmit={handleSubmit} sx={style.container}>
      {jobs.message && <FeedBack children={jobs.message} />}

      <FormControl>
        <FormLabel>Job title *</FormLabel>
          <TextField
            label=""
            value={values.job_title}
            onChange={handleChange("job_title")}
            variant="outlined"
            size="small"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Location *</FormLabel>
          <Autocomplete
            disablePortal
            id="location"
            value={values.location}
            onChange={(e: any, newValue: string | null) =>
              setValues({ ...values, location: newValue })
            }
            options={["Paris", "Lyon"]}
            sx={{ width: 223 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="" required />
            )}
          />
        </FormControl>

        <FormControl id="contract">
          <FormLabel>Contract type *</FormLabel>
          <Select
            multiple
            value={values.contract_type}
            label=""
            size="small"
            onChange={handleChange("contract_type")}
            sx={{ width: 223 }}
          >
            <MenuItem value="CDI">CDI</MenuItem>
            <MenuItem value="CDD">CDD</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Sector *</FormLabel>
          <Select
            value={values.sector}
            label=""
            size="small"
            onChange={handleChange("sector")}
            sx={{ width: 223 }}
          >
            <MenuItem value=""></MenuItem>
            {sectorsList.map((sector: string) => (
              <MenuItem key={sector} value={sector}>{sector}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Job description *</FormLabel>
          <TextField
            label=""
            value={values.description}
            onChange={handleChange("description")}
            variant="outlined"
            size="small"
            multiline
            rows={6}
            required
          />
        </FormControl>
        
        <FormControl fullWidth>
          <FormLabel>Job requirement *</FormLabel>
          <TextField
            label=""
            value={values.requirement}
            onChange={handleChange("requirement")}
            variant="outlined"
            size="small"
            multiline
            rows={6}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Start date *</FormLabel>
          <TextField
            type="date"
            label=""
            value={values.start_date}
            onChange={handleChange("start_date")}
            variant="outlined"
            size="small"
            sx={{ width: 223 }}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Hiring process</FormLabel>
          <TextField
            label=""
            value={values.hiring_process}
            onChange={handleChange("hiring_process")}
            variant="outlined"
            size="small"
            multiline
            rows={6}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "22ch", alignSelf: "center" }}
        >
          Post
        </Button>
      </Container>
    </Grid>
    
  )
}

export default PostJob

const style = {
  gird: {
    p: 5,
    bgcolor: "#f7f7f7",
    // width: '100%'
  },
  container: {
    width: "1024px",
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "5ch",
    bgcolor: "#fff",
  },
};
