import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  FormControl,
  TextField,
  FormLabel,
  Autocomplete,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { cleanMessages, updateCompanyProfile } from "../../store/companySlice";
import FeedBack from "../../components/feedBack";

type State = {
  id: number | null;
  name: string | null;
  location: string | null;
  sector: string[];
  presentation: string | null;
  founding_year: any;
  employees: number | null;
  website: string | null;
  user: number | null;
};

const CompanyInfo = () => {
  const { user, company, sectors } = useSelector((state: RootState) => state);
  const { id: userId, hasProfile } = user;

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

  useEffect(() => {
    setValues({
      id: company.id,
      name: company.name,
      location: company.location,
      sector: company.sector,
      presentation: company.presentation,
      founding_year: company.founding_year,
      employees: company.employees,
      website: company.website,
      user: userId,  
    })
  }, [company, userId])
  
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updateCompanyProfile({ profileProps: values, hasProfile, id: values.id })
    );

    setTimeout(() => dispatch(cleanMessages()), 3000);
  };

  const handleChange = (prop: keyof State) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={style.gird}
    >
      <Container component="form" onSubmit={handleSubmit} sx={style.container}>
        {company.message && <FeedBack children={company.message} />}

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
            renderInput={(params) => (
              <TextField {...params} label="" required />
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Sector *</FormLabel>
          <Autocomplete
            multiple
            value={[...values.sector] || null}
            options={sectors.sectors}
            onChange={(e: any, newValue: any) =>
              setValues({ ...values, sector: newValue })
            }
            size="small"
            renderInput={(params) => (
              <TextField {...params} required={!values.sector.length} />
            )}
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
              views={["year"]}
              disableFuture
              label=""
              value={ values.founding_year ? new Date(values.founding_year) : null }
              onChange={(newValue: number | null) => {
                setValues({ ...values, founding_year: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  helperText={null}
                  required
                />
              )}
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

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "22ch", alignSelf: "center" }}
        >
          {hasProfile ? "Update" : "Create"}
        </Button>
      </Container>
    </Grid>
  );
};

export default CompanyInfo;

const style = {
  gird: {
    p: 5,
    bgcolor: "#f7f7f7",
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
