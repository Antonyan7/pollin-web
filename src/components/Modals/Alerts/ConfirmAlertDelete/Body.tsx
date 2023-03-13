import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const Body = () => {
  const [t] = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_DELETE_ALERT_MESSAGE)}</Typography>
      </Grid>
    </Grid>
  );
};

export default Body;
