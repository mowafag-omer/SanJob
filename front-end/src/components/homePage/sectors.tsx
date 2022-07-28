import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MemoryIcon from '@mui/icons-material/Memory';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FactoryIcon from '@mui/icons-material/Factory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const Sectors = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center" 
      sx={{ bgcolor: '#f7f7f7'}}
      >
      <Typography variant="h5" align="center" sx={{ padding: "18px" }}>
        Job sectors
      </Typography>

      <Box
        sx={style.box}
      >
        {[
          { name: "Tech", icon: <MemoryIcon fontSize="large"/> },
          { name: "Consulting", icon: <FactCheckIcon fontSize="large"/> },
          { name: "Food", icon: <LocalDiningIcon fontSize="large"/> },
          { name: "Distribution", icon: <LocalShippingIcon fontSize="large"/> },
          { name: "Banking / Finance", icon: <AccountBalanceIcon fontSize="large"/> },
          { name: "Industry", icon: <FactoryIcon fontSize="large"/> },
        ].map((sector: { name: string; icon: React.ReactNode }) => (
          <Card sx={style.card}>
            <CardActionArea>
              <CardMedia component="div" sx={style.cardMedia}>
                {sector.icon}
              </CardMedia>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  {sector.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Grid>
  );
};

export default Sectors;

const style = {
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1024px'
  },
  card: { 
    width: 300, 
    m: 2, 
    border: 1,
    bgcolor: "#fff" 
  },
  cardMedia: { 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80, 
    margin: 2 
  }
} 