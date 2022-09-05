import { Grid } from "@mui/material"
import Nav from "./nav/nav"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
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