import {
  Grid,
  Box,
  Stack,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"


const Banner = () => {
  return (
    <Grid color="primary" sx={style.container}>
      <Box sx={style.box}>
        <Stack sx={{color: '#ffffff'}}>
          <Typography variant="h3">Find your fit.</Typography>
          <Typography variant="h6">
            We are here to help you find your dream job and start building your
            career
          </Typography>
        </Stack>
        <Paper
          component="form"
          sx={style.paper}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Grid>
  )
}

export default Banner

const style = {
  container: {
    display: 'flex',
    flexDirection: "column",
    alignItems: {lg: 'center'} ,
    bgcolor: "#2b3247",
    // background: "#42a5f5",
    height: {lg: '50vh', xs: '70vh'},
    px: 3,
    pt: {xs: 14, lg: 9}
  },
  box: {
    width: {'md': '80%', lg: '1024px'} 
  },
  paper: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: {md: '80%', lg: '100%'},
    height: 55,
    marginTop: "20px",
  }
}