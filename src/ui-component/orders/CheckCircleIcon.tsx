import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CheckedCircleIcon = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.dark, borderRadius: '10em', width: '6px', height: '6px' }} />
  );
};

export default CheckedCircleIcon;
