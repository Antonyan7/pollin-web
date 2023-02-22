import React from 'react';
import { CircularProgress, Stack, useTheme } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const OrderLoading = () => {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      borderTop={`1px solid ${theme.palette.primary.light}`}
      p={paddings.all24}
    >
      <CircularProgress />
    </Stack>
  );
};

export default OrderLoading;
