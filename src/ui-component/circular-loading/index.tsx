import React from 'react';
import { CircularProgress, CircularProgressProps, Grid } from '@mui/material';

interface CircularLoadingProps {
  loadingProps?: CircularProgressProps;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ loadingProps }) => (
  <Grid display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
    <CircularProgress size={24} {...loadingProps} />
  </Grid>
);

export default CircularLoading;
