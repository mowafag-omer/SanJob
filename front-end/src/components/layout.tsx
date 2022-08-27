import { useEffect } from "react"
import { Grid } from "@mui/material"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { fetchSectors } from "../store/sectorsSlice"
import Nav from "./nav"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
  const dispatch: AppDispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchSectors())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid sx={{
      display: "flex",
      flexDirection: "column",  
      height: '100vh' 
    }}>
      <Nav />
      {children}
    </Grid>
  )
}

export default Layout