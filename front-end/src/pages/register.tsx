import React from "react";
import {
  Grid,
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from 'react-router-dom'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signUp: { 
    width: "15ch", 
    marginTop: '8px',
    background: '#ffc107', 
    color: 'black' 
  }
}

interface State {
  email: string;
  password: string;
  confirmPassword: string
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const Register = () => {
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <form>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            minHeight: 460,
            marginTop: 4,
            boxShadow: 2,
            borderRadius: '5px'
          }}
        >
          <Typography variant="h5">Sign up</Typography>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <TextField 
              id="email" 
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              label="Email" 
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirmPassword">
              Confirm
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirmPassword"
              type={values.showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button 
            variant="contained" 
            sx={{ width: "35ch" }}
            disabled={!values.email || !values.password || !values.confirmPassword}    
          >
            Sign up
          </Button>
          <Stack sx={styles.container}>
            <Typography>
              Do you have an account already ?
            </Typography>
            <Button component={Link} to='/login' variant="outlined" sx={styles.signUp}>
              Login
            </Button>
          </Stack>    

        </Box>
      </form>
    </Grid>
  )
}

export default Register