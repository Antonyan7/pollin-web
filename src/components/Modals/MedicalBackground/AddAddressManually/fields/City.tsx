import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const City = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<AddManuallyAddressModalProps>();

  const cityFieldName = 'city';
  const cityLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_CITY);

  const { field, fieldState } = useController({ control, name: cityFieldName });
  const { error } = fieldState;

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        fullWidth
        id={cityFieldName}
        label={cityLabel}
        name={cityFieldName}
        placeholder={cityLabel}
        inputProps={{ maxLength }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </Grid>
  );
};

export default City;
