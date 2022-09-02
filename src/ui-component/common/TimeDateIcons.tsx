import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import { InputAdornment, useTheme } from '@mui/material';

const PickerTimeIcon = () => {
  const theme = useTheme();

  return (
    <InputAdornment position="end">
      <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
    </InputAdornment>
  );
};

const PickerDateIcon = () => {
  const theme = useTheme();

  return (
    <InputAdornment position="end">
      <EventIcon sx={{ color: theme.palette.primary.main }} />
    </InputAdornment>
  );
};

export { PickerDateIcon,PickerTimeIcon };
