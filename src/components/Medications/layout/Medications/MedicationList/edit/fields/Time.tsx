import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

import { AddPatientMedicationFormField } from '../initialValues';

const TimeField = ({ disabled }: { disabled?: boolean }) => {
  const { register } = useFormContext();
  const [t] = useTranslation();

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        disabled={disabled}
        variant="outlined"
        {...register(AddPatientMedicationFormField.Time)}
        label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_TIME)}
      />
    </Grid>
  );
};

export default TimeField;
