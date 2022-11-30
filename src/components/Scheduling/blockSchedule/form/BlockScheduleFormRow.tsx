import React from 'react';
import { FormControl, Grid, Typography } from '@mui/material';

const BlockScheduleFormRow: React.FC<{ dataCyId: string; title: string; children: React.ReactNode }> = ({
  dataCyId,
  title,
  children
}) => (
  <Grid item xs={12}>
    <Grid container alignItems="center">
      <Grid item xs={12} lg={3}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={12} lg={9}>
        <FormControl data-cy={dataCyId} fullWidth>
          {children}
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

export default BlockScheduleFormRow;
