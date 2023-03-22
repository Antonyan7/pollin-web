import React from 'react';
import { backgroundInformationRows } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const PatientBackgroundInformationView = () => (
  <Grid py={paddings.topBottom24}>
    {backgroundInformationRows.map(({ Component }, componentIndex) => (
      <Component key={v4()} componentIndex={componentIndex} />
    ))}
  </Grid>
);

export default PatientBackgroundInformationView;
