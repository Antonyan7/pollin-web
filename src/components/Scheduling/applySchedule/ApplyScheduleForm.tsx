import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScheduleBoxWrapper } from '@components/common/MaterialComponents';
import { Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { schedulingMiddleware } from '@redux/slices/scheduling';

import { applyScheduleFormInitialValues } from './constants/defaultValues';
import FormActions from './actions';
import FormBody from './body';

const ApplyScheduleForm = () => {
  const methods = useForm({
    defaultValues: applyScheduleFormInitialValues
  });

  useEffect(() => {
    dispatch(schedulingMiddleware.getSchedulingTemplates(1, true));
    dispatch(bookingMiddleware.getGroupedServiceProviders({ page: 1 }));
  }, []);

  return (
    <FormProvider {...methods}>
      <ScheduleBoxWrapper>
        <Grid container spacing={3}>
          <FormBody />
          <FormActions />
        </Grid>
      </ScheduleBoxWrapper>
    </FormProvider>
  );
};

export default ApplyScheduleForm;
