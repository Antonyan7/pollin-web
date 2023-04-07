import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const DosageField = ({ index }: { index: number }) => {
  const { register } = useFormContext();
  const fieldValue = `medications.${index}.dosage`;

  const [t] = useTranslation();

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        {...register(fieldValue)}
        label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_DOSAGE)}
      />
    </Grid>
  );
};

export default DosageField;
