import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

import ScheduleTemplateName from './fields/name';
import ScheduleTimePeriods from './fields/scheduleTimePeriods';

const Form = () => {
  const [t] = useTranslation();

  const templatesNameLabel = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} lg={3}>
        <Typography>{templatesNameLabel}</Typography>
      </Grid>
      <Grid item xs={12} lg={9}>
        <ScheduleTemplateName />
      </Grid>
      <Grid item xs={12}>
        <Divider flexItem />
      </Grid>
      <ScheduleTimePeriods />
    </Grid>
  );
};

export default Form;
