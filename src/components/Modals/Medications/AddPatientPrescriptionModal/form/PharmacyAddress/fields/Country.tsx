import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const Country = () => {
  const { register } = useFormContext();
  const fieldValue = `pharmacy.address.country`;
  const [t] = useTranslation();

  return (
    <Grid item>
      <TextField
        disabled
        fullWidth
        variant="outlined"
        {...register(fieldValue)}
        label={t(Translation.MODAL_PRESCRIPTIONS_COUNTRY)}
      />
    </Grid>
  );
};

export default Country;
