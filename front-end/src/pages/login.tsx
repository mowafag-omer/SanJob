import React from "react";
import {
  Grid,
  Box,
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
import { isDisabled } from "@testing-library/user-event/dist/utils";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const Login = () => {
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
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
            justifyContent: "space-around",
            alignItems: "center",
            padding: 3,
            minHeight: 250,
            marginTop: 8,
            boxShadow: 2,
            borderRadius: '5px'
          }}
        >
          <Typography variant="h5">Login</Typography>
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
          <Button 
            variant="contained" 
            sx={{ width: "35ch" }}
            disabled={!values.password || !values.email}    
          >
            Login
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default Login;
