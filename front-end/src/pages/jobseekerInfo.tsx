import React from "react";
import {
  Grid,
  Container,
  Box,
  Stack,
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";

const JobseekerInfo = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={style.gird}
    >
      <Container sx={style.container}>
        <Box
          component="img"
          sx={{
            height: 330,
            width: 250,
            maxHeight: { xs: 350, md: 250 },
            maxWidth: { xs: 233, md: 167 },
            borderRadius: 2
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
        
        <FormControl >
          <FormLabel id="gender-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-label"
            name="gender"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        
        <FormControl id="first-name" >
          <Typography>First name *</Typography>
          <TextField id="first-name" label="" variant="outlined" size="small" required/>
        </FormControl>
        
        <FormControl id="last-name">
          <Typography>Last name</Typography>
          <TextField id="last-name" label="" variant="outlined" size="small" />
        </FormControl>
        
        <FormControl id="email">
          <Typography>Email *</Typography>
          <TextField type="email" id="email" label="" variant="outlined" size="small" required/>
        </FormControl>
        
        <FormControl id="phone">
          <Typography>Phone </Typography>
          <TextField type="number" id="phone" label="" variant="outlined" size="small" />
        </FormControl>
        
        <FormControl id="birthdate">
          <Typography>Birthdate</Typography>
          <TextField type="date" id="birthdate" label="" variant="outlined" size="small" />
        </FormControl>

        <FormControl >
          <Typography>Location</Typography>
          <Autocomplete
            disablePortal
            id="location"
            options={[{label: 'Paris'}, {label: 'Lyon'}]}
            sx={{ width: 220 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="" />}
          />
          {/* <Select
            id="location"
            label=""
          >
            <MenuItem value={10}>Paris</MenuItem>
            <MenuItem value={20}>Lyon</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
        </FormControl>

        <FormControl id="title" size="small">
          <Typography>Profile title</Typography>
          <TextField id="title" label="" variant="outlined" size="small" />
        </FormControl>

        <FormControl sx={{minWidth: 220}} size="small">
          <Typography>Field of expertise</Typography>
          <Select
            id="expertise"
            label=""
          >
            <MenuItem value={10}>Tech</MenuItem>
            <MenuItem value={20}>Business</MenuItem>
            <MenuItem value={30}>Finance</MenuItem>
          </Select>
        </FormControl>

        <FormControl id="linkedin" size="small">
          <Typography>Linkedin</Typography>
          <TextField type="url" id="linkedin" label="" variant="outlined" size="small" />
        </FormControl>

        <FormControl id="website" size="small">
          <Typography>Website</Typography>
          <TextField type="url" id="website" label="" variant="outlined" size="small" />
        </FormControl>

        <FormControl id="github" size="small">
          <Typography>Github</Typography>
          <TextField type="url" id="github" label="" variant="outlined" size="small" />
        </FormControl>

      </Container>
    </Grid>
  )
}

export default JobseekerInfo

const style = {
  gird : {
    p: 5
  },
  container: {
    width: '1024px',
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5ch',
  },
}