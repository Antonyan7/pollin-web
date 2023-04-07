import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const RefillNotesField = ({ index }: { index: number }) => {
  const { register } = useFormContext();
  const [t] = useTranslation();
  const fieldName = `medications.${index}.refillNotes`;

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        {...register(fieldName)}
        label={t(Translation.MODAL_PRESCRIPTIONS_REFILL_NOTES)}
      />
    </Grid>
  );
};

export default RefillNotesField;
