import {
  Grid,
  Container,
  Stack,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const styles = {
  container: {
    justifyContent: 'center',
    height: "450px",
    padding: "8%",
    background: "#2b3247",
    // background: "#42a5f5",
  },
}

const Banner = () => {
  return (
    <Grid color="primary" sx={styles.container}>
      <Container sx={{maxWidth: '1024px'}}> 
        <Stack style={{color: '#ffffff'}}>
          <Typography variant="h3">Find your fit.</Typography>
          <Typography variant="h6">
            We are here to help you find your dream job and start building your
            career
          </Typography>
        </Stack>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 700,
            height: 55,
            marginTop: "20px",
          }}
        >
          <InputBase
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
    </Grid>
  )
}

export default Banner
