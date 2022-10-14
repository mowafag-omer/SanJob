import { Grid } from "@mui/material"
import Footer from "./footer"
import Nav from "./nav/nav"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
  return (
    <Grid sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", 
      height: '100vh' 
    }}>
      <Nav />
      {children}
      <Footer />
    </Grid>
  )
}

export default Layout