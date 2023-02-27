import React from 'react';
import CancelButton from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions/Buttons/Cancel';
import SaveButton from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/actions/Buttons/Save';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const FormSubmit = () => (
  <Grid item container direction="row" justifyContent="flex-end" px={paddings.leftRight32} py={paddings.topBottom16}>
    <CancelButton />
    <SaveButton />
  </Grid>
);

export default FormSubmit;
