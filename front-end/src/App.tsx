import { useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Router from './router';
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "./store"

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
  const dispatch: AppDispatch = useDispatch()
  
  useEffect(() => {
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
