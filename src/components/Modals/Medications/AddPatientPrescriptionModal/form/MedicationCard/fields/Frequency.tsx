import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const FrequencyField = ({ index }: { index: number }) => {
  const { register } = useFormContext();
  const [t] = useTranslation();
  const fieldName = `medications.${index}.frequency`;

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        {...register(fieldName)}
        label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_FREQUENCY)}
      />
    </Grid>
  );
};

export default FrequencyField;
