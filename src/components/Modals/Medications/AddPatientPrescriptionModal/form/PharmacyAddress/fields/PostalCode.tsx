import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const PostalCode = () => {
  const { register } = useFormContext();
  const fieldValue = `pharmacy.address.postalCode`;
  const [t] = useTranslation();

  return (
    <Grid item xs={6}>
      <TextField
        fullWidth
        variant="outlined"
        {...register(fieldValue)}
        label={t(Translation.MODAL_PRESCRIPTIONS_POSTAL_CODE)}
      />
    </Grid>
  );
};

export default PostalCode;
