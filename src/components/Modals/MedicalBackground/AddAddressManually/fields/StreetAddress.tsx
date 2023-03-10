import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const StreetAddress = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<AddManuallyAddressModalProps>();

  const streetAddressFieldName = 'streetAddress';
  const streetAddressFieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_MODAL_STREET_ADDRESS);

  const { field, fieldState } = useController({ control, name: streetAddressFieldName });
  const { error } = fieldState;

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        fullWidth
        id={streetAddressFieldName}
        label={streetAddressFieldLabel}
        name={streetAddressFieldName}
        placeholder={streetAddressFieldLabel}
        inputProps={{ maxLength }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </Grid>
  );
};

export default StreetAddress;
