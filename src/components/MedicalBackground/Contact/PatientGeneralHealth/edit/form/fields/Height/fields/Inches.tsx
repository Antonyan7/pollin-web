import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const Inches = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({
    name: `${GeneralHealthFormFields.Height}.inches`,
    control
  });

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INCHES)}
        {...field}
        value={field.value}
        ref={field.ref}
      />
    </Grid>
  );
};

export default Inches;
