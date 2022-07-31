import React, { useEffect, useState } from "react"
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
  FormHelperText,
  Alert
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { register, cleanErrors } from "../store/userSlice"
import { RootState, AppDispatch } from "../store"
import FeedBack from "../components/feedBack"
import { useNavigate } from "react-router-dom"

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

type State = {
  email: string
  password: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  passwordMatch: boolean
}

const Register = () => {
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordMatch: true
  })

  const dispatch: AppDispatch = useDispatch()
  const { isLogged, error, validationError } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(cleanErrors())
    isLogged && navigate('/jobseekerInfo')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLogged) {
      dispatch(cleanErrors())
      setValues({...values, email: "", password: "", confirmPassword: ""})
      setTimeout(() => { return navigate('/jobseekerInfo') }, 2000)
    } 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLogged, navigate])
  
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (values.password !== values.confirmPassword)
      setValues({ ...values, passwordMatch: false })

    dispatch(register({
      email: values.email, 
      password: values.password, 
      role: 'jobseeker'
    }))
  }

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })

    if (prop === "confirmPassword") {
      if (values.password === event.target.value) 
        setValues({ ...values, [prop]: event.target.value, passwordMatch: true })
    }
  }
    
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    })
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {isLogged && <FeedBack children='done !' />}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={style.box}
        >
        <Typography variant="h5">Sign up</Typography>
        
        {error && <Alert severity="error">{error}</Alert>}

        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField 
            id="email" 
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            label="Email"
            size="small"
            error={validationError?.field === 'email'}
            helperText={validationError?.message} 
            required
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "35ch" }} size="small" required>
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

        <FormControl error={!values.passwordMatch} sx={{ m: 1, width: "35ch" }} size="small" required>
          <InputLabel htmlFor="confirmPassword">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowConfirmPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
          {!values.passwordMatch && (
            <FormHelperText id="confirmPassword">
              Password and confirm password doesn't match.
            </FormHelperText>
          )}
          
        </FormControl>
        <Button 
          type="submit"
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
    </Grid>
  )
}

export default Register

const style = {
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    minHeight: 460,
    marginTop: 4,
    boxShadow: 2,
    borderRadius: '5px'
  }
}
