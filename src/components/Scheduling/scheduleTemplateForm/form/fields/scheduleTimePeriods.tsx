import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Grid } from '@mui/material';

import { TimePeriodsFieldsContext } from '../../context';
import { ScheduleFormFields } from '../../types';
import Actions from '../actions';

import { TimePeriods } from './TimePeriods';

const ScheduleTimePeriods = () => {
  const fieldsArray = useFieldArray({
    name: ScheduleFormFields.TimePeriods
  });

  return (
    <Grid item xs={12}>
      <TimePeriodsFieldsContext.Provider value={fieldsArray}>
        <TimePeriods />
        <Actions />
      </TimePeriodsFieldsContext.Provider>
    </Grid>
  );
};

export default ScheduleTimePeriods;
