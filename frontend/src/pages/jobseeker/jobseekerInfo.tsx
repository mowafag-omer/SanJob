import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Container,
  Box,
  Stack,
  FormControl,
  TextField,
  Input,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Autocomplete,
  Typography,
  Button,
  Divider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { updateProfile, cleanMessages } from "../../store/jobSeekerSlice";
import FeedBack from "../../components/feedBack";
import AddCV from "../../components/jobseeker/jobseekerInfo/addCV";
import DeleteCV from "../../components/jobseeker/jobseekerInfo/deleteCV";

type State = {
  img_url: string | null
  gender: string | null;
  first_name: string | null
  last_name: string | null;
  email: string | null;
  phone: number | null;
  birthdate: Date | null;
  location: string | null;
  profile_title: string | null;
  sector: string | null;
  linkedin: string | null;
  website: string | null;
  github: string | null;
  user: number | null;
};

const defaultImg = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Portrait_placeholder.png/512px-Portrait_placeholder.png"

const JobseekerInfo = () => {
  const { user, jobseeker, sectors } = useSelector((state: RootState) => state);
  const { token, id: userId, email: userEmail, role, hasProfile } = user
  const { message, CV } = jobseeker

  const [values, setValues] = useState<State>({
    img_url: jobseeker.img_url,
    gender: jobseeker.gender,
    first_name: jobseeker.first_name,
    last_name: jobseeker.last_name,
    email: hasProfile ? jobseeker.email : userEmail,
    phone: jobseeker.phone,
    birthdate: jobseeker.birthdate,
    location: jobseeker.location,
    profile_title: jobseeker.profile_title,
    sector: jobseeker.sector,
    linkedin: jobseeker.linkedin,
    website: jobseeker.website,
    github: jobseeker.github,
    user: userId,
  });

  const [showCVForm, setShowCVForm] = useState(false);

  const [showInput, setShowInput] = useState<boolean>(() => values.img_url ? false : true)
  const ref = useRef<HTMLInputElement>()
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "jobseeker") navigate("/");
  })

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateProfile({ profileProps: values, hasProfile, id: jobseeker.id }));
    if(values.img_url) setShowInput(false)
    setTimeout(() => {
      dispatch(cleanMessages())
      !hasProfile && setShowCVForm(true)
    }, 2000);
  };

  const handleChange = (prop: keyof State) => 
    (event: { target: { value: any } }) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={style.gird}
    > 
      {showCVForm && <AddCV id={jobseeker.id} setShowCVForm={setShowCVForm} />}

      <Container component="form" onSubmit={handleSubmit} sx={style.container}>
      {message && <FeedBack children={message} />}
        <Stack direction="column" spacing={2}>
          <FormControl>
            <FormLabel sx={{ position: 'relative' }}>Profile picture</FormLabel>
            <Stack direction="row" sx={style.imgStack}>
              <ModeEditIcon onClick={() => setShowInput(true)} />
              <Divider orientation="vertical" flexItem />
              <DeleteIcon 
                onClick={() => { 
                  setValues({...values, img_url: null})
                  setShowInput(true)
                  ref.current!.value = ""
                }}  
                color="error" 
              />
            </Stack>
            <Box
              component="img"
              sx={{
                height: 330,
                width: 250,
                maxHeight: { xs: 350, md: 250 },
                maxWidth: { xs: 233, md: 167 },
                borderRadius: 2,
                objectFit: "contain"
              }}
              alt="Profile picture"
              src={values.img_url || defaultImg}
            />
          </FormControl>
          {showInput && 
            <FormControl>
              <FormLabel>Profile picture URL</FormLabel>
              <TextField
                type="url"
                label=""
                inputRef={ref}
                value={values.img_url}
                onChange={handleChange("img_url")}
                variant="outlined"
                size="small"
              />
            </FormControl>
          }    
        </Stack>

        <FormControl>
          <FormLabel id="gender-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-label"
            name="gender"
            onChange={handleChange("gender")}
            value={values.gender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <Stack direction="row" spacing={2}>
          <FormControl id="first-name">
            <FormLabel>First name *</FormLabel>
            <TextField
              id="first-name"
              label=""
              value={values.first_name}
              onChange={handleChange("first_name")}
              variant="outlined"
              size="small"
              required
            />
          </FormControl>

          <FormControl id="last-name">
            <FormLabel>Last name</FormLabel>
            <TextField
              id="last-name"
              label=""
              value={values.last_name}
              onChange={handleChange("last_name")}
              variant="outlined"
              size="small"
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl id="email">
            <FormLabel>Email *</FormLabel>
            <TextField
              type="email"
              id="email"
              label=""
              value={values.email}
              onChange={handleChange("email")}
              variant="outlined"
              size="small"
              required
            />
          </FormControl>

          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <TextField
              type="number"
              id="phone"
              label=""
              value={values.phone}
              onChange={handleChange("phone")}
              variant="outlined"
              size="small"
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl id="birthdate">
            <FormLabel>Birthdate</FormLabel>
            <TextField
              type="date"
              id="birthdate"
              label=""
              value={values.birthdate}
              onChange={handleChange("birthdate")}
              variant="outlined"
              size="small"
              sx={{ width: 223 }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
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
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl id="title" size="small">
            <FormLabel>Profile title</FormLabel>
            <TextField
              id="title"
              label=""
              value={values.profile_title}
              onChange={handleChange("profile_title")}
              variant="outlined"
              size="small"
            />
          </FormControl>

          <FormControl sx={{ minWidth: 220 }} size="small">
            <FormLabel>Field of expertise</FormLabel>
            <Select
              id="expertise"
              label=""
              value={values.sector}
              onChange={handleChange("sector")}
            >
              <MenuItem value={0}></MenuItem>
              {sectors.sectors.map((sector: any) => (
                <MenuItem key={sector} value={sector}>{sector}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        
        {hasProfile && 
          <FormControl>
            <FormLabel>CV</FormLabel>
            {CV 
              ? <Stack direction="row" gap={2}>
                  <Button sx={style.button3} variant="outlined" onClick={() => {
                    const fileURL = URL.createObjectURL(CV)
                    window.open(fileURL)
                  }}>
                    View your CV 
                  </Button>
                  
                  <DeleteCV id={jobseeker.id} />

                  <Button sx={style.button2} onClick={() => setShowCVForm(true) }>Replace CV</Button>
                </Stack> 
              : <Button sx={style.button} onClick={() => setShowCVForm(true) }>add your CV</Button>
            }
            
          </FormControl>
        }

        <FormControl id="linkedin" size="small">
          <FormLabel>Linkedin</FormLabel>
          <TextField
            type="url"
            id="linkedin"
            label=""
            value={values.linkedin}
            onChange={handleChange("linkedin")}
            variant="outlined"
            size="small"
          />
        </FormControl>

        <FormControl id="website" size="small">
          <FormLabel>Website</FormLabel>
          <TextField
            type="url"
            id="website"
            label=""
            value={values.website}
            onChange={handleChange("website")}
            variant="outlined"
            size="small"
          />
        </FormControl>

        <FormControl id="github" size="small">
          <FormLabel>Github</FormLabel>
          <TextField
            type="url"
            id="github"
            label=""
            value={values.github}
            onChange={handleChange("github")}
            variant="outlined"
            size="small"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "22ch", alignSelf: 'center', ...style.button }}
          // disabled={!values.email || !values.password || !values.confirmPassword}
        >
          {hasProfile ? 'Update' : 'Create'}  
        </Button>
      </Container>
    </Grid>
  );
};

export default JobseekerInfo;

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
  imgStack: { 
    position: 'absolute', 
    bottom: "5px",
    left: "5px",
    borderRadius: 2,
    px: .4,
    py: .2,
    bgcolor: "#f7f7f7",
    cursor: 'pointer' 
  },
  button: {
    background: "#2b3247",
    color: "#fff",
    '&:hover': {
      background: "#2b3247",
      opacity: "85%"
    }, 
  },
  button2: {
    background: '#ffc107', 
    color: 'black' 
  },
  button3: {
    color: "#2b3247",
    borderColor: "#2b3247",
    '&:hover': {
      background: "#d4d6da",
      borderColor: "#2b3247",
    }, 
  },
};
