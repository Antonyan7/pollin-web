import React from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import FamilyDoctorName from './fields/FamilyDoctorName';

const FamilyDoctorContent = () => (
  <Grid item container direction="row" spacing={2} p={paddings.all16}>
    <FamilyDoctorName />
  </Grid>
);

export default FamilyDoctorContent;
