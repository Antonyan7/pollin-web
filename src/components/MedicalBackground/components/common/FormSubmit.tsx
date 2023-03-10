import React from 'react';
import CancelButton from '@components/MedicalBackground/components/common/Cancel';
import SaveButton from '@components/MedicalBackground/components/common/Save';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const FormSubmit = () => (
  <Grid item container direction="row" justifyContent="flex-end" px={paddings.leftRight32} py={paddings.topBottom8}>
    <CancelButton />
    <SaveButton />
  </Grid>
);

export default FormSubmit;
