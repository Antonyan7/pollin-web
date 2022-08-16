import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';

const ApplyScheduleHeader = () => {
  const theme = useTheme();

  // TODO - will be generic BreadCrumb after agreed
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '7px',
            border: '1px solid #dce1e4'
          }}
        >
          <Typography variant="h3" component="div">
            Apply Schedule
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <HomeIcon sx={{ color: 'black' }} />
            <ArrowForwardIosIcon
              sx={{
                color: theme.palette.grey[800],
                fontSize: '18px'
              }}
            />
            <Typography
              sx={{
                fontSize: '16px',
                lineHeight: '20px',
                color: theme.palette.grey[800]
              }}
            >
              Apply Schedule
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ApplyScheduleHeader;
