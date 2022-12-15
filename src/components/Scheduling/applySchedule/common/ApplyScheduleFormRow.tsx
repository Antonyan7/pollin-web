import React from 'react';
import { Grid, Typography } from '@mui/material';
import { margins } from 'themes/themeConstants';

import { ApplyScheduleFormRowProps } from '../types';

const ApplyScheduleFormRow: React.FC<ApplyScheduleFormRowProps> = ({ title, children, isHidden }) => (
  <Grid item xs={12} hidden={isHidden}>
    <Grid container alignItems="center">
      <Grid item xs={12} lg={3} sx={{ marginBottom: margins.bottom8 }}>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      <Grid item xs={12} lg={9}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

export default ApplyScheduleFormRow;
