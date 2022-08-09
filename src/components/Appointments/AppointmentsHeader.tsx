import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const AppointmentsHeader = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar elevation={0} position="static" color="transparent">
      <Toolbar
        sx={{ backgroundColor: 'white', borderRadius: '7px', border: `1px solid ${cssVariables.normalBackgroundDark}` }}
      >
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          Appointments
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <HomeIcon sx={{ color: 'black' }} />
          <ArrowForwardIosIcon sx={{ color: cssVariables.normalBackgroundDark }} />
          <Typography sx={{ color: cssVariables.normalBackgroundDark }} variant="h3">
            Appointments
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

export default AppointmentsHeader;
