import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid, TextField } from '@mui/material';

const OtherGender = () => {
  const { control } = useFormContext();
  const { field } = useController({
    name: `${BackgroundInformationFormFields.Gender}.other`,
    control
  });

  return (
    <Grid item xs={12}>
      <TextField color="primary" fullWidth {...field} value={field.value} ref={field.ref} />
    </Grid>
  );
};

export default OtherGender;
