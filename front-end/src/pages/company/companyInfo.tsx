import React, { useEffect, useState } from "react";
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
  TextFieldProps,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

type State = {
  id: number | null;
  name: string | null;
  location: string | null;
  sector: number | null;
  presentation: string | null;
  founding_year: string | null;
  employees: number | null;
  website: string | null;
  user: number | null;
};

const CompanyInfo = () => {
  const { user, company } = useSelector((state: RootState) => state);
  const {
    id: userId,
    email: userEmail,
    role,
    hasProfile,
  } = user

  const [values, setValues] = useState<State>({
    id: company.id,
    name: company.name,
    location: company.location,
    sector: company.sector,
    presentation: company.presentation,
    founding_year: company.founding_year,
    employees: company.employees,
    website: company.website,
    user: userId,
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(updateProfile({ profileProps: values, hasProfile, id: values.id }));
  };

  const handleChange = (prop: keyof State) => 
    (event: { target: { value: any } }) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={style.gird}
    >
      <Container
        component="form"
        onSubmit={handleSubmit}
        sx={style.container}
      >
        <FormControl>
          <FormLabel>Company name *</FormLabel>
          <TextField
            label=""
            value={values.name}
            onChange={handleChange("name")}
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
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </FormControl>
        
        <FormControl fullWidth>
          <FormLabel>Company presentation *</FormLabel>
          <TextField
            label=""
            value={values.presentation}
            onChange={handleChange("presentation")}
            variant="outlined"
            size="small"
            multiline
            rows={6}
            required
          />
        </FormControl>

        <FormControl>  
          <LocalizationProvider dateAdapter={AdapterDayjs}>          
            <FormLabel>Founding year *</FormLabel>
            <DatePicker
              views={['year']}
              label=""
              value={values.founding_year}
              onChange={(newValue) =>
                setValues({ ...values, founding_year: newValue })
              }
              renderInput={(params) => <TextField {...params} size="small" helperText={null} />}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl>
          <FormLabel>Employees *</FormLabel>
          <TextField
            type="number"
            label=""
            value={values.employees}
            onChange={handleChange("employees")}
            variant="outlined"
            size="small"
            required
          />
        </FormControl>    

        <FormControl size="small">
          <FormLabel>Website</FormLabel>
          <TextField
            type="url"
            label=""
            value={values.website}
            onChange={handleChange("website")}
            variant="outlined"
            size="small"
          />
        </FormControl>

        {/* <FormControl>
          <FormLabel>Sector</FormLabel>
          <Autocomplete
            disablePortal
            value={values.sector}
            onChange={(e: any, newValue: string | null) =>
              setValues({ ...values, sector: newValue })
            }
            options={["Tech", "Business", "Finance"]}
            sx={{ width: 223 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </FormControl> */}

      </Container>
    </Grid>
  );
};

export default CompanyInfo

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
}