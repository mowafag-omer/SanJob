import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import MemoryIcon from '@mui/icons-material/Memory';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FactoryIcon from '@mui/icons-material/Factory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const Sectors = () => {
  return (
    <div style={{ background: '#f7f7f7'}}>
      <Typography variant="h4" align="center" sx={{ padding: "18px" }}>
        Job sectors
      </Typography>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        {[
          { name: "Tech", icon: <MemoryIcon fontSize="large"/> },
          { name: "Consulting", icon: <FactCheckIcon fontSize="large"/> },
          { name: "Food", icon: <LocalDiningIcon fontSize="large"/> },
          { name: "Distribution", icon: <LocalShippingIcon fontSize="large"/> },
          { name: "Banking / Finance", icon: <AccountBalanceIcon fontSize="large"/> },
          { name: "Industry", icon: <FactoryIcon fontSize="large"/> },
        ].map((sector: { name: string; icon: React.ReactNode }) => (
          <Card sx={{ width: 300, margin: 2, border: 1 }} style={{ background: '#ffffff'}}>
            <CardActionArea>
              <CardMedia component="div" sx={{ height: 80, margin: 2 }}>
                <IconButton
                  // color="primary"
                  size="large"
                  sx={{ color: '#2b3247' }}
                  aria-label="login"
                >
                  {sector.icon}
                </IconButton>
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
      </Grid>
    </div>
  );
};

export default Sectors;
