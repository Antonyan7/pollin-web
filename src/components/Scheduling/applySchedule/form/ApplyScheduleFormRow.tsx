import React from 'react';
import { Grid, Typography } from '@mui/material';

const ApplyScheduleFormRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Grid item xs={12}>
    <Grid container alignItems="center">
      <Grid item xs={12} lg={3}>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      <Grid item xs={12} lg={9}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

export default ApplyScheduleFormRow;
