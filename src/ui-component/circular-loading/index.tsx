import React from 'react';
import { CircularProgress, CircularProgressProps, Grid, SxProps } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

interface CircularLoadingProps {
  loadingProps?: CircularProgressProps;
  sx?: SxProps;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ loadingProps, sx }) => (
  <Grid
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      width: '100%',
      height: '100%',
      margin: margins.auto,
      marginTop: margins.top16,
      py: paddings.topBottom16,
      ...sx
    }}
  >
    <CircularProgress size={40} {...loadingProps} />
  </Grid>
);

export default CircularLoading;
