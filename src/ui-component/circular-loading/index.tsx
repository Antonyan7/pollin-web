import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

const CircularLoading = () => (
  <Grid item display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
    <CircularProgress />
  </Grid>
);

export default CircularLoading;
