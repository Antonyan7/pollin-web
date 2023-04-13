import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { MAX_ALLOWED_MEDICATION_NOTE_LENGTH } from 'constants/common';
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
        inputProps={{ maxLength: MAX_ALLOWED_MEDICATION_NOTE_LENGTH }}
        label={t(Translation.MODAL_PRESCRIPTIONS_REFILL_NOTES)}
      />
    </Grid>
  );
};

export default RefillNotesField;
