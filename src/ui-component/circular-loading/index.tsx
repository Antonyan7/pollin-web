import React from 'react';
import { CircularProgress, CircularProgressProps, Grid, SxProps } from '@mui/material';

interface CircularLoadingProps {
  loadingProps?: CircularProgressProps;
  sx?: SxProps;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ loadingProps, sx }) => (
  <Grid display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%', ...sx }}>
    <CircularProgress size={40} {...loadingProps} />
  </Grid>
);

export default CircularLoading;
