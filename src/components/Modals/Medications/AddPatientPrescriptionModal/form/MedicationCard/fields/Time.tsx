import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const TimeField = ({ index }: { index: number }) => {
  const { register } = useFormContext();
  const [t] = useTranslation();
  const fieldName = `medications.${index}.time`;

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        {...register(fieldName)}
        label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_TIME)}
      />
    </Grid>
  );
};

export default TimeField;
