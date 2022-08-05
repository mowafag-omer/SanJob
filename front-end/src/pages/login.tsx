import React, { useEffect } from "react"
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
  Alert,
  Button,
  Divider,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { login, cleanErrors } from "../store/userSlice"
import { RootState, AppDispatch } from "../store"
import { useNavigate } from "react-router-dom"

type State = {
  email: string
  password: string
  showPassword: boolean
}

const Login = () => {
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
  })
  
  const dispatch: AppDispatch = useDispatch()
  const { isLogged, error } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(cleanErrors())
    isLogged && navigate('/jobseekerInfo')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLogged) {
      dispatch(cleanErrors())
      navigate('/jobseekerInfo') 
    } 
  })

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login({
      email: values.email, 
      password: values.password, 
    }))
    setValues({...values, password: ""})
  }

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={style.box}
      >
        <Typography variant="h5">Login</Typography>
        <Divider sx={{width: '80%', mt: -1}} />
        {error && <Alert severity="error">{error}</Alert>}

        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField 
            id="email" 
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            label="Email" 
            size="small"
          />
        </FormControl>
        
        <FormControl sx={{ m: 1, width: "35ch" }} size="small" variant="outlined">
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
          type="submit"
          variant="contained" 
          sx={{ width: "30ch" }}
          disabled={!values.password || !values.email}    
        >
          Login
        </Button>

        <Divider sx={{width: '80%', mb: -1}} />
        <Stack sx={style.container}>
          <Typography>
            Don't have an account yet ?
          </Typography>
          <Button component={Link} to='/register' variant="outlined" sx={style.signUpButton}>
            Sign up
          </Button>
        </Stack>    
      </Box>
    </Grid>
  )
}

export default Login
  
const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    minHeight: 400,
    marginTop: 8,
    boxShadow: 2,
    borderRadius: '5px'
  },
  signUpButton: { 
    width: "15ch", 
    marginTop: '8px',
    background: '#ffc107', 
    color: '#2b3247',
    // "&:hover": {
      //   color: '#dadada',
      //   bgcolor: "#2b3247",
      //   border: "1px solid #dadada",
    // } 
  }
  }
