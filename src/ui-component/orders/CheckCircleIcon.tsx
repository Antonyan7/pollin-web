import React from 'react';
import { Box, useTheme } from '@mui/material';

const CheckedCircleIcon = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.dark, borderRadius: '10em', width: '6px', height: '6px' }} />
  );
};

export default CheckedCircleIcon;
