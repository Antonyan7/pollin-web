import React from 'react';
import { FormControl, Grid, Typography } from '@mui/material';

const BlockScheduleFormRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Grid item xs={12}>
    <Grid container alignItems="center">
      <Grid item xs={12} lg={3}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={12} lg={9}>
        <FormControl fullWidth>{children}</FormControl>
      </Grid>
    </Grid>
  </Grid>
);

export default BlockScheduleFormRow;
