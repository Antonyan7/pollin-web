import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const UnitNumber = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<AddManuallyAddressModalProps>();

  const unitNumberFieldName = 'unitNumber';
  const unitNumberFieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_MODAL_UNIT_NUMBER);

  const { field, fieldState } = useController({ control, name: unitNumberFieldName });
  const { error } = fieldState;

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        fullWidth
        id={unitNumberFieldName}
        label={unitNumberFieldLabel}
        name={unitNumberFieldName}
        placeholder={unitNumberFieldLabel}
        inputProps={{ maxLength }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </Grid>
  );
};

export default UnitNumber;
