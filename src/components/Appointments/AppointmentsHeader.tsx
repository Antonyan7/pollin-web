import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';

const AppointmentsHeader = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar sx={{ backgroundColor: 'white', borderRadius: '7px', border: `1px solid ${theme.palette.dark[200]}` }}>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Appointments
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <HomeIcon sx={{ color: 'black' }} />
            <ArrowForwardIosIcon sx={{ color: theme.palette.dark[200] }} />
            <Typography sx={{ color: theme.palette.dark[200] }} variant="h3">
              Appointments
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppointmentsHeader;
