import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const OtherDoctorNotesField = ({ index }: { index: number }) => {
  const { register } = useFormContext();
  const [t] = useTranslation();
  const fieldName = `medications.${index}.doctorNotes`;

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        multiline
        minRows={2}
        {...register(fieldName)}
        label={t(Translation.MODAL_PRESCRIPTIONS_OTHER_DOCTOR_NOTES)}
      />
    </Grid>
  );
};

export default OtherDoctorNotesField;
