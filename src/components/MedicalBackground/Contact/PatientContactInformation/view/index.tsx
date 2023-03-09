import React from 'react';
import { contactInformationRows } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const PatientContactInformationView = () => (
  <Grid py={paddings.topBottom24}>
    {contactInformationRows.map(({ Component }, componentIndex) => (
      <Component key={v4()} componentIndex={componentIndex} />
    ))}
  </Grid>
);

export default PatientContactInformationView;
