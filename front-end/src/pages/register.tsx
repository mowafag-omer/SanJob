import React, { useEffect, useState } from "react"
import {
  Grid,
  Box,
  Stack,
  FormControl,
  FormLabel,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  RadioGroup,
  Radio,
  IconButton,
  Typography,
  Button,
  FormHelperText,
  Alert,
  Divider
} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { register, cleanErrors } from "../store/userSlice"
import { RootState, AppDispatch } from "../store"
import FeedBack from "../components/feedBack"
import { useNavigate } from "react-router-dom"

type State = {
  email: string
  password: string
  confirmPassword: string
  role: string
  showPassword: boolean
  showConfirmPassword: boolean
  passwordMatch: boolean
  roleError: boolean
}

const Register = () => {
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordMatch: true,
    roleError: false
  })

  const dispatch: AppDispatch = useDispatch()
  const { isLogged, message, error, validationError } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(cleanErrors())
    isLogged && navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLogged) {
      dispatch(cleanErrors())
      setValues({...values, email: "", password: "", confirmPassword: ""})
      setTimeout(() => { return navigate('/') }, 2000)
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
      role: values.role
    }))
    setValues({...values, password: "", confirmPassword: ""})
  }

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })

    if (prop === "confirmPassword") {
      if (values.password === event.target.value) 
        setValues({ ...values, [prop]: event.target.value, passwordMatch: true })
    }

    if (prop === "role") {
      if (event.target.value !== '') 
        setValues({ ...values, [prop]: event.target.value, roleError: false })
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
      {isLogged && <FeedBack children={message} />}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={style.box}
      >
        <Typography variant="h5">Sign up</Typography>
        <Divider sx={{width: '80%', my: 2}} />
        {error && <Alert severity="error">{error}</Alert>}

        <FormControl error={values.roleError} sx={style.formControl}>
          <FormLabel id="demo-controlled-radio-buttons-group">Account type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="role"
            value={values.role}
            onChange={handleChange("role")}
            sx={style.radioGroup}
          >
            <Box 
              sx={[style.radioBox, () => values.roleError ? style.roleErorr : {}]}
              onClick={() => setValues({...values, role: 'jobseeker', roleError: false})}
            >
              <Radio 
                value="jobseeker" 
                icon={<PersonIcon color={values.roleError ? 'error' : undefined} />} 
                checkedIcon={<PersonIcon />} 
              />
              <Typography color={values.role === 'jobseeker' ? 'primary' : 'inherit'}>
                Job seeker
              </Typography>
            </Box>
            <Box 
              sx={[style.radioBox, () => values.roleError ? style.roleErorr : {}]}
              onClick={() => setValues({...values, role: 'company', roleError: false})}
            >
              <Radio 
                value="company" 
                icon={<BusinessIcon color={values.roleError ? 'error' : undefined} />} 
                checkedIcon={<BusinessIcon />}
              />
              <Typography color={values.role === 'company' ? 'primary' : ''}>
                Company
              </Typography>
            </Box>
          </RadioGroup>
          {values.roleError && <FormHelperText>Role is required</FormHelperText>}
        </FormControl>

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

        <Divider sx={{width: '80%', my: 2}} />

        <Stack sx={style.container}>
          <Typography>
            Do you have an account already ?
          </Typography>
          <Button component={Link} to='/login' variant="outlined" sx={style.signUp}>
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
    minHeight: 600,
    marginTop: 4,
    boxShadow: 2,
    borderRadius: 2,
    my: 3
  },
  formControl: {
    display: "flex",
    flexDirection: "colum",
    alignItems: "center",
    gap: 1,
    width: '100%'
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '80%'
  },
  radioBox:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    p: 1.5,
    borderRadius: 1,
    boxShadow: 1,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 3
    }
  },
  roleErorr: {
    color: '#d32f2f',
    border: 1,
    borderColor: '#d32f2f'
  },
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
