import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const UnitNumber = () => {
  const { register } = useFormContext();
  const fieldValue = `pharmacy.address.unit`;
  const [t] = useTranslation();

  return (
    <Grid item>
      <TextField
        fullWidth
        variant="outlined"
        {...register(fieldValue)}
        label={t(Translation.MODAL_PRESCRIPTIONS_UNIT_NUMBER)}
      />
    </Grid>
  );
};

export default UnitNumber;
