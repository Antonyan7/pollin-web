import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const Body = () => {
  const [t] = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{t(Translation.MODAL_TEST_RESULT_REVIEW_CONFIRMATION_MESSAGE)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_TEST_RESULT_REVIEW_CONFIRMATION_MESSAGE_UNDONE)}</Typography>
      </Grid>
    </Grid>
  );
};

export default Body;
