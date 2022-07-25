import {
  Grid,
  Container,
  Box,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import LocationOnIcon from '@mui/icons-material/LocationOn';

const styles = {
  container : {
    bgcolor: "#f7f7f7",
    width: '100%',
    p: '3ch'
  },
  box :{
    display: 'flex'
  }
}

const SearchFrom = () => {
  return (
    <Grid 
      container 
      direction="column" 
      alignItems="center"
      sx={styles.container}
    >
      <Typography variant="h4">Job offers</Typography>
      <Box component="form">
        <TextField
            label=""
            placeholder="Find your fit"
            id="search-job"
            sx={{ m: 1, minWidth: '25ch', width: '55ch', background: '#fff' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />

        <TextField
            label=""
            placeholder="Location"
            id="location"
            sx={{ m: 1, minWidth: '25ch', width: '25ch', background: '#fff' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
            }}
          />
      </Box>
    </Grid>
  )
}

export default SearchFrom