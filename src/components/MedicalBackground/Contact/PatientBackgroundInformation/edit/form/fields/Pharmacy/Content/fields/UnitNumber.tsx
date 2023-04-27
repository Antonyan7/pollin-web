import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const UnitNumber = () => {
  const [t] = useTranslation();
  const label = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_PHARMACY_FIELDS_UNIT_NUMBER
  );
  const { control } = useFormContext();
  const {
    field: { ref, ...field },
    fieldState
  } = useController({
    name: `${BackgroundInformationFormFields.Pharmacy}.address.unit`,
    control
  });
  const errorHelperText = generateErrorMessage(label);

  return (
    <Grid item xs={12}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        {...field}
        inputRef={ref}
        value={field.value}
      />
    </Grid>
  );
};

export default UnitNumber;
