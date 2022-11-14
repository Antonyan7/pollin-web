import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const Body = () => {
  const [t] = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{t(Translation.PAGE_IN_HOUSE_RESULTS_TEST_CANCEL_MODAL_BODY1)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{t(Translation.PAGE_IN_HOUSE_RESULTS_TEST_CANCEL_MODAL_BODY2)}</Typography>
      </Grid>
    </Grid>
  );
};

export default Body;
