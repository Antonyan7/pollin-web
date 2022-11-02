import React from 'react';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid, IconButton, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

import { usePatientProfileNavigator } from '@hooks/usePatientProfileNavigator';

const AppointmentsListHeader = () => {
  const [t] = useTranslation();

  const { navigateBack } = usePatientProfileNavigator();

  return (
    <Grid container item xs={12} columnGap={1} direction="row" justifyItems="center">
      <IconButton onClick={navigateBack}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography display="flex" alignItems="center" variant="h4">
        {t(Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TITLE)}
      </Typography>
    </Grid>
  );
};

export default AppointmentsListHeader;
