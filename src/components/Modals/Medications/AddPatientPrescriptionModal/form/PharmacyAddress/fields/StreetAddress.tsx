import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const StreetAddress = () => {
  const { register } = useFormContext();
  const fieldValue = `pharmacy.address.street`;
  const [t] = useTranslation();

  return (
    <Grid item>
      <TextField
        fullWidth
        variant="outlined"
        {...register(fieldValue)}
        label={t(Translation.MODAL_PRESCRIPTIONS_STREET_ADDRESS)}
      />
    </Grid>
  );
};

export default StreetAddress;
