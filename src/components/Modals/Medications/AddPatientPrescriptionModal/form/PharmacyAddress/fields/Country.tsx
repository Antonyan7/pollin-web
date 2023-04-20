import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const Country = () => {
  const [t] = useTranslation();

  return (
    <Grid item>
      <TextField
        disabled
        fullWidth
        variant="outlined"
        value="Canada"
        label={t(Translation.MODAL_PRESCRIPTIONS_COUNTRY)}
      />
    </Grid>
  );
};

export default Country;
