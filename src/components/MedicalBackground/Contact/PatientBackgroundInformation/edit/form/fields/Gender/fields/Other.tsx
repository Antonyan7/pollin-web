import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const OtherGender = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${BackgroundInformationFormFields.Gender}.other`,
    control
  });
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_GENDER);

  const errorHelperText = generateErrorMessage(label);

  return (
    <Grid item xs={12}>
      <TextField
        color="primary"
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        fullWidth
        {...field}
        value={field.value}
        ref={field.ref}
      />
    </Grid>
  );
};

export default OtherGender;
