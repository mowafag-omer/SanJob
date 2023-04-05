import { useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Router from './router';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"
import { useNavigate } from 'react-router-dom';
import { logout, refresh } from './store/userSlice';
import api from './utils/api';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b3247"
    },
    secondary: {
      main: "#ffc107"
    }
  }
});

function App() {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      (async () => {
        try {
          const response = await api.get('/user/refresh')
          dispatch(refresh(response.data))
          navigate('/')
        } catch (error) {
          dispatch(logout())
        }
      })()
    }
  }, [dispatch, navigate, token])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
