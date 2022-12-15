import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScheduleBoxWrapper } from '@components/Appointments/CommonMaterialComponents';
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
    dispatch(schedulingMiddleware.getSchedulingTemplates(1));
    dispatch(bookingMiddleware.getServiceProviders(1));
    // FOR UPGRADE TO API V2 DON'T REMOVE this
    // dispatch(bookingMiddleware.getGroupedServiceProviders({ page: 1 }));
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
