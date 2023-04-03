import React from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import ReferringDoctorName from './fields/ReferringDoctorName';

const ReferringDoctorContent = () => (
  <Grid item container direction="row" spacing={2} p={paddings.all16}>
    <ReferringDoctorName />
  </Grid>
);

export default ReferringDoctorContent;
