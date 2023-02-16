import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

import ErrorImg from '@assets/icons/ErrorImg';

const Body = () => {
  const [t] = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{t(Translation.MODAL_ERROR_MESSAGE)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{t(Translation.MODAL_ERROR_TRY_AGAIN)}</Typography>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <ErrorImg sx={{ width: '208px', height: '173px' }} />
      </Grid>
    </Grid>
  );
};

export default Body;
