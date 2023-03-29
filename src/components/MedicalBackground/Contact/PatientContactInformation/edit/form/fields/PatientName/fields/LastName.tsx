import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const LastName = () => {
  const [t] = useTranslation();
  const lastNameRef = useRef<HTMLInputElement>(null);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_LASTNAME);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.PatientName}.lastName`,
    control
  });
  const errorHelperText = generateErrorMessage(label);

  useScrollIntoView(lastNameRef, fieldState);

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        {...field}
        value={field.value}
        inputRef={lastNameRef}
      />
    </Grid>
  );
};

export default LastName;
