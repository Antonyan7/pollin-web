import React from 'react';
import { generalHealthRows } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const PatientGeneralHealthView = () => (
  <Grid py={paddings.topBottom24}>
    {generalHealthRows.map(({ Component }, componentIndex) => (
      <Component key={v4()} componentIndex={componentIndex} />
    ))}
  </Grid>
);

export default PatientGeneralHealthView;
